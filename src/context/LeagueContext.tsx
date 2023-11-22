import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { EventEmitter } from 'events';
const leagueConnect = require('@electron/remote').require('league-connect');

class Lcu {
	ws: typeof leagueConnect.LeagueWebSocket | null;
	subscriptions: Map<string, Function>;

	constructor() {
		this.ws = null;
		this.subscriptions = new Map();
		this.connect();
	}

	async connect() {
		console.log('[Node] Wainting for league Client');
		this.ws = await leagueConnect.createWebSocketConnection({
			authenticationOptions: {
				awaitConnection: true,
			},
			pollInterval: 3000,
			maxRetries: -1,
		});

		console.log('League Client Found!');
		event.emit('isConnected', true);
		this.listeners();
		this.resubscribe();
	}

	listeners() {
		if (!this.ws) return console.log('[Listeners] Websocket is null');
		this.ws.on('close', () => {
			console.log(`League Client disconnected`);
			event.emit('isConnected', false);
			this.connect();
		});
	}

	subscribe(endpoint: string, callback: (data: any, event: any) => Promise<void>) {
		if (!this.ws) return console.log('[Subscribe] Websocket is null');
		console.log('Subscribing to', endpoint);
		this.ws.subscribe(endpoint, async (data: any, event: any) => await callback(data, event));
		this.subscriptions.set(endpoint, callback);
	}

	unsubscribe(endpoint: string) {
		this.subscriptions.delete(endpoint);
	}

	resubscribe() {
		if (!this.ws) return console.log('[Resubscribe] Websocket is null');
		for (const [endpoint, callback] of this.subscriptions) {
			console.log('Resubscribing to', endpoint);
			this.ws.subscribe(endpoint, async (data: any, event: any) => {
				await callback(data, event);
			});
		}
	}
}

const event = new EventEmitter();
const client = new Lcu();

interface LcuContextValue {
	lcu: Lcu;
	isConnected: boolean;
}

const LcuContext = createContext<LcuContextValue | null>(null);

export const useLcu = () => {
	const context = useContext(LcuContext);
	if (!context) throw new Error('useLcu must be used within an LcuProvider');
	return context;
};

interface LcuProviderProps {
	children: ReactNode;
}

export const LcuProvider: FC<LcuProviderProps> = ({ children }) => {
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const handleConnection = (isConnected: boolean) => {
			setConnected(isConnected);
		};

		event.on('isConnected', handleConnection);

		return () => {
			event.removeListener('isConnected', handleConnection);
		};
	}, []);

	return <LcuContext.Provider value={{ lcu: client, isConnected: connected }}>{children}</LcuContext.Provider>;
};
