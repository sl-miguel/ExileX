import { createWebSocketConnection, authenticate, createHttp1Request } from 'league-connect';
import { green, red, yellow, blue } from 'colorette';

const ws = await createWebSocketConnection({
	authenticationOptions: {
		awaitConnection: true,
	},
	pollInterval: 3000,
	maxRetries: -1,
});

console.log(blue(`League Client detected.`));

// Procs when whe are at the loby /lol-lobby/v2/lobby
ws.subscribe('/lol-end-of-game/v1/eog-stats-block', async (data, event) => {
	if (event.eventType === 'Delete') return console.log(red('Ignored event Delete'));
	if (event.eventType === 'Update') return console.log(red('Ignored event Update'));
	console.log(blue(`End Game Screen detected.`));

	const friends = [];
	const credentials = await authenticate();

	// Get me
	const response = await createHttp1Request({ method: 'GET', url: `/lol-chat/v1/me` }, credentials);
	const me = response.json();
	friends.push(me.summonerId);

	// Get Friends
	const response2 = await createHttp1Request({ method: 'GET', url: `/lol-chat/v1/friends` }, credentials);
	const friendsData = response2.json();

	for (const friend of friendsData) {
		friends.push(friend.summonerId);
	}

	// Report All Players
	for (const team of event.data.teams) {
		for (const player of team.players) {
			if (player.botPlayer) {
				console.log(yellow(`${player.summonerName} was skipped because it's a bot.`));
				continue;
			}

			if (player.summonerId === me.summonerId) {
				console.log(green(`${player.summonerName} was skipped because it's you.`));
				continue;
			}

			if (friends.includes(player.summonerId)) {
				console.log(green(`${player.summonerName} was skipped because it's your friend.`));
				continue;
			}

			const report = {
				comment: 'Bots..',
				gameId: event.data.gameId,
				categories: ['NEGATIVE_ATTITUDE', 'VERBAL_ABUSE', 'LEAVING_AFK', 'ASSISTING_ENEMY_TEAM', 'HATE_SPEECH', 'THIRD_PARTY_TOOLS', 'INAPPROPRIATE_NAME'],
				offenderSummonerId: player.summonerId,
				offenderPuuid: player.puuid,
			};

			const response = await createHttp1Request({ method: 'POST', url: `/lol-player-report-sender/v1/end-of-game-reports`, body: report }, credentials);
			if (response.status === 204) console.log(red(`${player.summonerName} is reported.`));
			else console.log(response.json());
		}
		// console.log('TEAM', team);
		// console.log('GAMEID', event.data.gameId);
	}
});

// eventType: 'Create',
// eventType: 'Update',
