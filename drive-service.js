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

// ID da pasta do imóvel atual no Drive
let currentImovelFolderId = null;
let photosFolderId = null; // Guardará o ID da subpasta Fotografias_Vistoria

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

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: SCOPES,
    ux_mode: 'popup', // Força o modo pop-up nativo e seguro para PWAs
    callback: (resp) => {
      if (resp.error !== undefined) {
        alert("Erro na autenticação: " + resp.error);
        return;
      }
      userAuthenticated = true;
      // Executa o arranque se a função de callback tiver sido guardada
      if (typeof handleAuthSuccess === 'function') {
        handleAuthSuccess();
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

// 2. Função de Login / Autenticação
function authenticateGoogle(callback) {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      alert("Erro na autenticação: " + resp.error);
      return;
    }
    userAuthenticated = true;
    if (callback) callback();
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

// 3. Procurar ou Criar a estrutura de pastas do Imóvel (Correção: Devolve ambos os IDs)
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
      
      // Procura a subpasta existente de fotos
      const photoQuery = `name = 'Fotografias_Vistoria' and '${currentImovelFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
      const photoResponse = await gapi.client.drive.files.list({ q: photoQuery, fields: 'files(id)' });
      if (photoResponse.result.files && photoResponse.result.files.length > 0) {
        photosFolderId = photoResponse.result.files[0].id;
      }
      showToast(`Pasta encontrada para o imóvel ${codigoImovel}.`);
    } else {
      showToast(`A criar nova pasta para o imóvel ${codigoImovel}...`);
      
      const folderMetadata = { name: codigoImovel, mimeType: 'application/vnd.google-apps.folder' };
      const folderResponse = await gapi.client.drive.files.create({ resource: folderMetadata, fields: 'id' });
      currentImovelFolderId = folderResponse.result.id;
      
      const photoFolderMetadata = {
        name: 'Fotografias_Vistoria',
        mimeType: 'application/vnd.google-apps.folder',
        parents: [currentImovelFolderId]
      };
      const photoFolderResponse = await gapi.client.drive.files.create({ resource: photoFolderMetadata, fields: 'id' });
      photosFolderId = photoFolderResponse.result.id;

      showToast("Estrutura de pastas criada no Drive.");
    }
    return { rootId: currentImovelFolderId, photosId: photosFolderId };

  } catch (err) {
    console.error("Erro ao estruturar pastas no Drive:", err);
    showToast("❌ Erro ao aceder ao Google Drive.");
    return null;
  }
}

// 4. Guardar o ficheiro JSON de forma otimizada (sem travar por tamanho)
async function saveSessionToDrive(codigoImovel, statePayload) {
  if (!userAuthenticated || !currentImovelFolderId) return;

  const filename = `sessao_${codigoImovel}.json`;
  const jsonContent = JSON.stringify(statePayload, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });

  try {
    const query = `name = '${filename}' and '${currentImovelFolderId}' in parents and trashed = false`;
    const searchResponse = await gapi.client.drive.files.list({ q: query, fields: 'files(id)' });
    const files = searchResponse.result.files;

    if (files && files.length > 0) {
      await gapi.client.request({
        path: `/upload/drive/v3/files/${files[0].id}`,
        method: 'PATCH',
        params: { uploadType: 'media' },
        body: blob
      });
      console.log("Auto-save atualizado no Google Drive.");
    } else {
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
    console.error("Falha ao enviar auto-save para o Drive:", err);
  }
}

// 5. Faz upload das fotografias de forma binária e direta para o Drive
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
