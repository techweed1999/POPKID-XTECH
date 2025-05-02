import config from '../../config.cjs';
import fetch from 'node-fetch'; // Import the node-fetch library

const pair = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "pair") {
    const phoneNumber = text.replace(/\D/g, ''); // Extract digits only

    if (!phoneNumber) {
      await sock.sendMessage(m.from, { text: '⚠️ Please provide a phone number after the `.pair` command.' }, { quoted: m });
      return;
    }

    await m.React('⏳'); // Indicate processing with an hourglass

    try {
      const pairingUrl = `https://xtechpairing-5d5744c3f3d8.herokuapp.com/?number=${phoneNumber}`; // Construct the URL with the phone number
      const response = await fetch(pairingUrl);

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        await sock.sendMessage(m.from, { text: '❌ Failed to generate pairing codes. Please try again later.' }, { quoted: m });
        return;
      }

      const pairingCodes = await response.text(); // Assuming the response is plain text containing the codes

      // Send the pairing codes as a direct message
      const chatId = m.sender; // The sender's ID is their chat ID for DMs
      await sock.sendMessage(chatId, { text: `🔑 Here are your pairing codes:\n\n${pairingCodes}` });

      await sock.sendMessage(m.from, { text: '✅ Pairing codes sent to your private chat. Check your DMs!' }, { quoted: m }); // Inform the user they've been DM'd

    } catch (error) {
      console.error("Error fetching pairing codes:", error);
      await sock.sendMessage(m.from, { text: '❗ An error occurred while fetching the pairing codes. Please try again later.' }, { quoted: m });
    }
  }
};

export default pair;
