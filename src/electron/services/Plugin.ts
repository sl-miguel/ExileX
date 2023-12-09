import { BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import LeagueClientService from './LeagueClientService';

class Plugin {
  win: BrowserWindow;
  lcu: LeagueClientService;
  scripts: Map<string, any>;

  constructor(win: BrowserWindow, lcu: LeagueClientService) {
    this.scripts = new Map();
    this.win = win;
    this.lcu = lcu;
  }

  get() {
    return [...this.scripts.values()];
  }

  setActive(id: string, active: boolean) {
    const script = this.scripts.get(id);
    if (!script) return;

    script.active = active;
    this.scripts.set(id, script);
  }

  setSetting(id: string, newSetting: any) {
    const script = this.scripts.get(id);
    if (!script) return;

    const updateSettings = script.settings.map((setting: any) => {
      return setting.id === newSetting.id ? newSetting : setting;
    });

    script.settings = updateSettings;
    this.scripts.set(id, script);
  }

  async load() {
    const basePath = path.join(__dirname, '../plugins');
    const pluginsFiles = fs.readdirSync(basePath);

    for (const pluginPath of pluginsFiles) {
      const path = `${basePath}\\${pluginPath}`;
      const Plugin = await require(path);

      const plugin = new Plugin();
      const settings = plugin.setup();

      const pluginObject = {
        id: pluginPath,
        name: plugin.name,
        description: plugin.description,
        active: plugin.active,
        settings: settings,
      };

      this.scripts.set(pluginPath, pluginObject);
    }
  }

  async execute(id: string) {
    const script = this.scripts.get(id);
    if (script) return;

    const getSetting = (settingId: string) => this.getSetting(id, settingId);
    if (!script.active) return this.lcu.unsubscribe(script.endpoint);
    this.lcu.subscribe(script.endpoint, async (_data: any, event: any) => await script.execute(getSetting, this.lcu, event));
  }

  async activate(pluginId: string, settingId: string) {
    const plugin = this.scripts.get(pluginId);
    if (!plugin.onPress) return console.log(`${plugin.name} has no onPress method.`);
    const getSetting = (id: string) => this.getSetting(pluginId, id);
    await plugin.onPress(getSetting, this.lcu, settingId);
  }

  private getSetting(id: string, settingId: string) {
    const script = this.scripts.get(id);
    if (!script) return;
    return script.settings.find((setting: any) => setting.id === settingId);
  }
}

export default Plugin;
