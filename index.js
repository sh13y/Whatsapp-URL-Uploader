import dotenv from "dotenv";
dotenv.config();
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import pino from "pino";
import { Boom } from "@hapi/boom";
import mime from "mime-types";
import qrcode from "qrcode-terminal";

// Helper function to format and simplify messages
function smsg(SHYZUKI, mek) {
    if (!mek) return mek;
    const mtype = Object.keys(mek.message)[0];
    mek.id = mek.key.id;
    mek.isBaileys = mek.key.id.startsWith("BAE5") && mek.key.id.length === 16;
    mek.chat = mek.key.remoteJid;
    mek.fromMe = mek.key.fromMe;
    mek.isGroup = mek.chat.endsWith("@g.us");
    mek.sender = mek.fromMe
        ? SHYZUKI.user.id
        : mek.isGroup
        ? mek.key.participant
        : mek.key.remoteJid;
    mek.mtype = mtype;
    mek.text =
        mek.message.conversation ||
        mek.message[mtype]?.caption ||
        mek.message[mtype]?.text ||
        "";
    mek.mentionedJid = mek.message[mtype]?.contextInfo?.mentionedJid || [];
    return mek;
}

// Helper function to extract message content
function extractMessageContent(message) {
    const msg = message.message;

    if (!msg) return "No content";

    if (msg.conversation) return msg.conversation;
    if (msg.imageMessage) return `[Image: ${msg.imageMessage.caption || "No caption"}]`;
    if (msg.videoMessage) return `[Video: ${msg.videoMessage.caption || "No caption"}]`;
    if (msg.documentMessage) return `[Document: ${msg.documentMessage.fileName || "Unnamed"}]`;
    if (msg.audioMessage) return `[Audio Message]`;
    if (msg.stickerMessage) return `[Sticker Message]`;
    if (msg.extendedTextMessage) return msg.extendedTextMessage.text;
    if (msg.buttonsResponseMessage) return `[Button Response: ${msg.buttonsResponseMessage.selectedButtonId}]`;
    if (msg.listResponseMessage) return `[List Response: ${msg.listResponseMessage.singleSelectReply.selectedRowId}]`;
    if (msg.templateButtonReplyMessage)
        return `[Template Button Reply: ${msg.templateButtonReplyMessage.selectedId}]`;

    return "Unsupported message type";
}

// Main function to start the bot
async function startSHYZUKI() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");

    const SHYZUKI = makeWASocket({
        logger: pino({ level: "fatal" }),
        auth: state,
        browser: ["SHYZUKI ", "Safari", "3.0"],
    });

    // Handle connection updates and QR code
    SHYZUKI.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            // Print QR code to terminal using 'qrcode-terminal' package
            qrcode.generate(qr, { small: true });
        }
        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error instanceof Boom &&
                lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(`Connection closed. Should reconnect: ${shouldReconnect}`);
            if (shouldReconnect) {
                startSHYZUKI();
            } else {
                console.log("Logged out. Restart the script to reconnect.");
            }
        } else if (connection === "open") {
            console.log("Connected to WhatsApp!");
        }
    });

    // Save authentication state
    SHYZUKI.ev.on("creds.update", saveCreds);

    // Listen for incoming messages and log their metadata
    SHYZUKI.ev.on("messages.upsert", async (chatUpdate) => {
        try {
            const messages = chatUpdate.messages;

            messages.forEach((message) => {
                // Extract metadata
                const msgId = message.key.id; // Message ID
                const from = message.key.remoteJid; // Sender or group ID
                const to = message.key.participant || "N/A"; // Message participant (for groups)
                const isFromMe = message.key.fromMe; // Is this sent by the bot?
                const content = extractMessageContent(message); // Extract content
                const timestamp = message.messageTimestamp || "Unknown"; // Timestamp

                // Log the message details
                console.log("======================================");
                console.log(`Message ID: ${msgId}`);
                console.log(`From: ${from}`);
                console.log(`To: ${to}`);
                console.log(`Is from me: ${isFromMe}`);
                console.log(`Content: ${content}`);
                console.log(`Timestamp: ${new Date(timestamp * 1000).toLocaleString()}`);
                console.log("======================================");
            });
        } catch (err) {
            console.error("Error handling message:", err);
        }
    });

    // Command handling (Example: u2g command)
    // Global bot status variable
let botStatus = true; // true = bot is ON, false = bot is OFF

SHYZUKI.ev.on("messages.upsert", async (chatUpdate) => {
    try {
        const mek = chatUpdate.messages[0];
        if (!mek.message) return;

        mek.message =
            Object.keys(mek.message)[0] === "ephemeralMessage"
                ? mek.message.ephemeralMessage.message
                : mek.message;

        if (mek.key && mek.key.remoteJid === "status@broadcast") return;

        const m = smsg(SHYZUKI, mek);
        const body =
            m.mtype === "conversation"
                ? m.message.conversation                : m.message[m.mtype]?.caption || m.message[m.mtype]?.text || "";
        const command = body.trim().split(" ")[0].toLowerCase();
        const args = body.trim().split(" ").slice(1);
        const text = args.join(" ");
        const participants = m.isGroup
            ? await SHYZUKI.groupMetadata(m.chat).then((metadata) => metadata.participants)
            : [];
        const mentions = m.isGroup ? participants.map((a) => a.id) : [];

        console.log(`Received command: ${command}`); // Debugging

        // Bot status handling
        if (!botStatus && command !== "on") {
            console.log("Bot is turned off. Ignoring command...");
            return;
        }

        // Command handling
        switch (command) {
            case "on":
                if (botStatus) {
                    await SHYZUKI.sendMessage(m.chat, { text: "Bot is already ON!" });
                } else {
                    botStatus = true;
                    await SHYZUKI.sendMessage(m.chat, { text: "Bot is now ON!" });
                }
                break;

            case "help":
                const commandList = [
                    "*🤖 Available Commands:*\n",
                    "*on* - Turn the bot ON",
                    "*off* - Turn the bot OFF",
                    "*alive* - Check if bot is running",
                    "*u2g* - Upload files to groups from URL",
                    "  Usage: u2g [URL]\n  Supports: Images, Videos, Audio, PDF, RAR files",
                    "*help* - Show this help message"
                ].join("\n");

                await SHYZUKI.sendMessage(m.chat, {
                    text: commandList,
                    mentions: mentions
                });
                break;

            case "off":
                if (!botStatus) {
                    await SHYZUKI.sendMessage(m.chat, { text: "Bot is already OFF!" });
                } else {
                    botStatus = false;
                    await SHYZUKI.sendMessage(m.chat, { text: "Bot is now OFF!" });
                }
                break;

            case "alive":
                await SHYZUKI.sendMessage(m.chat, {
                    text: "*Yeahh. I'm Alive 😇*",
                    mentions: mentions,
                });
                break;

                case "u2g":
                    if (!text) {
                        return SHYZUKI.sendMessage(
                            m.chat,
                            { text: "Please provide a valid URL link." },
                            { quoted: m }
                        );
                    }
                
                    const urls = text.trim().split("\n");
                    if (!process.env.GROUP_IDS) {
                        await SHYZUKI.sendMessage(m.chat, { text: "GROUP_IDS environment variable is not set." });
                        return;
                    }
                    const groupIds = process.env.GROUP_IDS.split(","); // Read from environment variable
                
                    try {
                        // Loop through each URL provided in the text
                        for (const url of urls) {
                            const decodedUrl = decodeURIComponent(url.trim());
                            const fileName = decodedUrl.split("/").pop();
                
                            // Detect MIME type dynamically
                            const mimeType = mime.lookup(fileName);
                            for (const groupId of groupIds) {
                                if (["image/jpeg","image/png","image/gif"].includes(mimeType)) {
                                    await SHYZUKI.sendMessage(groupId, {
                                        image: { url: decodedUrl },
                                        caption: `Uploaded File: ${fileName}`,
                                    });
                                } else if (["video/mp4","video/x-matroska"].includes(mimeType)) {
                                    await SHYZUKI.sendMessage(groupId, {
                                        video: { url: decodedUrl },
                                        caption: `Uploaded File: ${fileName}`,
                                    });
                                } else if (["audio/mpeg","audio/ogg"].includes(mimeType)) {
                                    await SHYZUKI.sendMessage(groupId, {
                                        audio: { url: decodedUrl },
                                        mimetype: mimeType,
                                    });
                                } else if (["application/pdf","application/zip","application/x-rar-compressed","application/vnd.rar"].includes(mimeType)) {
                                    await SHYZUKI.sendMessage(groupId, {
                                        document: { url: decodedUrl },
                                        fileName: fileName,
                                        mimetype: mimeType,
                                    });
                                } else {
                                    await SHYZUKI.sendMessage(groupId, {
                                        text: `Unsupported file type: ${mimeType || "Unknown"}`,
                                    });
                                }
                            }
                
                            // Confirm upload success for each file
                            await SHYZUKI.sendMessage(m.chat, {
                                text: `File successfully uploaded : ${fileName}`,
                            });
                        }
                    } catch (err) {
                        console.error("Error uploading file:", err);
                        await SHYZUKI.sendMessage(m.chat, {
                            text: "Failed to upload the file. Please check the URL and try again.",
                        });
                    }
                    break;                                               
                
        }
    } catch (err) {
        console.error("Error handling message:", err);
    }
});
    
}

// Start the bot
startSHYZUKI().catch((err) => {
    console.error("Failed to start:", err);
});
