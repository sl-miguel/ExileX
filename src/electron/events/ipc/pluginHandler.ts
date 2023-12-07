import { BrowserWindow, ipcMain } from 'electron';
import Plugin from '../../services/Plugin';

function pluginHandler(pluginLoader: Plugin, win: BrowserWindow) {
  ipcMain.on('plugins[request]', async () => {
    const plugins = pluginLoader.get();
    console.log(plugins);
    win.webContents.send('plugins[response]', plugins);
  });
}

export default pluginHandler;
