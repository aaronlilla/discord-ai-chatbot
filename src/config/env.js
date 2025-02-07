require('dotenv').config();

module.exports = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN, // The authentication token for the Discord bot. You can obtain this from the Discord Developer Portal.
    STREAMING_ENABLED: process.env.STREAMING_ENABLED === 'true', // Determines if the bot should stream responses in real-time. Set to 'true' for streaming or 'false' for a single response.
    ENDPOINT: process.env.ENDPOINT, // The API endpoint for the AI server. This is where requests are sent to get AI-generated responses.
    TEMPERATURE: parseFloat(process.env.TEMPERATURE), // Controls the randomness of AI responses. Higher values (e.g., 1.0) make replies more creative, while lower values (e.g., 0.2) make them more deterministic.
    MAX_TOKENS: parseInt(process.env.MAX_TOKENS, 10), // The maximum number of tokens the AI model can generate in a single response. Adjust based on performance needs.
    SYSTEM_PROMPT: process.env.SYSTEM_PROMPT, // The predefined instruction that sets the AI's behavior and response style before interacting with users.
    MESSAGE_LIMIT: parseInt(process.env.MESSAGE_LIMIT, 10), // The maximum number of characters per message, ensuring responses stay within Discord's message limits (max 2000 characters).
    CHUNK_SIZE: parseInt(process.env.CHUNK_SIZE, 10), // The number of characters added per message update when streaming AI responses. Helps prevent Discord rate limiting.
    DISCORD_BOT_NAME: process.env.DISCORD_BOT_NAME, // The bot's name, set in the Discord Developer Portal. This variable is unused in code but can be stored for reference.
    MODEL: process.env.MODEL, // The specific AI model used for generating responses. This should match a model available on the AI server (e.g., "phi-4").
};
