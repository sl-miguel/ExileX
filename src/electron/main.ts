import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (VITE_DEV_SERVER_URL) win.loadURL(VITE_DEV_SERVER_URL);
  else win.loadFile(path.join(process.env.DIST, 'index.html'));

  return win;
};

(async () => {
  await app.whenReady();
  const win = await createWindow();
  await new Promise((resolve) => win.webContents.on('did-finish-load', resolve));

  ipcMain.on('ping', () => {
    console.log('Received click from browser.');
    win.webContents.send('pong');
  });
})();
