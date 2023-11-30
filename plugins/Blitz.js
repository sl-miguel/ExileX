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
      { id: 'blitz.button', type: 'button', text: 'Validate' },
    ];

    return configuration;
  }

  // async execute(data, event) {}
}

module.exports = Blitz;
