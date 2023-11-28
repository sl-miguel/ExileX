class Blitz {
  setup() {
    console.log('Blitz.js loaded.');

    const configuration = [
      { type: 'title', title: 'Blitz Mode (exploit)', value: false },
      { type: 'description', description: 'Plugin that can chose jungle or lane in the blitz gamemode.' },
      { id: 'blitz.radio', type: 'radio', value: 'Jungle', options: ['Lane', 'Jungle'] },
      { id: 'blitz.button', type: 'button', text: 'Validate' },
    ];

    return configuration;
  }

  // async execute(data, event) {}
}

module.exports = Blitz;
