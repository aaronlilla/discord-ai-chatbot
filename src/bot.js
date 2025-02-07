const { Client, GatewayIntentBits } = require('discord.js');
const { handleChatCommand } = require('./handlers/messageHandler');
const config = require('./config/env');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.content.toLowerCase().startsWith("!chat")) {
        handleChatCommand(message);
    }
});

module.exports = client
