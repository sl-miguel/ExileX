/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
	interface ProcessEnv {
		DIST: string;
		VITE_PUBLIC: string;
	}
}

interface Window {
	lcu: {
		connection(connected: any): void;
	};
	utilities: {
		print(message: string, ...args: any[]);
		clientReady(): void;
	};
}
