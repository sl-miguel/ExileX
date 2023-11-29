import path from 'path';
import fs from 'fs';

class PluginService {
  plugins: any[];

  constructor() {
    this.plugins = [];
  }

  getPlugins() {
    return this.plugins;
  }

  async load() {
    const basePath = path.join(__dirname, '../plugins');
    const pluginsFiles = fs.readdirSync(basePath);
    let totalPlugins = 0;

    for (const pluginPath of pluginsFiles) {
      const path = `${basePath}\\${pluginPath}`;
      const Plugin = await require(path);

      const plugin = new Plugin();
      const pluginSettings = plugin.setup();
      const titleObject = pluginSettings.find((item: any) => item.type === 'title');

      const pluginObject = {
        id: pluginPath,
        name: titleObject?.title || pluginPath,
        settings: pluginSettings,
        path,
      };

      this.plugins.push(pluginObject);
      totalPlugins += 1;
    }

    console.log(`Loaded ${totalPlugins} plugins.`);
  }
}

export default PluginService;
