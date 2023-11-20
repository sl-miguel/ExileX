import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import connectWS from './league/lcu';

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

async function createWindow() {
	win = new BrowserWindow({
		width: 400,
		height: 600,
		icon: path.join(process.env.VITE_PUBLIC, 'exile.svg'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	if (VITE_DEV_SERVER_URL) win.loadURL(VITE_DEV_SERVER_URL);
	else win.loadFile(path.join(process.env.DIST, 'index.html'));

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform === 'darwin') return;
	app.quit();
	win = null;
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

(async () => {
	await app.whenReady();
	const win = await createWindow();
	ipcMain.on('client-loaded', () => connectWS(win));
})();
