import config from '../../config.cjs';
import { fileURLToPath } from 'url';
import path from 'path';
import { promises as fs } from 'fs';
import { gtts } from 'gtts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const textToMp3 = async (m, sock) => {
  const prefix = config.PREFIX;

  if (m.body.startsWith(prefix + 'tomp3') && m.quotedMessage) {
    const textToSpeak = m.quotedMessage.conversation || m.quotedMessage.extendedTextMessage?.text;

    if (!textToSpeak) {
      await sock.sendMessage(m.from, { text: 'Could not find text in the quoted message.' }, { quoted: m });
      return;
    }

    try {
      await m.React('🎧'); // Changed reaction emoji to a headphone

      const speech = new gtts(textToSpeak, 'en');
      const audioFilePath = path.join(__dirname, 'text_to_mp3.mp3'); // Changed filename

      await new Promise((resolve, reject) => {
        speech.save(audioFilePath, (err, result) => {
          if (err) {
            console.error('Error saving audio:', err);
            reject(err);
          } else {
            console.log('Audio saved:', result);
            resolve();
          }
        });
      });

      await sock.sendMessage(
        m.from,
        {
          audio: { url: audioFilePath },
          mimetype: 'audio/mpeg',
        },
        { quoted: m }
      );

      fs.unlink(audioFilePath).catch(err => console.error('Error deleting audio file:', err));

    } catch (error) {
      console.error('TTS Error:', error);
      await sock.sendMessage(m.from, { text: 'An error occurred while converting text to MP3.' }, { quoted: m }); // Updated error message
    }
  }
};

export default textToMp3; // Changed export name to reflect the command
