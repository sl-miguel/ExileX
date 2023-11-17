import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('lcu', {
	onConnect: (callback: any) => ipcRenderer.on('ws-connect', callback),
	onDisconnect: (callback: any) => ipcRenderer.on('ws-disconnect', callback),
});

// Automate process
// preload > main > interface

contextBridge.exposeInMainWorld('utilities', {
	getFiles: (path: string) => ipcRenderer.invoke('get-files', path),
	// print: (message: string, ...args: any[]) => ipcRenderer.invoke('print', message, ...args),
});

// exposeInMainWorld('utilities') - une name of folder
// invoke('get-files') use name of file
// getFiles : (...args) => ipcRenderer.invoke('get-files', ...args)

// toCamelCase
