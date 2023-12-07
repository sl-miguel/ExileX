import { ipcMain } from 'electron';
import Plugin from '../../services/Plugin';

function buttonHandler(pluginLoader: Plugin) {
  ipcMain.on('handle[button]', async (_, { plugin, setting }) => {
    console.log(setting);
    pluginLoader.activate(plugin.id, setting.id);
  });
}

export default buttonHandler;
