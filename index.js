const client = require('./src/bot');
const config = require('./src/config/env');

client.login(config.DISCORD_TOKEN);
