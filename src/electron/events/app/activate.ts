import { BrowserWindow } from 'electron';

async function activate(app: any, createWindow: any) {
  app.on('window-all-closed', async () => {
    const windows = BrowserWindow.getAllWindows();
    if (windows.length === 0) await createWindow();
  });
}

export default activate;
