class Blitz {
  constructor() {
    this.name = 'Blitz Mode (exploit)';
    this.description = 'Plugin that can chose jungle or lane in the blitz gamemode.';
    this.active = false;
    this.endpoint = '/';
  }

  setup() {
    console.log('Blitz.js loaded.');

    const configuration = [
      { id: 'blitz.radio', type: 'radio', value: 'Jungle', options: ['Lane', 'Jungle'] },
      { id: 'blitz.checkbox', type: 'checkbox', value: ['A'], options: ['A', 'B', 'C'] },
      { id: 'blitz.button', type: 'button', text: 'Validate' },
    ];

    return configuration;
  }

  async execute() {
    console.log('Plugin Blitz.js executed.');
  }

  async onPress(getSetting, lcu, settingId) {
    const button = getSetting('blitz.button');
    const outline = getSetting('blitz.button.outline');

    if (button.id === settingId) {
      console.log('Plugin Blitz.js pressed.', settingId);
    }

    if (outline.id === settingId) {
      console.log('Plugin Blitz.js pressed.', settingId);
    }
  }
}

module.exports = Blitz;
