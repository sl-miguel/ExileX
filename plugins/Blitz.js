class Blitz {
  constructor() {
    this.name = 'Blitz Mode';
    this.description = 'Swaps between Jungle and Lane positions, granting you the freedom to switch roles during the champions select phase.';
    this.active = false;
    this.endpoint = '/';
  }

  setup() {
    console.log('Blitz.js loaded.');

    const configuration = [
      { id: 'blitz.radio', type: 'radio', value: 'Jungle', options: ['Lane', 'Jungle'] },
      { id: 'blitz.button', type: 'button', text: 'Validate' },
    ];

    return configuration;
  }

  async execute() {
    console.log('Plugin Blitz.js executed.');
  }

  async onPress(getSetting, lcu, settingId) {
    const radio = getSetting('blitz.radio');

    if (radio.value === 'Jungle') {
      await lcu.request({ method: 'PATCH', url: `/lol-champ-select/v1/session/my-selection`, body: { spell1Id: 4, spell2Id: 11 } });
    }

    if (radio.value === 'Lane') {
      await lcu.request({ method: 'PATCH', url: `/lol-champ-select/v1/session/my-selection`, body: { spell1Id: 4, spell2Id: 7 } });
    }
  }
}

module.exports = Blitz;
