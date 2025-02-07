🌀 Discord LLM Bot
A **Discord bot** that connects to a **local LLM server** and streams AI-generated responses while displaying **GPU usage** in real-time. This bot is structured using **modular industry best practices** for **scalability and maintainability**.

## 📌 Features
✅ **Discord integration** – Uses `discord.js` to interact with users  
✅ **Streaming AI responses** – Fetches responses from a local AI model (e.g., `phi-4`)  
✅ **Real-time GPU Monitoring** – Displays **NVIDIA GPU usage** while processing responses  
✅ **Optimized message updates** – Prevents **rate limits** and overwrites  
✅ **Modular structure** – Cleanly separates concerns into `services`, `utils`, `handlers`, and `config`  


---

## ⚙️ Setup & Installation

### **1. Clone the repository**
```sh
git clone https://github.com/yourusername/discord-llm-bot.git
cd discord-llm-bot
```

**2. Clone the repository**
```
npm install
```

**3. Setup Enviromental Variables in .env**
```
DISCORD_TOKEN=YOURTOKENHERE # The authentication token for the Discord bot. You can obtain this from the Discord Developer Portal.
STREAMING_ENABLED=true # Determines if the bot should stream responses in real-time. Set to 'true' for streaming or 'false' for a single response.
ENDPOINT="http://localhost:1234/v1/chat/completions" # The API endpoint for the AI server. This is where requests are sent to get AI-generated responses.
TEMPERATURE=0.8 # Controls the randomness of AI responses. Higher values (e.g., 1.0) make replies more creative, while lower values (e.g., 0.2) make them more deterministic.
MAX_TOKENS=4500 # The maximum number of tokens the AI model can generate in a single response. Adjust based on performance needs.
SYSTEM_PROMPT="" # The predefined instruction that sets the AI's behavior and response style before interacting with users.
MESSAGE_LIMIT=2000 # The maximum number of characters per message, ensuring responses stay within Discord's message limits (max 2000 characters).
CHUNK_SIZE=100 # The number of characters added per message update when streaming AI responses. Helps prevent Discord rate limiting.
DISCORD_BOT_NAME="Discord AI" # The bot's name, set in the Discord Developer Portal. This variable is unused in code but can be stored for reference.
MODEL="phi-4" # The specific AI model used for generating responses. This should match a model available on the AI server (e.g., "phi-4").
```

**4. Start the bot*
```
npm start
```

Make sure to get your token from the Discord Developer Portal, and invite it to your server. Initiate a chat with !chat your message here
