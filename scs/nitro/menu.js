import config from '../../config.cjs';

const menu = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "menu") {
    const start = new Date().getTime();
    await m.React('🪆');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    let profilePictureUrl = 'https://files.catbox.moe/kiy0hl.jpg'; // Default image URL
    try {
      const pp = await sock.profilePictureUrl(m.sender, 'image');
      if (pp) {
        profilePictureUrl = pp;
      }
    } catch (error) {
      console.error("Failed to fetch profile picture:", error);
      // Use the default image if fetching fails
    }

    const menuText = `
╭──❍「 USER INFO 」❍
├• 🦸 *Owner:* 𝗗𝗲𝘃 𝗣𝗼𝗽𝗸𝗶𝗱
├• 🏆 *Rank:* Tadpole
├• 🎮 *XP:* 27 
├• 🎩 *User:* 𝗣𝗼𝗽𝗸𝗶𝗱
╰─┬─★─☆──♪♪─❍
╭─┴❍「 BOT STATUS 」❍
├• 📆 *Date:* May 12, 2025
├• ⏲️ *Time:* 21:35:48
├• 🤖 *Bot:* 𝗣𝗼𝗽𝗸𝗶𝗱 𝗫𝗺𝗱
├• #️⃣ *Prefix:* ${prefix}
├• ⏱️ *Uptime:* 06:24:54
├• 📊 *Database:* 0 of 120 
╰─┬─★─☆──♪♪─❍

╭─┴❍「 𝗦𝗬𝗦𝗧𝗘𝗠 𝗠𝗘𝗡𝗨 」❍
├• ⚡ ${prefix}menu
├• 🟢 ${prefix}alive
├• 🛠️ ${prefix}owner
├• 🍔 ${prefix}menu
╰─┬─★─☆──♪♪─❍

╭─┴❍「 𝗢𝗪𝗡𝗘𝗥 𝗣𝗔𝗚𝗘 」❍
├• 🎮 ${prefix}join
├• 🚪 ${prefix}leave
├• 🩷 ${prefix}autobio
├• 🔒 ${prefix}block
├• 🧋 ${prefix}autolikestatus
├• 🔓 ${prefix}unblock
├• 🤖 ${prefix}setppbot
├• 🚫 ${prefix}anticall
├• 🛑 ${prefix}setstatus
├• 📝 ${prefix}setnamebot
╰─┬─★─☆──♪♪─❍

╭─┴❍「 𝗚𝗣𝗧 𝗠𝗘𝗡𝗨 」❍
├• 💬 ${prefix}ai
├• 🐞 ${prefix}bug
├• 📝 ${prefix}report
├• 🚪 ${prefix}chatbot
├• 🧠 ${prefix}gpt
├• 🎨 ${prefix}dalle
╰─┬─★─☆──♪♪─❍

╭─┴❍「 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥 𝗣𝗔𝗚𝗘 」❍
├• 🎶 ${prefix}attp
├• 🎬 ${prefix}gimage
├• 🎧 ${prefix}play
├• 📹 ${prefix}video
╰─┬─★─☆──♪♪─❍

╭─┴❍「 𝗦𝗘𝗔𝗥𝗖𝗛 𝗠𝗘𝗡𝗨 」❍
├• 🔎 ${prefix}google
├• 📽️ ${prefix}mediafire
├• 🚪 ${prefix}facebook
├• ❤️ ${prefix}instagram
├• 🚪 ${prefix}tiktok
├• 🎶 ${prefix}lyrics
├• 🎬 ${prefix}imdb
╰─┬─★─☆──♪♪─❍

╭─┴❍「 𝗙𝗨𝗡 𝗠𝗘𝗡𝗨 」❍
├• 🔎 ${prefix}getpp
├• 📽️ ${prefix}url
╰─┬─★─☆──♪♪─❍

🔧 *Wᴇʟᴄᴏᴍᴇ ᴛᴏ ᴛʜᴇ ᴍᴇɴᴜ!*
*ᴡᴀɪᴛ ғᴏʀ ᴍᴏʀᴇ ᴄᴏᴍᴍᴀɴᴅs...*

📢 *ᴅᴇᴠ ᴘᴏᴘᴋɪᴅ*
`;
    await sock.sendMessage(m.from, {
      image: { url: profilePictureUrl },
      caption: menuText.trim(),
      contextInfo: {
        forwardingScore: 5,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: "Popkid-Xmd",
          newsletterJid: "120363290715861418@newsletter",
        },
      }
    }, { quoted: m });
  }
};

export default menu;
