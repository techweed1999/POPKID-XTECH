import pkg from '@whiskeysockets/baileys';
import config from '../../config.cjs';
const { generateWAMessageFromContent } = pkg;

const validCommands = ['alive', 'runtime', 'uptime']; // Valid commands list

const alive = async (m, Matrix) => {

  const prefix = config.PREFIX;

const text = m.body || m.message?.conversation || '';

  const command = text.startsWith(prefix) ? text.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (!validCommands.includes(command)) {

    console.log(`Invalid command: ${command}`);

    return;

  }

  // Calculate uptime

  const uptimeSeconds = process.uptime();

  const days = Math.floor(uptimeSeconds / (24 * 3600));

  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);

  const minutes = Math.floor((uptimeSeconds % 3600) / 60);

  const seconds = Math.floor(uptimeSeconds % 60);

  const uptimeMessage = `╭──────────◆
│👻𝗨𝗣𝗧𝗜𝗠𝗘👻
│───────────◆
│ *𝗨𝗽𝘁𝗶𝗺𝗲:*
│  *📆𝗗𝗮𝘆𝘀:* ${days}
│  *🕰𝗛𝗼𝘂𝗿𝘀:* ${hours}
│  *😇𝗠𝗶𝗻𝘂𝘁𝗲𝘀:* ${minutes}
│  *👻𝗦𝗲𝗰𝗼𝗻𝗱𝘀:* ${seconds}
│───────────◆
│😇𝗣𝗼𝗽𝗸𝗶𝗱😇
╰──────────◆`;
   
  const msg = generateWAMessageFromContent(
    m.from,

    { conversation: uptimeMessage },

    {}

  );

  await Matrix.relayMessage(m.from, msg.message, { messageId: msg.key.id });

};

export default alive;
