/// <reference path="../src/electron/typings/PluginTypings.d.ts" />

class Accept {
  constructor() {
    this.name = 'Auto-accept';
    this.description = 'Auto accepts game queues.';
    this.active = true;
    this.endpoint = '/lol-gameflow/v1/gameflow-phase';
  }

  setup() {
    console.log('Accept.js loaded.');

    const configuration = [
      { id: 'accept.toggle', type: 'toggle', text: 'Use Timer', value: true },
      { id: 'accept.slider', type: 'slider', max: 10, min: 0, step: 1, value: 10 },
    ];

    return configuration;
  }

  async sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  async execute(getSetting, lcu, event) {
    if (event.data !== 'ReadyCheck') return;
    const toggle = getSetting('accept.toggle');
    const timer = getSetting('accept.slider');
    if (toggle.value) await this.sleep(timer.value);
    const response = await lcu.request({ method: 'POST', url: '/lol-matchmaking/v1/ready-check/accept' });
    if (response.ok) console.log('Auto accepted successfully.');
  }
}

module.exports = Accept;
