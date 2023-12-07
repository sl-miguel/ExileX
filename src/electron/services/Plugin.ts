import { BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import LeagueClientService from './LeagueClientService';

class Plugin {
  win: BrowserWindow;
  lcu: LeagueClientService;
  plugins: Map<string, any>;
  settings: Map<string, any>;
  data: object[];

  constructor(win: BrowserWindow, lcu: LeagueClientService) {
    this.plugins = new Map();
    this.settings = new Map();
    this.data = [];
    this.win = win;
    this.lcu = lcu;
  }

  get() {
    return this.data;
  }

  setActive(id: string, active: boolean) {
    const actualPlugin = this.plugins.get(id);
    actualPlugin.active = active;
    this.plugins.set(id, actualPlugin);
  }

  setSetting(id: string, newSetting: any) {
    const actualSettings = this.settings.get(id);

    const updatedSettings = actualSettings.map((setting: any) => {
      if (setting.id === newSetting.id) return newSetting;
      return setting;
    });

    this.settings.set(id, updatedSettings);
  }

  async load() {
    const basePath = path.join(__dirname, '../plugins');
    const pluginsFiles = fs.readdirSync(basePath);

    for (const pluginPath of pluginsFiles) {
      const path = `${basePath}\\${pluginPath}`;
      const Plugin = await require(path);

      const plugin = new Plugin();
      const settings = plugin.setup();

      this.settings.set(pluginPath, settings);
      this.plugins.set(pluginPath, plugin);

      this.data.push({
        id: pluginPath,
        name: plugin.name,
        description: plugin.description,
        active: plugin.active,
        settings: settings,
      });
    }
  }

  async execute(id: string) {
    const plugin = this.plugins.get(id);
    const getSetting = (settingId: string) => this.getSetting(id, settingId);

    if (!plugin.active) return this.lcu.unsubscribe(plugin.endpoint);
    this.lcu.subscribe(plugin.endpoint, async (_data: any, event: any) => await plugin.execute(getSetting, this.lcu, event));
  }

  async activate(pluginId: string, settingId: string) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin.onPress) return console.log(`${plugin.name} has no onPress method.`);
    const getSetting = (id: string) => this.getSetting(pluginId, id);
    await plugin.onPress(getSetting, this.lcu, settingId);
  }

  private getSetting(id: string, settingId: string) {
    const settings = this.settings.get(id);
    for (const setting of settings) {
      if (setting.id === settingId) {
        return setting;
      }
    }
  }
}

export default Plugin;
