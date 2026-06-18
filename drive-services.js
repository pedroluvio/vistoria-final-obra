const GOOGLE_API_KEY = 'AIzaSyBVxp-ErputbkkyQMsAqQcfTcBJlNEdKac';
const GOOGLE_CLIENT_ID = '95430853177-309qsn7cek6qt8e4bp3qobh3ocq901gj.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let tokenClient, gapiInited = false, gisInited = false, userAuthenticated = false;
let currentImovelFolderId = null, photosFolderId = null, handleAuthSuccess = null;

function gapiLoaded() { gapi.load('client', async () => { await gapi.client.init({ apiKey: GOOGLE_API_KEY, discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'] }); gapiInited = true; }); }
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID, scope: SCOPES, ux_mode: 'popup',
    callback: async (resp) => {
      if (resp.error) { alert("Erro: " + resp.error); return; }
      userAuthenticated = true;
      if (typeof handleAuthSuccess === 'function') await handleAuthSuccess();
    }
  });
  gisInited = true;
}

function authenticateGoogle(callback) {
  handleAuthSuccess = callback;
  tokenClient.requestAccessToken({ prompt: gapi.client.getToken() === null ? 'consent' : '' });
}

async function setupImovelDriveStructure(codigoImovel) {
  if (!userAuthenticated) return null;
  try {
    const res = await gapi.client.drive.files.list({ q: `name = '${codigoImovel}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`, fields: 'files(id, name)' });
    if (res.result.files.length > 0) {
      currentImovelFolderId = res.result.files[0].id;
      const pRes = await gapi.client.drive.files.list({ q: `name = 'Fotografias_Vistoria' and '${currentImovelFolderId}' in parents and trashed = false`, fields: 'files(id)' });
      if (pRes.result.files.length > 0) photosFolderId = pRes.result.files[0].id;
    } else {
      const fRes = await gapi.client.drive.files.create({ resource: { name: codigoImovel, mimeType: 'application/vnd.google-apps.folder' }, fields: 'id' });
      currentImovelFolderId = fRes.result.id;
      const pRes = await gapi.client.drive.files.create({ resource: { name: 'Fotografias_Vistoria', mimeType: 'application/vnd.google-apps.folder', parents: [currentImovelFolderId] }, fields: 'id' });
      photosFolderId = pRes.result.id;
    }
    return { rootId: currentImovelFolderId, photosId: photosFolderId };
  } catch (e) { return null; }
}

// CORREÇÃO: Fetch nativo converte JSON sem falhas
async function loadSessionFromDrive(codigoImovel) {
  if (!currentImovelFolderId) return null;
  try {
    const res = await gapi.client.drive.files.list({ q: `name = 'sessao_${codigoImovel}.json' and '${currentImovelFolderId}' in parents and trashed = false`, fields: 'files(id)' });
    if (res.result.files.length > 0) {
      const token = gapi.client.getToken().access_token;
      const fRes = await fetch(`https://www.googleapis.com/drive/v3/files/${res.result.files[0].id}?alt=media`, { headers: { Authorization: `Bearer ${token}` } });
      return await fRes.json();
    }
  } catch (e) {} return null;
}

// CORREÇÃO: Envio do JSON como string pura no PATCH
async function saveSessionToDrive(codigoImovel, statePayload) {
  if (!currentImovelFolderId) return;
  const filename = `sessao_${codigoImovel}.json`;
  const jsonStr = JSON.stringify(statePayload);
  try {
    const res = await gapi.client.drive.files.list({ q: `name = '${filename}' and '${currentImovelFolderId}' in parents and trashed = false`, fields: 'files(id)' });
    if (res.result.files.length > 0) {
      await gapi.client.request({ path: `/upload/drive/v3/files/${res.result.files[0].id}`, method: 'PATCH', params: { uploadType: 'media' }, body: jsonStr });
    } else {
      const b = 'fbb', d = `\r\n--${b}\r\n`, cd = `\r\n--${b}--`;
      await gapi.client.request({
        path: '/upload/drive/v3/files', method: 'POST', params: { uploadType: 'multipart' }, headers: { 'Content-Type': `multipart/related; boundary=${b}` },
        body: `${d}Content-Type: application/json\r\n\r\n${JSON.stringify({ name: filename, parents: [currentImovelFolderId] })}${d}Content-Type: application/json\r\n\r\n${jsonStr}${cd}`
      });
    }
  } catch (e) {}
}

// CORREÇÃO: Upload seguro em Base64 impede corrupção das fotos
async function uploadPhotoToDrive(file, folderId) {
  const b64 = await new Promise(r => { const rd = new FileReader(); rd.onload = () => r(rd.result.split(',')[1]); rd.readAsDataURL(file); });
  const b = 'fbb', d = `\r\n--${b}\r\n`, cd = `\r\n--${b}--`;
  const res = await gapi.client.request({
    path: '/upload/drive/v3/files', method: 'POST', params: { uploadType: 'multipart' }, headers: { 'Content-Type': `multipart/related; boundary=${b}` },
    body: `${d}Content-Type: application/json\r\n\r\n${JSON.stringify({ name: file.name, parents: [folderId] })}${d}Content-Type: ${file.type}\r\nContent-Transfer-Encoding: base64\r\n\r\n${b64}${cd}`
  });
  return res.result.id;
}

// CORREÇÃO: Download seguro via Blob para injetar no PDF
async function getPhotoDataUrl(fileId) {
  const token = gapi.client.getToken().access_token;
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, { headers: { Authorization: `Bearer ${token}` } });
  const blob = await res.blob();
  return new Promise(r => { const rd = new FileReader(); rd.onload = () => r(rd.result); rd.readAsDataURL(blob); });
}