import { BrowserWindow } from 'electron';
// import {
//   authenticate,
//   createHttp1Request,
//   createWebSocketConnection,
//   LeagueWebSocket,
//   Credentials,
//   HttpRequestOptions,
// } from 'league-connect';

const league = require('league-connect');
import { LeagueWebSocket, Credentials, HttpRequestOptions } from 'league-connect';

class LeagueClientService {
  win: BrowserWindow;
  ws: LeagueWebSocket | null;
  subscriptions: Map<string, Function>;
  credentials: Credentials | null;

  constructor(win: BrowserWindow) {
    this.win = win;
    this.ws = null;
    this.subscriptions = new Map();
    this.credentials = null;
    this.connect();
  }

  async connect() {
    console.log('[Node] Wainting for league Client');
    this.ws = await league.createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
      },
      pollInterval: 3000,
      maxRetries: -1,
    });

    console.log('League Client Found!');
    this.listeners();
    this.authenticate();
    this.resubscribe();
    this.win.webContents.send('lcu-is-connected', true);
  }

  async authenticate() {
    this.credentials = await league.authenticate();
  }

  async request({ method, url, body }: HttpRequestOptions) {
    const response = await league.createHttp1Request({ method, url, body }, this.credentials!);
    return response;
  }

  listeners() {
    if (!this.ws) return;
    this.ws.on('close', () => {
      console.log(`League Client disconnected`);
      this.win.webContents.send('lcu-is-connected', false);
      this.connect();
    });
  }

  subscribe(endpoint: string, callback: Function) {
    if (!this.ws) return;
    console.log('Subscribing to', endpoint);
    this.ws.subscribe(endpoint, async (data, event) => await callback(data, event));
    this.subscriptions.set(endpoint, callback);
  }

  unsubscribe(endpoint: string) {
    this.subscriptions.delete(endpoint);
  }

  resubscribe() {
    if (!this.ws) return;
    for (const [endpoint, callback] of this.subscriptions) {
      console.log('Resubscribing to', endpoint);
      this.ws.subscribe(endpoint, async (data, event) => {
        await callback(data, event);
      });
    }
  }
}

export default LeagueClientService;
