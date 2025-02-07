const { getGPUUsage } = require("./gpuUtils");
const config = require("../config/env");

async function handleStream(response, loadingMessage) {
    let botReply = "";
    let inThinkBlock = false;
    let modelName = "";
    let updateCounter = 0;
    let messageUpdated = false;

    return new Promise((resolve, reject) => {
        response.data.on("data", async (chunk) => {
            const rawData = chunk.toString().trim();
            if (!rawData || rawData === "[DONE]") return;

            const cleanedData = rawData.replace(/^data:\s*/, "");

            try {
                if (!cleanedData.startsWith("{")) return;
                const json = JSON.parse(cleanedData);

                if (!modelName && json.model) modelName = json.model;

                if (json.choices?.[0]?.delta?.content) {
                    let chunkContent = json.choices[0].delta.content;

                    if (chunkContent.includes("<think>")) {
                        inThinkBlock = true;
                        return;
                    }
                    if (chunkContent.includes("</think>")) {
                        inThinkBlock = false;
                        return;
                    }
                    if (inThinkBlock) return;

                    botReply += chunkContent;
                }

                // **Update Discord message only every `CHUNK_SIZE` updates**
                if (++updateCounter % config.CHUNK_SIZE === 0) {
                    const gpuUsage = await getGPUUsage();
                    const fullMessage = `**Model: ${modelName}**\n**GPU: ${gpuUsage}**\n\n${botReply}`;
                    
                    // **Ensure we don't overwrite AI responses with "thinking" updates**
                    if (!messageUpdated) {
                        await loadingMessage.edit(fullMessage.slice(0, config.MESSAGE_LIMIT));
                        messageUpdated = true;
                    }
                }
            } catch (error) {
                console.error("Error parsing stream chunk:", error);
            }
        });

        response.data.on("end", async () => {
            if (!botReply) {
                resolve("⚠️ No response received.");
            } else {
                const gpuUsage = await getGPUUsage();
                resolve(`**Model:** ${modelName} **GPU:** ${gpuUsage}\n${botReply}`);
            }
        });

        response.data.on("error", (error) => {
            reject(error);
        });
    });
}

module.exports = { handleStream };
