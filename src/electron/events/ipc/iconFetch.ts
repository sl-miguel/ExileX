import { ipcMain, BrowserWindow } from 'electron';
import LeagueClientService from '../../services/LeagueClientService';

function iconFetcher(win: BrowserWindow, lcu: LeagueClientService) {
  ipcMain.on('useIcon[request]', async (_, endpoint) => {
    console.log('useIcon', endpoint);
    const response = await lcu.request({ method: 'GET', url: endpoint });
    const iconBuffer = await response.buffer();
    // const base64 = Buffer.from(iconBuffer).toString('base64')
    win.webContents.send('useIcon[response]', iconBuffer);
  });
}

export default iconFetcher;
