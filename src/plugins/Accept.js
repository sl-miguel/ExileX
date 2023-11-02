import { authenticate, createHttp1Request } from 'league-connect';
import { green } from 'colorette';

class Accept {
	constructor() {
		this.name = 'Auto Accept';
		this.endpoint = '/lol-gameflow/v1/gameflow-phase';
	}

	async load(data, event) {
		if (event.data !== 'ReadyCheck') return;
		const credentials = await authenticate();
		const response = await createHttp1Request({ method: 'POST', url: `/lol-matchmaking/v1/ready-check/accept` }, credentials);
		if (response.ok) console.log(green('Auto accepted successfully.'));
	}
}

export default Accept;
