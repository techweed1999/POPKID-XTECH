import config from '../../config.cjs';
import fetch from 'node-fetch';
import cheerio from 'cheerio'; // Example library for HTML parsing

const pair = async (m, sock) => {
  // ... (rest of your code) ...

  if (cmd === "pair") {
    // ... (phone number extraction and validation) ...

    await m.React('⏳');

    try {
      const pairingUrl = `https://xtechpairing-5d5744c3f3d8.herokuapp.com/?number=${phoneNumber}`;
      const response = await fetch(pairingUrl);
      const html = await response.text();

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        console.error("Error response body:", html);
        await sock.sendMessage(m.from, { text: `❌ Failed to retrieve pairing information. Server responded with status ${response.status}. Please check the server or try again later.` }, { quoted: m });
        return;
      }

      const $ = cheerio.load(html);
      // You would need to inspect the HTML source of the page
      // to identify the specific CSS selectors or elements that contain the codes.
      const codeElement = $('#pairing-code'); // Example selector, you'll need to find the actual one
      const pairingCodes = codeElement.text().trim();

      if (pairingCodes) {
        const chatId = m.sender;
        await sock.sendMessage(chatId, { text: `🔑 Here are the pairing codes:\n\n${pairingCodes}` });
        await sock.sendMessage(m.from, { text: '✅ Pairing codes sent to your private chat. Check your DMs!' }, { quoted: m });
      } else {
        console.warn("Could not find pairing codes in the HTML.");
        await sock.sendMessage(m.from, { text: "⚠️ Could not extract pairing codes from the webpage. The structure might have changed." }, { quoted: m });
      }

    } catch (error) {
      console.error("Error fetching or parsing:", error);
      await sock.sendMessage(m.from, { text: '❗ An error occurred while fetching or parsing the information. Please try again later.' }, { quoted: m });
    }
  }
};

export default pair;
