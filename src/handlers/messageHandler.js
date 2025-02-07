const { getGPUUsage } = require('../utils/gpuUtils');
const { chatWithAI } = require('../services/aiService');

async function handleChatCommand(message) {
    const userMessage = message.content.slice(6).trim();
    const loadingFrames = ["🌀", "💫", "✨", "🌪", "🌀"];
    let frameIndex = 0;
    let stopAnimation = false;

    // Send initial "thinking" message
    const loadingMessage = await message.reply("Thinking... 🌀");

    // GPU Animation Interval
    const animationInterval = setInterval(async () => {
        if (stopAnimation) return; // Prevent animation from running after AI starts responding

        const gpuUsage = await getGPUUsage();
        frameIndex = (frameIndex + 1) % loadingFrames.length;
        await loadingMessage.edit(`Thinking... ${loadingFrames[frameIndex]} - GPU: ${gpuUsage}`);
    }, 500);

    try {
        // Call AI Service, which now also stops the animation
        const response = await chatWithAI(userMessage, loadingMessage, () => {
            stopAnimation = true; // Ensure animation stops
            clearInterval(animationInterval);
        });

        await loadingMessage.edit(response); // Final response update
    } catch (error) {
        console.error("Error handling chat command:", error);
        clearInterval(animationInterval);
        await loadingMessage.edit("❌ Sorry, I couldn't reach the AI server.");
    }
}

module.exports = { handleChatCommand };
