const GOOGLE_API_KEY = 'AIzaSyBVxp-ErputbkkyQMsAqQcfTcBJlNEdKac';
const GOOGLE_CLIENT_ID = '95430853177-309qsn7cek6qt8e4bp3qobh3ocq901gj.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

let tokenClient, gapiInited = false, gisInited = false, userAuthenticated = false;
let currentImovelFolderId = null, photosFolderId = null, handleAuthSuccess = null;

function gapiLoaded() { gapi.load('client', async () => { await gapi.client.init({ apiKey: GOOGLE_API_KEY, discoveryDocs: [DISCOVERY_DOC] }); gapiInited = true; }); }
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
  if (gapi.client.getToken() === null) tokenClient.requestAccessToken({ prompt: 'consent' });
  else tokenClient.requestAccessToken({ prompt: '' });
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

async function loadSessionFromDrive(codigoImovel) {
  if (!currentImovelFolderId) return null;
  try {
    const res = await gapi.client.drive.files.list({ q: `name = 'sessao_${codigoImovel}.json' and '${currentImovelFolderId}' in parents and trashed = false`, fields: 'files(id)' });
    if (res.result.files.length > 0) {
      const file = await gapi.client.drive.files.get({ fileId: res.result.files[0].id, alt: 'media' });
      return typeof file.result === 'string' ? JSON.parse(file.body || file.result) : file.result;
    }
  } catch (e) {} return null;
}

async function saveSessionToDrive(codigoImovel, statePayload) {
  if (!currentImovelFolderId) return;
  const filename = `sessao_${codigoImovel}.json`;
  const blob = new Blob([JSON.stringify(statePayload)], { type: 'application/json' });
  try {
    const res = await gapi.client.drive.files.list({ q: `name = '${filename}' and '${currentImovelFolderId}' in parents and trashed = false`, fields: 'files(id)' });
    if (res.result.files.length > 0) {
      await gapi.client.request({ path: `/upload/drive/v3/files/${res.result.files[0].id}`, method: 'PATCH', params: { uploadType: 'media' }, body: blob });
    } else {
      const b = 'fbb', d = `\r\n--${b}\r\n`, cd = `\r\n--${b}--`;
      await gapi.client.request({
        path: '/upload/drive/v3/files', method: 'POST', params: { uploadType: 'multipart' }, headers: { 'Content-Type': `multipart/related; boundary=${b}` },
        body: `${d}Content-Type: application/json\r\n\r\n${JSON.stringify({ name: filename, parents: [currentImovelFolderId] })}${d}Content-Type: application/json\r\n\r\n${JSON.stringify(statePayload)}${cd}`
      });
    }
  } catch (e) {}
}

async function uploadPhotoToDrive(file, folderId) {
  const bytes = await new Promise(r => { const rd = new FileReader(); rd.onload = () => r(rd.result); rd.readAsBinaryString(file); });
  const b = 'fbb', d = `\r\n--${b}\r\n`, cd = `\r\n--${b}--`;
  const res = await gapi.client.request({
    path: '/upload/drive/v3/files', method: 'POST', params: { uploadType: 'multipart' }, headers: { 'Content-Type': `multipart/related; boundary=${b}` },
    body: `${d}Content-Type: application/json\r\n\r\n${JSON.stringify({ name: file.name, parents: [folderId] })}${d}Content-Type: ${file.type}\r\nContent-Transfer-Encoding: binary\r\n\r\n${bytes}${cd}`
  });
  return res.result.id;
}
