class Report {
  setup() {
    console.log('Report.js loaded.');

    const configuration = [
      { type: 'title', title: 'Auto Report', value: false },
      { type: 'description', description: 'Plugin that auto reports players at the end of the game.' },
      { id: 'report.allies', type: 'toggle', buble: 'If active it will report allies', text: 'Allies', value: true },
      {
        id: 'report.friends',
        type: 'toggle',
        buble: 'If active it will report friends',
        text: 'Friends',
        value: false,
      },
      { id: 'report.enemies', type: 'toggle', buble: 'If active it will report enemies', text: 'Enemies', value: true },
      { id: 'report.message.toggle', type: 'toggle', text: 'Custom Message', value: true },
      { id: 'report.message.text', type: 'text', text: '' },
    ];

    return configuration;
  }

  // async execute(data, event) {}
}

module.exports = Report;
