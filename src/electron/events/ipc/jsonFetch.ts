import { BrowserWindow, ipcMain } from 'electron';
import LeagueClientService from '../../services/LeagueClientService';

function jsonFetcher(win: BrowserWindow, lcu: LeagueClientService) {
  ipcMain.on('useFetch[request]', async (_, endpoint) => {
    console.log('useFetch', endpoint);
    const response = await lcu.request({ method: 'GET', url: endpoint });
    const data = await response.json();
    win.webContents.send('useFetch[response]', data);
  });
}

export default jsonFetcher;
