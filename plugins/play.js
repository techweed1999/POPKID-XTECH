import config from '../config.cjs';
import ytsearch from 'yt-search';
import fetch from 'node-fetch'; // Ensure you have node-fetch installed: npm install node-fetch

const musicdownload = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const q = m.body.slice(prefix.length + cmd.length + 1); // Extract the query

  if (cmd === "musicdownload" || cmd === "play") {
    if (!q) {
      await m.reply("Please provide a song name or YouTube link to download.");
      return;
    }

    const start = new Date().getTime();

    const searchingEmojis = ['🔎', '🎼', '🎵', '🎶', '📡'];
    const downloadEmojis = ['⬇️', '📥', '💾', '⏳', '✅'];

    const searchingEmoji = searchingEmojis[Math.floor(Math.random() * searchingEmojis.length)];
    await m.react(searchingEmoji);

    try {
      const yt = await ytsearch(q);
      if (!yt.results.length) {
        await m.reply("No results found for your query.");
        return;
      }

      const song = yt.results[0];
      const apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(song.url)}`;

      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!data?.result?.downloadUrl) {
        await m.reply("Failed to get download link. Please try again later.");
        return;
      }

      const end = new Date().getTime();
      const responseTime = (end - start);
      const downloadEmoji = downloadEmojis[Math.floor(Math.random() * downloadEmojis.length)];

      const contextInfo = {
        externalAdReply: {
          title: song.title.length > 25 ? `${song.title.substring(0, 22)}...` : song.title,
          body: "Powered by Popkid-MD",
          mediaType: 2, // Changed to audio
          thumbnailUrl: song.thumbnail.replace('default.jpg', 'hqdefault.jpg'),
          sourceUrl: 'https://whatsapp.com/channel/0029VadQrNI8KMqo79BiHr3l',
          mediaUrl: data.result.downloadUrl, // Direct link to the audio
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      };

      await Matrix.sendMessage(
        m.from,
        {
          audio: { url: data.result.downloadUrl },
          mimetype: "audio/mpeg",
          fileName: `${song.title}.mp3`,
          contextInfo: contextInfo,
        },
        { quoted: m }
      );

      const speedText = `*POPKID-MD Download Speed: ${responseTime}ms ${downloadEmoji}*`;
      await Matrix.sendMessage(m.from, { text: speedText }, { quoted: m }); // Send speed feedback separately

    } catch (error) {
      console.error(error);
      await m.reply("An error occurred while downloading the music. Please try again.");
    }
  }
};

export default musicdownload;
