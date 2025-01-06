const { useSingleFileAuthState, makeWASocket, fetchLatestBaileysVersion, getBinaryNodeChild } = require('@adiwajshing/baileys');
const fs = require('fs');

// Fetch latest version and create socket
async function startBot() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const { state, saveState } = useSingleFileAuthState('auth_info.json');
    const sock = makeWASocket({
        version,
        printQRInTerminal: true,
        auth: state,
    });

    // Save the session to a file
    sock.ev.on('auth-state-update', (update) => {
        if (update.credentials) {
            saveState(update.credentials);
        }
    });

    // Send video to groups
    async function sendVideoToGroups(url) {
        // Group IDs
        const groupIds = [
            '94771251788-1634286118@g.us',
            '120363024380504469@g.us',
            '120363040925745773@g.us',
            '120363040937484662@g.us',
            '120363041717810457@g.us'
        ];

        // Decode URL and get filename
        const decodedUrl = decodeURIComponent(url.replace(/%20/g, ' '));
        const decodedFileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1);

        // Send video to each group
        for (let groupId of groupIds) {
            const message = {
                video: { url: decodedUrl },
                mimetype: 'video/x-matroska',
                fileName: decodedFileName,
            };

            // Send message to group
            await sock.sendMessage(groupId, message);
            console.log(`Sent video to group ${groupId}`);
        }
    }

    // Example usage of sendVideoToGroups
    sendVideoToGroups('https://example.com/video-file.mkv');
}

// Start the bot
startBot();
