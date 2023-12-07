import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import LeagueClientService from './services/LeagueClientService';
import Plugin from './services/Plugin';

import jsonFetch from './events/ipc/jsonFetch';
import buttonHandler from './events/ipc/buttonHandler';
import iconFetch from './events/ipc/iconFetch';

import activate from './events/app/activate';
import windowAllClosed from './events/app/window-all-closed';
import pluginHandler from './events/ipc/pluginHandler';
import championHandler from './events/ipc/championHandler';

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 420,
    height: 600,
    resizable: false,
    icon: path.join(process.env.VITE_PUBLIC, 'exile.svg'),
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

  async function startPlugins() {
    console.log('Loading plugins');
    const plugins = pluginLoader.get();
    for (const plugin of plugins) {
      // @ts-ignore
      await pluginLoader.execute(plugin.id);
    }
  }

  pluginHandler(pluginLoader, win);

  ipcMain.on('is-connected', (_, connected: boolean) => {
    console.log('isConnected', connected);
    if (connected) startPlugins();
  });

  ipcMain.on('settings[update]', async (_, { plugin, setting }) => {
    pluginLoader.setSetting(plugin.id, setting);
    startPlugins();
  });

  ipcMain.on('plugins[update]', async (_, { plugin }) => {
    pluginLoader.setActive(plugin.id, plugin.active);
    startPlugins();
  });

  // Can't dynamic import idk why ???
  // IPC's listeners
  jsonFetch(win, lcu);
  iconFetch(win, lcu);
  buttonHandler(pluginLoader);
  championHandler(lcu, win);

  // App listeners
  activate(app, createWindow);
  windowAllClosed(app);
})();
