import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
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
  });

  async function startPlugins() {
    console.log('Loading plugins');
    const plugins = pluginLoader.get();
    for (const plugin of plugins) {
      // @ts-ignore
      await pluginLoader.execute(plugin.id);
    }
  }

  ipcMain.on('is-connected', (_, connected: boolean) => {
    console.log('isConnected', connected);
    if (connected) startPlugins();
  });

  ipcMain.on('updatedSettings', async (_, { plugin, setting }) => {
    pluginLoader.setSetting(plugin.id, setting);
    startPlugins();
  });

  ipcMain.on('updatedPlugins', async (_, { plugin }) => {
    pluginLoader.setActive(plugin.id, plugin.active);
    startPlugins();
  });
})();
