import { BrowserWindow } from 'electron';

const league = require('league-connect');
import { LeagueWebSocket, Credentials, HttpRequestOptions } from 'league-connect';

interface Subscription {
  pluginId: string;
  callback: Function;
}

class LeagueClientService {
  win: BrowserWindow;
  ws: LeagueWebSocket | null;
  subscriptions: Map<string, Subscription[]>;
  credentials: Credentials | null;

  constructor(win: BrowserWindow) {
    this.win = win;
    this.ws = null;
    this.subscriptions = new Map();
    this.credentials = null;
  }

  async connect() {
    console.log('Wainting for league Client');
    this.ws = await league.createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
      },
      pollInterval: 3000,
      maxRetries: -1,
    });

    console.log('League Client Found!');
    this.listeners();
    this.resubscribe();
    await this.authenticate();
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

  subscribe(pluginId: string, endpoint: string, callback: Function) {
    if (!this.ws) return;

    const subscriptions = this.subscriptions.get(endpoint) || [];

    const existingSubscriptionIndex = subscriptions.findIndex((sub) => sub.pluginId === pluginId);
    if (existingSubscriptionIndex !== -1) {
      console.log(`Plugin ${pluginId} is already subscribed to ${endpoint}`);
      subscriptions[existingSubscriptionIndex].callback = callback; // Replace the existing callback
      this.subscriptions.set(endpoint, subscriptions);
      return;
    }

    // const existingSubscription = subscriptions.find((sub) => sub.pluginId === pluginId);
    // if (existingSubscription) {
    //   console.log(`Plugin ${pluginId} is already subscribed to ${endpoint}`);
    //   return;
    // }

    console.log(`Subscribing plugin ${pluginId} to ${endpoint}`);
    this.ws.subscribe(endpoint, async (data, event) => await callback(data, event));

    subscriptions.push({ pluginId, callback });
    this.subscriptions.set(endpoint, subscriptions);
  }

  unsubscribe(pluginId: string, endpoint: string) {
    if (!this.ws) return;

    const subscriptions = this.subscriptions.get(endpoint) || [];
    const updatedSubscriptions = subscriptions.filter((sub) => sub.pluginId !== pluginId);

    console.log(`Unsubscribing plugin ${pluginId} from ${endpoint}`);
    this.ws.unsubscribe(endpoint);

    updatedSubscriptions.forEach((sub) => this.ws!.subscribe(endpoint, async (data, event) => await sub.callback(data, event)));
    this.subscriptions.set(endpoint, updatedSubscriptions);
  }

  resubscribe() {
    for (const [endpoint, subscriptions] of this.subscriptions) {
      subscriptions.forEach((subscription) => {
        console.log('Resubscribing to', endpoint, subscription.pluginId);
        this.ws!.subscribe(endpoint, async (data, event) => await subscription.callback(data, event));
      });
    }
  }
}

export default LeagueClientService;
