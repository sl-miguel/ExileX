import { createWebSocketConnection, LeagueWebSocket } from 'league-connect';

class LeagueClientService {
  ws: LeagueWebSocket | null;
  subscriptions: Map<string, Function>;

  constructor() {
    this.ws = null;
    this.subscriptions = new Map();
    this.connect();
  }

  async connect() {
    console.log('[Node] Wainting for league Client');
    this.ws = await createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
      },
      pollInterval: 3000,
      maxRetries: -1,
    });

    console.log('League Client Found!');
    this.listeners();
    this.resubscribe();
  }

  listeners() {
    if (!this.ws) return;
    this.ws.on('close', () => {
      console.log(`League Client disconnected`);
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

module.exports = LeagueClientService;
