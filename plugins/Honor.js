/// <reference path="../src/electron/typings/EndGame.d.ts" />

class Honor {
  constructor() {
    this.name = 'Auto Honor';
    this.description = 'Automatically honors';
    this.active = true;
    this.endpoint = '/lol-gameflow/v1/gameflow-phase';
  }

  setup() {
    console.log('Honor.js loaded.');

    const configuration = [
      { id: 'honor.system', type: 'radio', value: 'Shotcalling', options: ['Cool', 'Shotcalling', 'GG', 'Skip'] },
      { id: 'honor.player.type', type: 'radio', value: 'Best Player', options: ['Best Player', 'Random', 'Custom'] },
      { id: 'honor.player.name', type: 'text', value: 'GR0236621563#EUW' }, // temp
    ];

    return configuration;
  }

  async execute(getSetting, lcu, event) {
    if (event.data !== 'PreEndOfGame') return;

    const response = await lcu.request({ method: 'GET', url: '/lol-honor-v2/v1/ballot' });
    const honorList = await response.json();

    if (!honorList.eligiblePlayers.length) return;

    const honorsTypes = {
      Cool: 'COOL',
      Shotcalling: 'SHOTCALLER',
      GG: 'HEART',
      Skip: 'OPT_OUT',
    };

    const honorSystem = getSetting('honor.system');
    const honorType = getSetting('honor.player.type');

    if (honorSystem.value === 'Skip') {
      const honor = {
        gameId: honorList.gameId,
        honorType: honorsTypes[honorSystem.value],
        puuid: '',
        summonerId: 0,
      };

      const isHonored = await lcu.request({ method: 'POST', url: '/lol-honor-v2/v1/honor-player', body: honor });
      const data = await isHonored.json();
      console.log('Skiped.', JSON.parse(data));
      return;
    }

    let player;
    switch (honorType.value) {
      case 'Random':
        player = this.random(honorList.eligiblePlayers);
        break;

      case 'Custom':
        const customPlayer = getSetting('honor.player.name');
        const [customName, customTag] = customPlayer.value.split('#');
        const response = await lcu.request({ method: 'GET', url: `/lol-summoner/v1/summoners?name=${customName}%23${customTag}` });
        player = await response.json();
        break;

      default:
        const gameResponse = await lcu.request({ method: 'GET', url: '/lol-end-of-game/v1/eog-stats-block' });
        const gameStats = await gameResponse.json();
        player = this.bestPlayer(gameStats.teams);
        break;
    }

    const honor = {
      gameId: honorList.gameId,
      honorType: honorsTypes[honorSystem.value],
      puuid: player.puuid,
      summonerId: player.summonerId,
    };

    const isHonored = await lcu.request({ method: 'POST', url: '/lol-honor-v2/v1/honor-player', body: honor });
    const data = await isHonored.json();
    console.log('Done.', JSON.parse(data));
  }

  bestPlayer(teams) {
    let bestPlayer = null;
    let highestScore = -Infinity;

    for (const team of teams) {
      if (!team.isPlayerTeam) continue;

      for (const player of team.players) {
        if (player.isLocalPlayer) continue;

        const score = this.score(player);
        console.log(`${player.summonerName} (${player.championName}) has a score: ${score}`);
        if (score <= highestScore) continue;

        highestScore = score;
        bestPlayer = player;
      }
    }

    return bestPlayer;
  }

  random(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  score(player) {
    const WEIGHT_KDA = 0.35;
    const WEIGHT_VISION = 0.15;
    const WEIGHT_DAMAGES_DEAL = 0.3;
    const WEIGHT_DAMAGES_TAKEN = 0.2;

    const SCORE_KILLS_AND_ASSISTS = player.stats.ASSISTS + player.stats.CHAMPIONS_KILLED;
    const SCORE_KDA = player.stats.NUM_DEATHS ? SCORE_KILLS_AND_ASSISTS / player.stats.NUM_DEATHS : SCORE_KILLS_AND_ASSISTS;
    const SCORE_VISION = player.stats.VISION_WARDS_BOUGHT_IN_GAME;
    const SCORE_DAMAGES_DEAL = player.stats.TOTAL_DAMAGE_DEALT;
    const SCORE_DAMAGES_TAKEN = player.stats.TOTAL_DAMAGE_TAKEN;

    const CONTRIBUTION_KDA = SCORE_KDA * WEIGHT_KDA;
    const CONTRIBUTION_VISION = SCORE_VISION * WEIGHT_VISION;
    const CONTRIBUTION_DAMAGES_DEAL = SCORE_DAMAGES_DEAL * WEIGHT_DAMAGES_DEAL;
    const CONTRIBUTION_DAMAGES_TAKEN = SCORE_DAMAGES_TAKEN * WEIGHT_DAMAGES_TAKEN;

    const TOTAL = CONTRIBUTION_KDA + CONTRIBUTION_VISION + CONTRIBUTION_DAMAGES_DEAL + CONTRIBUTION_DAMAGES_TAKEN;
    return TOTAL;
  }
}

module.exports = Honor;
