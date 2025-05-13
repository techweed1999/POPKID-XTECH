const { cmd } = require('../command');

cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply 
}) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("Only the bot owner can use this command.");
        }

        const steps = [
            '```[ INITIATING CYBEROPS TERMINAL ]```',
            
            '*[ ACCESS LEVEL: ROOT ]*',
            '*[ PROTOCOL: MATRIX-ENGAGE v1.7 ]*',
            
            '🟢 *Spinning up quantum injection engine...*',
            '🧬 *Tunneling through encrypted nodes...*',
            
            '```[▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 10%``` ⌛ HANDSHAKE...',
            '```[▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 25%``` ⌛ EXPLOIT LOADED...',
            '```[▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 40%``` ⌛ INFILTRATING CORE...',
            '```[▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░] 55%``` ⌛ NETWORK BREACH...',
            '```[▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░] 70%``` ⌛ ESCALATING PERMISSIONS...',
            '```[▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░] 85%``` ⌛ EXTRACTING INTEL...',
            '```[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%``` ✅ SUCCESS',
            
            '*[ SYSTEM CORE BREACHED ]*',
            '*[ PAYLOAD DELIVERED TO /dev/sys_hive ]*',
            
            '💾 *Initiating stealth log purge...*',
            '🧹 *Wiping trace signatures from grid...*',
            '☠️ *Deploying fake node to cover breach...*',
            
            '```[ SIMULATION MODE: ACTIVE ]```',
            '⚠️ *This is a fictional penetration sequence. No real systems were harmed.*',
            '⚠️ *Support ethical hacking and cybersecurity education.*',
            
            '> *:: POPKID-MD // HACK-SIM-TERMINAL vX ::*'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between steps
        }
    } catch (e) {
        console.error(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});
