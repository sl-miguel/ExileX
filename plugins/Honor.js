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

    // More stats (first blood, vision score...)
    // const responsHistory = await lcu.request({ method: 'GET', url: `/lol-match-history/v1/games/${honorList.gameId}` })
    // const dataHistory = await responsHistory.json();
    // console.log('HISTORY DATA', dataHistory);

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

        const baseStats = this.stats();
        const bestStats = this.bestStats(gameStats.teams, baseStats);
        const bestPlayers = this.bestPlayer(gameStats.teams, bestStats);
        const bestScorePlayer = this.bestScore(bestPlayers);
        player = bestScorePlayer.player;
        console.log(`Best score is ${bestScorePlayer.player.championName} with: ${bestScorePlayer.score}`);
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

  bestPlayer(teams, stats, ignore = true) {
    const playersScores = [];

    for (const team of teams) {
      if (ignore && !team.isPlayerTeam) continue;

      for (const player of team.players) {
        if (ignore && player.isLocalPlayer) continue;

        let score = 0;
        console.log(`${player.championName} :`);
        for (const stat in stats) {
          let actualStat = player.stats[stat];
          const { type, value: bestValue, weigth } = stats[stat];
          console.log(`- ${stat} : ${bestValue}`);

          if (type === 'lower') {
            score += actualStat ? (bestValue / actualStat) * weigth : weigth / 5 + weigth;
            continue;
          }

          score += (actualStat / bestValue) * weigth;
        }

        console.log(`- Score : ${score} \n`);
        playersScores.push({ score, player });
      }
    }

    return playersScores;
  }

  bestStats(teams, modifiedStats, ignore = false) {
    const bestStats = structuredClone(modifiedStats);

    for (const actualStat in bestStats) {
      const element = bestStats[actualStat];
      if (element.type === 'lower') element.value = Infinity;
      else element.value = -Infinity;
    }

    for (const team of teams) {
      if (ignore && !team.isPlayerTeam) continue;

      for (const player of team.players) {
        if (ignore && player.isLocalPlayer) continue;
        const stats = player.stats;
        for (const stat in stats) {
          if (!(stat in bestStats)) continue;

          const { type } = bestStats[stat];
          switch (type) {
            case 'lower':
              if (bestStats[stat].value <= stats[stat]) continue;
              bestStats[stat].value = stats[stat];
              break;

            default:
              if (bestStats[stat].value >= stats[stat]) continue;
              bestStats[stat].value = stats[stat];
              break;
          }
        }
      }
    }

    return bestStats;
  }

  bestScore(playersScores) {
    let bestScore = -Infinity;
    let bestPlayer = null;

    for (const { score, player } of playersScores) {
      console.log(`${player.championName} has a score: ${score} points.`);

      if (score > bestScore) {
        bestScore = score;
        bestPlayer = player;
      }
    }

    return { score: bestScore, player: bestPlayer };
  }

  random(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  stats() {
    return {
      CHAMPIONS_KILLED: {
        weigth: 1,
        type: 'higher',
      },
      NUM_DEATHS: {
        weigth: 1,
        type: 'lower',
      },
      ASSISTS: {
        weigth: 0.75,
        type: 'higher',
      },
      TOTAL_DAMAGE_DEALT_TO_CHAMPIONS: {
        weigth: 0.95,
        type: 'higher',
      },
      TOTAL_DAMAGE_TAKEN: {
        weigth: 0.75,
        type: 'higher',
      },
      TOTAL_DAMAGE_SELF_MITIGATED: {
        weigth: 0.2,
        type: 'higher',
      },
      TIME_CCING_OTHERS: {
        weigth: 0.15,
        type: 'higher',
      },
      TOTAL_HEAL_ON_TEAMMATES: {
        weigth: 0.25,
        type: 'higher',
      },
      TOTAL_DAMAGE_SHIELDED_ON_TEAMMATES: {
        weigth: 0.25,
        type: 'higher',
      },
    };
  }
}

module.exports = Honor;
