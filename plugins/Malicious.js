class Malicious {
  constructor() {
    this.name = 'Malicious Mode';
    this.description = 'Multiple helpers functions.';
    this.active = false;
    this.endpoint = '/';
    this.invervalId = null;
  }

  reload() {
    return [{ id: 'malicious.button', keys: ['text'] }];
  }

  setup() {
    console.log('Malicious.js loaded.');

    const configuration = [
      { id: 'malicious.message.text', type: 'text', value: 'Love you !' },
      { id: 'malicious.message.spam', type: 'paragraph', value: 'Number of messages per second' },
      { id: 'malicious.slider', type: 'slider', max: 20, min: 1, step: 1, value: 2 },
      { id: 'malicious.message.user.text', type: 'paragraph', value: 'User the we want to spam USERNAME#TAG' },
      { id: 'malicious.message.user', type: 'text', value: 'USERNAME#TAG' },
      { id: 'malicious.button', type: 'button', text: 'Start' },
    ];

    return configuration;
  }

  async sendMessage(lcu, player, message) {
    // Need to add the good server
    console.log('Sending message');
    lcu.request({
      method: 'POST',
      url: `/lol-chat/v1/conversations/${player.puuid}@eu1.pvp.net/messages`,
      body: {
        body: message.value,
        type: 'chat',
      },
    });
  }

  async execute() {
    console.log('Plugin Blitz.js executed.');
  }

  async onPress(getSetting, lcu, settingId) {
    const button = getSetting('malicious.button');

    if (button.value === 'Stop') {
      clearInterval(this.invervalId);
      this.invervalId = null;
      button.value = 'Start';
      return console.log('Stopping..');
    }

    const message = getSetting('malicious.message.text');
    const timer = getSetting('malicious.slider');

    const summoner = getSetting('malicious.message.user');
    const [name, tag] = summoner.value.split('#');

    const response = await lcu.request({ method: 'GET', url: `/lol-summoner/v1/summoners?name=${encodeURIComponent(name)}%23${tag}` });
    const player = await response.json();

    this.invervalId = setInterval(() => this.sendMessage(lcu, player, message), 1000 / timer.value);
    button.value = 'Stop';
  }
}

module.exports = Malicious;
