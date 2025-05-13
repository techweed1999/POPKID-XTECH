const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["av", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Get system info
        const platform = "Heroku Platform"; // Fixed deployment platform
        const release = os.release(); // OS version
        const cpuModel = os.cpus()[0].model; // CPU info
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2); // Total RAM in MB
        const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // Used RAM in MB

        // Stylish and modernized system status message
        const status = `╭─────🧊🚀*𝐏𝐎𝐏𝐊𝐈𝐃 𝐗𝐓𝐄𝐂𝐇*🚀🧊─────┈⊷
┃ *✨ Uptime* : *${runtime(process.uptime())}*
┃ *💾 RAM Usage* : *${usedMem}MB / ${totalMem}MB*
┃ *🖥️ Deployed on* : *${platform}*
┃ *👨‍💻 Owner* : *𝐩𝐨𝐩𝐤𝐢𝐝*
┃ *🔧 Version* : *𝟣.𝟢.𝟘 𝖡𝖤𝖳𝖠*
╰──────────────────────────┈⊷
> Powered by *𝐏𝐎𝐏𝐊𝐈𝐃 𝑿𝑻𝑬𝑪𝑯*`;

        // Send image + caption + audio combined
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/lkmvah.jpg` },  
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363290715861418@newsletter',
                    newsletterName: '𝐏𝐎𝐏𝐊𝐈𝐃 𝐀𝐋𝐈𝐕𝐄🩷',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Attach audio within the same "quoted" message for grouping
        await conn.sendMessage(from, { 
            audio: { url: 'https://files.catbox.moe/5df4ei.m4v' },
            mimetype: 'audio/mp4',
            ptt: true 
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});
