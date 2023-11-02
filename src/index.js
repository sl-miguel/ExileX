import { createWebSocketConnection } from 'league-connect';
import { blue } from 'colorette';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir } from 'fs/promises';

const subscriptions = new Map();

const connectWS = async () => {
	console.log(blue('Waiting for League Client to start.'));

	const ws = await createWebSocketConnection({
		authenticationOptions: {
			awaitConnection: true,
		},
		pollInterval: 3000,
		maxRetries: -1,
	});

	// Subscribe to modules
	const index = fileURLToPath(import.meta.url);
	const src = dirname(index);

	const pluginPath = join(src, 'plugins');
	const files = await readdir(pluginPath);

	for (const file of files) {
		const filePath = join(pluginPath, file);
		const { default: Plugin } = await import(filePath);
		const plugin = new Plugin(ws);
		ws.subscribe(plugin.endpoint, async (data, event) => await plugin.load(data, event));
		subscriptions.set(plugin.endpoint, true);
	}

	ws.on('close', () => {
		console.log(blue(`Disconnected to League Client`));

		for (const subscription of subscriptions.keys()) {
			ws.unsubscribe(subscription);
			subscriptions.delete(subscription);
		}

		connectWS();
	});

	console.log(blue(`Connected to League Client`));
};

connectWS();

// caxa --input "src" --output "exilex.app" -- "{{caxa}}/node_modules/.bin/node" "--no-deprecation" "{{caxa}}/index.js"
