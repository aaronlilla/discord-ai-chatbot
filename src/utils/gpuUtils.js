const { exec } = require('child_process');

async function getGPUUsage() {
    return new Promise((resolve) => {
        exec("nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits", (error, stdout) => {
            if (error) {
                resolve("GPU: Not Available ❌");
                return;
            }
            resolve(`${stdout.trim()}%`);
        });
    });
}

module.exports = { getGPUUsage };
