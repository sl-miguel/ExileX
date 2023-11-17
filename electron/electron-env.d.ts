/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
	interface ProcessEnv {
		DIST: string;
		VITE_PUBLIC: string;
	}
}

interface Window {
	lcu: {
		onConnect(callback: any): void;
		onDisconnect(callback: any): void;
	};
	utilities: {
		print(message: string, ...args: any[]);
	};
}
