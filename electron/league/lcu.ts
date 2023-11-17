import { BrowserWindow } from 'electron';

const { createWebSocketConnection } = require('league-connect');

const connectWS = async (win: BrowserWindow) => {
	console.log('[Node] Wainting for league Client');
	const ws = await createWebSocketConnection({
		authenticationOptions: {
			awaitConnection: true,
		},
		pollInterval: 3000,
		maxRetries: -1,
	});

	ws.on('close', () => {
		console.log(`[Node] League Client diconnected`);
		win.webContents.send('ws-disconnect', false);
		connectWS(win);
	});

	console.log('League Client Found!');
	win.webContents.send('ws-connect', true);
	return ws;
};

export default connectWS;
