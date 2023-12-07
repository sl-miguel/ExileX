import { BrowserWindow, ipcMain } from 'electron';
import LeagueClientService from '../../services/LeagueClientService';

function championHandler(lcu: LeagueClientService, win: BrowserWindow) {
  ipcMain.on('champions[request]', async (_) => {
    console.log('Requesting champions:');
    const response = await lcu.request({ method: 'GET', url: '/lol-champions/v1/inventories/150734416/champions-minimal' });
    const champions = await response.json();
    win.webContents.send('champions[response]', champions);

    // Testing buffer to client
    // const iconReponse = await lcu.request({ method: 'GET', url: champions[1].squarePortraitPath });
    // const buffer = await iconReponse.buffer();
    // win.webContents.send('champions', [ {...champions[1], iconBuffer: buffer }]);
  });
}

export default championHandler;
