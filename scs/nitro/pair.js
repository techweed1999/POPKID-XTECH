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
      const responseBody = await response.text(); // Get the full response body

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        console.error("Error response body:", responseBody);
        await sock.sendMessage(m.from, { text: `❌ Failed to retrieve pairing information. Server responded with status ${response.status}.\n\nResponse Body:\n${responseBody}\n\nPlease check the server or try again later.` }, { quoted: m });
        return;
      }

      // Log the response body to understand what the server is sending
      console.log("Server Response Body:", responseBody);

      // At this point, if 'responseBody' contains HTML, it strongly suggests the API
      // is not providing the raw codes directly.

      if (responseBody.includes("<!DOCTYPE html>") || responseBody.includes("<html")) {
        await sock.sendMessage(m.from, { text: "⚠️ The server returned an HTML page instead of the pairing codes. This indicates the service might not be providing the codes directly through this API endpoint." }, { quoted: m });
      } else {
        // If it's not HTML, we'll assume it's the raw codes (though this might still be incorrect)
        const chatId = m.sender; // The sender's ID is their chat ID for DMs
        await sock.sendMessage(chatId, { text: `🔑 Here are the pairing codes:\n\n${responseBody}` });
        await sock.sendMessage(m.from, { text: '✅ Pairing codes sent to your private chat. Check your DMs!' }, { quoted: m }); // Inform the user they've been DM'd
      }

    } catch (error) {
      console.error("Error fetching pairing codes:", error);
      await sock.sendMessage(m.from, { text: '❗ An error occurred while fetching the pairing codes. Please try again later.' }, { quoted: m });
    }
  }
};

export default pair;
