import config from '../../config.cjs';

const Callupdate = async (json, sock) => {
   for (const id of json) {
      if (id.status === 'offer' && config.REJECT_CALL ) {
         let msg = await sock.sendMessage(id.from, {
            text: `*📱𝐀𝐔𝐓𝐎𝐑𝐄𝐉𝐄𝐂𝐓 𝐂𝐀𝐋𝐋 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃* \n*_❌𝐍𝐎 𝐂𝐀𝐋𝐋𝐒 𝐀𝐋𝐋𝐎𝐖𝐄𝐃 𝐁𝐘 𝐏𝐎𝐏𝐊𝐈𝐃 𝐗𝐌𝐃_*`,
            mentions: [id.from],
         });
         await sock.rejectCall(id.id, id.from);
      }
   }
};

export default Callupdate;
