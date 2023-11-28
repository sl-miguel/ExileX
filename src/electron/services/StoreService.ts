import { BrowserWindow } from 'electron';

class StoreService {
  win: BrowserWindow;
  userGesture: boolean;

  constructor(win: BrowserWindow, userGesture = false) {
    this.win = win;
    this.userGesture = userGesture;
  }

  async execute(code: string) {
    const localStorage = await this.win.webContents.executeJavaScript(`${code};`, this.userGesture);
    return localStorage;
  }

  getItem(key: string) {
    return this.execute(`localStorage.getItem('${key}')`);
  }

  setItem(key: string, data: string) {
    return this.execute(`localStorage.setItem('${key}', '${data}')`);
  }

  removeItem(key: string) {
    this.execute(`localStorage.removeItem('${key}')`);
  }

  clear() {
    this.execute('localStorage.clear()');
  }

  key(index: string | number) {
    return this.execute(`localStorage.key('${index}')`);
  }

  get length() {
    return this.execute('localStorage.length');
  }
}

module.exports = StoreService;
