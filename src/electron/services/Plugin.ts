import { BrowserWindow } from 'electron';
import { join } from 'path';
import fs from 'fs';
import LeagueClientService from './LeagueClientService';
import StoreService from './StoreService';

class Plugin {
  win: BrowserWindow;
  lcu: LeagueClientService;
  scripts: Map<string, any>;
  store: StoreService;

  constructor(win: BrowserWindow, lcu: LeagueClientService) {
    this.scripts = new Map();
    this.win = win;
    this.lcu = lcu;
    this.store = new StoreService(win);
  }

  get() {
    return [...this.scripts.values()];
  }

  setActive(id: string, active: boolean) {
    const script = this.scripts.get(id);
    if (!script) return;

    script.active = active;
    this.scripts.set(id, script);
    this.store.setItem(id, JSON.stringify(script));
  }

  setSetting(id: string, newSetting: any) {
    const script = this.scripts.get(id);
    if (!script) return;

    const updateSettings = script.settings.map((setting: any) => {
      return setting.id === newSetting.id ? newSetting : setting;
    });

    script.settings = updateSettings;
    this.scripts.set(id, script);
    this.store.setItem(id, JSON.stringify(script));
  }

  async load() {
    const basePath = join(__dirname, '../plugins');
    const pluginsFiles = fs.readdirSync(basePath);

    for (const pluginPath of pluginsFiles) {
      const path = join(basePath, pluginPath);
      const Plugin = await require(path);

      const plugin = new Plugin();
      const settings = await plugin.setup(this.lcu);

      plugin.id = pluginPath;
      plugin.settings = settings;

      const storedScript = await this.store.getItem(pluginPath);
      if (storedScript) {
        const parsedScript = JSON.parse(storedScript);

        if ('reload' in plugin) {
          const reloads = plugin.reload();

          for (const { id, keys } of reloads) {
            for (const key of keys) {
              const reloadSetting = parsedScript.settings.find((set: any) => set.id === id);
              const freshSetting = settings.find((set: any) => set.id === id);
              reloadSetting[key] = freshSetting[key];
            }
          }
          this.store.setItem(pluginPath, JSON.stringify(parsedScript));
        }

        Object.assign(plugin, parsedScript);
        this.scripts.set(pluginPath, plugin);
        continue;
      }

      this.scripts.set(pluginPath, plugin);
      this.store.setItem(pluginPath, JSON.stringify(plugin));
    }
  }

  async execute(id: string) {
    const script = this.scripts.get(id);
    if (!script) return;

    const getSetting = (settingId: string) => this.getSetting(id, settingId);
    if (!script.active) return this.lcu.unsubscribe(id, script.endpoint);
    this.lcu.subscribe(id, script.endpoint, async (_data: any, event: any) => await script.execute(getSetting, this.lcu, event));
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
