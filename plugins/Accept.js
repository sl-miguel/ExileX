class Accept {
  setup() {
    console.log('Accept.js loaded.');

    const configuration = [
      { type: 'title', title: 'Auto-accept', value: false },
      { type: 'description', description: 'Auto accepts game queues.' },
      { id: 'accept.toggle', type: 'toggle', text: 'Use Timer', value: false },
      { id: 'accept.slider', type: 'slider', max: 5, min: 0, value: 3 },
    ];

    return configuration;
  }

  // async execute(data, event) {}
}

module.exports = Accept;
