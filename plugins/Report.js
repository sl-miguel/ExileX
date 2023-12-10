class Report {
  constructor() {
    this.name = 'Auto-report';
    this.description = 'Plugin that auto reports players at the end of the game.';
    this.active = true;
    this.endpoint = '/lol-end-of-game/v1/eog-stats-block';
  }

  setup() {
    console.log('Report.js loaded.');

    const configuration = [
      { id: 'report.allies', type: 'toggle', buble: 'If active it will report allies', text: 'Allies', value: true },
      { id: 'report.friends', type: 'toggle', buble: 'If active it will report friends', text: 'Friends', value: false },
      { id: 'report.enemies', type: 'toggle', buble: 'If active it will report enemies', text: 'Enemies', value: true },
      { id: 'report.message.toggle', type: 'toggle', text: 'Custom Message', value: true },
      { id: 'report.message.text', type: 'text', value: 'To much bots in Coop vs AI' },
      // { id: 'report.categories', type: 'checkbox', value: ['THIRD_PARTY_TOOLS'], options: ['NEGATIVE_ATTITUDE', 'VERBAL_ABUSE', 'LEAVING_AFK', 'ASSISTING_ENEMY_TEAM', 'HATE_SPEECH', 'THIRD_PARTY_TOOLS', 'INAPPROPRIATE_NAME'] },
    ];

    return configuration;
  }

  async execute(getSetting, lcu, event) {
    if (event.eventType === 'Delete') return;
    if (event.eventType === 'Update') return;
    console.log(`End Game Screen detected.`);

    const friendsList = [];
    const reportFriends = getSetting('report.friends');
    const reportEnemies = getSetting('report.enemies');
    const reportAllies = getSetting('report.allies');
    const reportMessage = getSetting('report.message.text');

    // Get accountInfos
    let response = await lcu.request({ method: 'GET', url: '/lol-chat/v1/me' });
    const accountInfos = response.json();
    friendsList.push(accountInfos.summonerId);

    // Get Friends
    response = await lcu.request({ method: 'GET', url: `/lol-chat/v1/friends` });
    const friendsData = response.json();

    for (const friend of friendsData) {
      friendsList.push(friend.summonerId);
    }

    // Report Players
    console.log('Reports:');
    const myAllies = event.data.teams.find((team) => team.players.some((player) => player.summonerId === accountInfos.summonerId));

    for (const team of event.data.teams) {
      for (const player of team.players) {
        if (player.summonerId === accountInfos.summonerId) {
          console.log(`- ${player.summonerName} was skipped because it's you.`);
          continue;
        }

        if (!reportAllies.value && myAllies.teamId === team.teamId) {
          console.log(`- ${player.summonerName} was skipped because it's your allie.`);
          continue;
        }

        if (!reportEnemies.value && myAllies.teamId !== team.teamId) {
          console.log(`- ${player.summonerName} was skipped because it's your enemy.`);
          continue;
        }

        if (player.botPlayer) {
          console.log(`- ${player.summonerName} was skipped because it's a bot.`);
          continue;
        }

        if (!reportFriends.value && friendsList.includes(player.summonerId)) {
          console.log(`- ${player.summonerName} was skipped because it's your friend.`);
          continue;
        }

        const report = {
          comment: reportMessage.value,
          gameId: event.data.gameId,
          categories: [
            'NEGATIVE_ATTITUDE',
            'VERBAL_ABUSE',
            'LEAVING_AFK',
            'ASSISTING_ENEMY_TEAM',
            'HATE_SPEECH',
            'THIRD_PARTY_TOOLS',
            'INAPPROPRIATE_NAME',
          ],
          offenderSummonerId: player.summonerId,
          offenderPuuid: player.puuid,
        };

        const response = await lcu.request({ method: 'POST', url: `/lol-player-report-sender/v1/end-of-game-reports`, body: report });
        if (response.status === 204) console.log(`- ${player.summonerName} is reported.`);
        else console.log(response.json());
      }
    }
  }
}

module.exports = Report;
