const axios = require("axios");
const { handleStream } = require("../utils/streamHandler");
const config = require("../config/env");

async function chatWithAI(userMessage, loadingMessage, stopAnimation) {
    try {
        const response = await axios.post(
            config.ENDPOINT,
            {
                model: config.MODEL,
                messages: [
                    { role: "system", content: config.SYSTEM_PROMPT },
                    { role: "user", content: userMessage }
                ],
                temperature: config.TEMPERATURE,
                max_tokens: config.MAX_TOKENS,
                stream: config.STREAMING_ENABLED
            },
            {
                headers: { "Content-Type": "application/json" },
                responseType: "stream"
            }
        );

        // **STOP ANIMATION when the response starts streaming**
        stopAnimation();

        return await handleStream(response, loadingMessage);
    } catch (error) {
        console.error("Error calling API:", error);
        throw new Error("❌ AI server unreachable.");
    }
}

module.exports = { chatWithAI };
