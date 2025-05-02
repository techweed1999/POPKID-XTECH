import config from '../../config.cjs';
import { fileURLToPath } from 'url';
import path from 'path';
import { promises as fs } from 'fs';
import { gtts } from 'gtts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tts = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const textToSpeak = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "tts" || cmd === "say") { // You can use "tts" or "say" as the command
    if (!textToSpeak) {
      await sock.sendMessage(m.from, { text: 'Please provide the text you want me to say.' }, { quoted: m });
      return;
    }

    try {
      await m.React('🗣️'); // Indicate processing

      const speech = new gtts(textToSpeak, 'en'); // 'en' for English, you can change the language code

      const audioFilePath = path.join(__dirname, 'audio.mp3');
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

      // Clean up the audio file after sending (optional)
      fs.unlink(audioFilePath).catch(err => console.error('Error deleting audio file:', err));

    } catch (error) {
      console.error('TTS Error:', error);
      await sock.sendMessage(m.from, { text: 'An error occurred while converting text to speech.' }, { quoted: m });
    }
  }
};

export default tts;
