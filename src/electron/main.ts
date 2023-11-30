import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import PluginService from './services/PluginService';
import LeagueClientService from './services/LeagueClientService';
import Plugin from './services/Plugin';

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
    win.resizable = true;
  } else {
    win.setMenu(null);
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }

  return win;
};

(async () => {
  await app.whenReady();
  const win = await createWindow();
  await new Promise((resolve) => win.webContents.on('did-finish-load', resolve));

  const lcu = new LeagueClientService(win);
  lcu.connect();

  const pluginLoader = new Plugin(win, lcu);
  await pluginLoader.load();

  ipcMain.on('request-plugins', async () => {
    const plugins = pluginLoader.get();
    console.log(plugins);
    win.webContents.send('plugins', plugins);

    await pluginLoader.execute('Accept.js');
    await pluginLoader.execute('Report.js');
  });

  ipcMain.on('settings', async (_, { plugin, setting }) => {
    console.log('Settings', plugin, setting);
  });

  ipcMain.on('plugins', async (_, { plugin }) => {
    console.log('Settings', plugin);
  });
})();
