// ==========================================
// LUVIO VISTORIAS — GOOGLE DRIVE SERVICE
// ==========================================

const GOOGLE_API_KEY = 'AIzaSyBVxp-ErputbkkyQMsAqQcfTcBJlNEdKac';
const GOOGLE_CLIENT_ID = '95430853177-309qsn7cek6qt8e4bp3qobh3ocq901gj.apps.googleusercontent.com';

// Escopo de acesso: Permite ler, criar e editar ficheiros criados por esta app no Drive
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

let tokenClient;
let gapiInited = false;
let gisInited = false;
let userAuthenticated = false;

// Armazenamento global dos IDs das pastas para comunicação com o app.js
let currentImovelFolderId = null;
let photosFolderId = null; 
let handleAuthSuccess = null; // Guarda temporariamente a ação após o login com sucesso

// 1. Inicializar as APIs da Google assim que a página carrega
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: GOOGLE_API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

// CORREÇÃO CRÍTICA: Inicialização blindada para o telemóvel/GitHub Pages
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: SCOPES,
    ux_mode: 'popup', // Força a abertura em pop-up isolado no smartphone, evitando o erro 400
    callback: async (resp) => {
      if (resp.error !== undefined) {
        alert("Erro na autenticação: " + resp.error);
        return;
      }
      userAuthenticated = true;
      console.log("Autenticação Google efetuada com sucesso.");
      
      // Executa a transição de ecrã no app.js
      if (typeof handleAuthSuccess === 'function') {
        await handleAuthSuccess();
      }
    },
  });
  gisInited = true;
  maybeEnableButtons();
}

function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    console.log("APIs da Google prontas para autenticação.");
  }
}

// 2. Chamada de login ativada pelo botão principal
function authenticateGoogle(callback) {
  handleAuthSuccess = callback; // Acopla dinamicamente o fluxo de início da vistoria

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

// 3. Procurar ou Criar a estrutura de pastas do Imóvel
async function setupImovelDriveStructure(codigoImovel) {
  if (!userAuthenticated) return null;

  try {
    showToast("A verificar pastas no Google Drive...");
    
    const query = `name = '${codigoImovel}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
    const response = await gapi.client.drive.files.list({
      q: query,
      fields: 'files(id, name)',
    });

    const files = response.result.files;

    if (files && files.length > 0) {
      currentImovelFolderId = files[0].id;
      
      // Localiza a subpasta existente de fotografias para evitar duplicações
      const photoQuery = `name = 'Fotografias_Vistoria' and '${currentImovelFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
      const photoResponse = await gapi.client.drive.files.list({ q: photoQuery, fields: 'files(id)' });
      
      if (photoResponse.result.files && photoResponse.result.files.length > 0) {
        photosFolderId = photoResponse.result.files[0].id;
      }
      showToast(`Pasta detetada para o imóvel ${codigoImovel}.`);
    } else {
      showToast(`A criar nova pasta para o imóvel ${codigoImovel}...`);
      
      // Criação da pasta raiz da vistoria
      const folderMetadata = {
        name: codigoImovel,
        mimeType: 'application/vnd.google-apps.folder'
      };
      const folderResponse = await gapi.client.drive.files.create({
        resource: folderMetadata,
        fields: 'id',
      });
      currentImovelFolderId = folderResponse.result.id;
      
      // Criação da subpasta dedicada para as imagens binárias
      const photoFolderMetadata = {
        name: 'Fotografias_Vistoria',
        mimeType: 'application/vnd.google-apps.folder',
        parents: [currentImovelFolderId]
      };
      const photoFolderResponse = await gapi.client.drive.files.create({
        resource: photoFolderMetadata,
        fields: 'id',
      });
      photosFolderId = photoFolderResponse.result.id;

      showToast("Estrutura de pastas criada no Drive.");
    }
    
    // Retorna as referências limpas para o app.js
    return { rootId: currentImovelFolderId, photosId: photosFolderId };

  } catch (err) {
    console.error("Erro ao estruturar pastas no Drive:", err);
    showToast("❌ Erro ao aceder ao Google Drive.");
    return null;
  }
}

// 4. Gravação otimizada do ficheiro JSON da sessão (Auto-Save)
async function saveSessionToDrive(codigoImovel, statePayload) {
  if (!userAuthenticated || !currentImovelFolderId) return;

  const filename = `sessao_${codigoImovel}.json`;
  const jsonContent = JSON.stringify(statePayload, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });

  try {
    const query = `name = '${filename}' and '${currentImovelFolderId}' in parents and trashed = false`;
    const searchResponse = await gapi.client.drive.files.list({
      q: query,
      fields: 'files(id)'
    });
    
    const files = searchResponse.result.files;
    
    if (files && files.length > 0) {
      // Atualização direta (PATCH) do ficheiro existente
      await gapi.client.request({
        path: `/upload/drive/v3/files/${files[0].id}`,
        method: 'PATCH',
        params: { uploadType: 'media' },
        body: blob
      });
      console.log("Auto-save atualizado no Google Drive.");
    } else {
      // Criação multipart estável para o primeiro ficheiro JSON
      const boundary = 'foo_bar_baz';
      const delimiter = `\r\n--${boundary}\r\n`;
      const closeDelimiter = `\r\n--${boundary}--`;
      
      const metadata = { name: filename, parents: [currentImovelFolderId], mimeType: 'application/json' };
      
      const multipartRequestBody =
          delimiter +
          'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: application/json\r\n\r\n' +
          jsonContent +
          closeDelimiter;

      await gapi.client.request({
        path: '/upload/drive/v3/files',
        method: 'POST',
        params: { uploadType: 'multipart' },
        headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
        body: multipartRequestBody
      });
      console.log("Primeiro auto-save criado no Google Drive.");
    }
  } catch (err) {
    console.error("Falha detalhada ao enviar para o Drive:", err);
  }
}

// 5. Upload binário individual de fotografias tiradas em obra
async function uploadPhotoToDrive(file, folderId) {
  const metadata = {
    name: file.name,
    parents: [folderId],
    mimeType: file.type
  };

  const fileBytes = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsBinaryString(file);
  });

  const boundary = 'foo_bar_baz';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${file.type}\r\n` +
    'Content-Transfer-Encoding: binary\r\n\r\n' +
    fileBytes +
    closeDelimiter;

  const response = await gapi.client.request({
    path: '/upload/drive/v3/files',
    method: 'POST',
    params: { uploadType: 'multipart' },
    headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
    body: multipartRequestBody
  });

  return response.result.id;
}

// 6. Carregamento e Restauro de Sessão Guardada no Drive
async function loadSessionFromDrive(codigoImovel) {
  if (!userAuthenticated || !currentImovelFolderId) return null;

  const filename = `sessao_${codigoImovel}.json`;

  try {
    showToast("🔄 A procurar sessão anterior no Google Drive...");
    
    // Procura o arquivo JSON específico dentro da pasta do imóvel
    const query = `name = '${filename}' and '${currentImovelFolderId}' in parents and trashed = false`;
    const response = await gapi.client.drive.files.list({
      q: query,
      fields: 'files(id)'
    });

    const files = response.result.files;

    if (files && files.length > 0) {
      showToast("💾 Ficheiro encontrado! A restaurar dados...");
      
      // Descarrega o conteúdo do ficheiro JSON
      const fileResponse = await gapi.client.drive.files.get({
        fileId: files[0].id,
        alt: 'media'
      });

      // Se o retorno já for um objeto, devolvemos. Se for string, convertemos em JSON seguro
      let sessionData = fileResponse.result;
      if (typeof sessionData === 'string') {
        sessionData = JSON.parse(fileResponse.body || fileResponse.result);
      }
      
      return sessionData;
    } else {
      showToast("ℹ️ Nenhuma sessão anterior gravada para este código.");
      return null;
    }
  } catch (err) {
    console.error("Erro ao carregar sessão do Drive:", err);
    showToast("❌ Falha ao carregar dados do Drive.");
    return null;
  }
}
