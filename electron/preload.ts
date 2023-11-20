import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('lcu', {
	connection: (connected: any) => ipcRenderer.on('ws-connection', connected),
});

// Automate process
// preload > main > interface

contextBridge.exposeInMainWorld('utilities', {
	getFiles: (path: string) => ipcRenderer.invoke('get-files', path),
	clientReady: () => ipcRenderer.send('client-loaded'),
});

// exposeInMainWorld('utilities') - une name of folder
// invoke('get-files') use name of file
// getFiles : (...args) => ipcRenderer.invoke('get-files', ...args)

// toCamelCase
