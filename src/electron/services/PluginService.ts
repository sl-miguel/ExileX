import { BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import StoreService from './StoreService';

class PluginService {
  plugins: any[];
  win: BrowserWindow;
  localStorage: StoreService;

  constructor(win: BrowserWindow) {
    this.plugins = [];
    this.win = win;
    this.localStorage = new StoreService(this.win);
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

  async newLoad() {
    const basePath = path.join(__dirname, '../plugins');
    const pluginsFiles = fs.readdirSync(basePath);

    this.plugins = [];
    for (const pluginPath of pluginsFiles) {
      const path = `${basePath}\\${pluginPath}`;
      const Plugin = await require(path);

      const plugin = new Plugin();

      const item = (await this.localStorage.getItem(pluginPath)) || null;
      if (item) {
        this.plugins.push(JSON.parse(item));
        continue;
      }

      const pluginSettings = plugin.setup();
      const titleObject = pluginSettings.find((item: any) => item.type === 'title');

      const pluginObject = {
        id: pluginPath,
        name: titleObject?.title || pluginPath,
        settings: pluginSettings,
      };

      this.localStorage.setItem(pluginPath, JSON.stringify(pluginObject));
      this.plugins.push(pluginObject);
    }
  }

  getSetting(settings: any[], id: string) {
    for (const setting of settings) {
      if (setting.id === id) return setting;
    }
  }
}

export default PluginService;
