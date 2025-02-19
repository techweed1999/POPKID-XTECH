//const _0x144dfe=_0x4389;(function(_0x480946,_0xcac763){const _0x421a4a=_0x4389,_0x1e5860=_0x480946();while(!![]){try{const _0x20e856=parseInt(_0x421a4a(0x1d6))/0x1+-parseInt(_0x421a4a(0x1df))/0x2+-parseInt(_0x421a4a(0x1d7))/0x3+parseInt(_0x421a4a(0x1da))/0x4+parseInt(_0x421a4a(0x1e9))/0x5+-parseInt(_0x421a4a(0x1de))/0x6+-parseInt(_0x421a4a(0x1d4))/0x7*(-parseInt(_0x421a4a(0x1d8))/0x8);if(_0x20e856===_0xcac763)break;else _0x1e5860['push'](_0x1e5860['shift']());}catch(_0x547db6){_0x1e5860['push'](_0x1e5860['shift']());}}}(_0x353b,0x41f22));function _0x4389(_0x2e1cce,_0x2c793a){const _0x353be7=_0x353b();return _0x4389=function(_0x43895d,_0x9f16d9){_0x43895d=_0x43895d-0x1cf;let _0x25656a=_0x353be7[_0x43895d];return _0x25656a;},_0x4389(_0x2e1cce,_0x2c793a);}function _0x353b(){const _0x177589=['forks_count','https://api.github.com/repos/Popkiddevs/POPKID-XTECH','POWERED\x20BY\x20POP\x20KID','350ZmWEhE','Error\x20fetching\x20repository\x20data:','238944jliMqk','836631FQrYeM','63440FCCCdf','html_url','1340080RKTTFf','toLocaleDateString','\x0a[🧧]\x20*FORKS:*\x20-\x20','An\x20error\x20occurred\x20while\x20fetching\x20the\x20repository\x20data.','2850558edahlZ','353014ckzhut','updated_at','\x0a[📅]\x20*RELEASE\x20DATE:*\x20-\x20','json','stars','login','https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P','../framework/zokou','repo','Could\x20not\x20fetch\x20data','1150635taEXBK','stargazers_count','\x0a[👨‍💻]\x20*OWNER:*\x20-\x20*Pop\x20Kid*\x20\x0a__________________________________\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20*Made\x20With*\x20🤍','https://files.catbox.moe/jdco7i.jpg','log'];_0x353b=function(){return _0x177589;};return _0x353b();}const {king}=require(_0x144dfe(0x1e6));king({'nomCom':_0x144dfe(0x1e7),'aliases':['sc','script'],'reaction':'💖','nomFichier':__filename},async(_0x25b7b6,_0x43813d,_0x270eb0)=>{const _0x28fbf8=_0x144dfe,_0x7de7c5=_0x28fbf8(0x1d2),_0x5b6b7d='https://files.catbox.moe/jdco7i.jpg',{repondre:_0xea69b4,auteurMessage:_0x45fd7b}=_0x270eb0;try{const _0x42fd81=await fetch(_0x7de7c5),_0x29108f=await _0x42fd81[_0x28fbf8(0x1e2)]();if(_0x29108f){const _0x54863e={'stars':_0x29108f[_0x28fbf8(0x1ea)],'forks':_0x29108f[_0x28fbf8(0x1d1)],'update':_0x29108f[_0x28fbf8(0x1e0)],'owner':_0x29108f['owner'][_0x28fbf8(0x1e4)]},_0x33a071=new Date(_0x29108f['created_at'])[_0x28fbf8(0x1db)]('en-GB'),_0x456d8d='*HEY\x20👋\x20THIS\x20IS\x20POPKID-MD.*\x0a\x0aI\x27m\x20A\x20WhatsApp\x20bot\x20created\x20by\x20*©Pop\x20Kid*.\x0a\x0a[✨]\x20*STARS:*\x20-\x20'+_0x54863e[_0x28fbf8(0x1e3)]+_0x28fbf8(0x1dc)+_0x54863e['forks']+_0x28fbf8(0x1e1)+_0x33a071+'\x0a[🗼]\x20*REPO:*\x20-\x20'+_0x29108f[_0x28fbf8(0x1d9)]+_0x28fbf8(0x1eb);await _0x43813d['sendMessage'](_0x25b7b6,{'text':_0x456d8d,'contextInfo':{'mentionedJid':[_0x45fd7b],'externalAdReply':{'title':'THE\x20POPKID\x20MULTI\x20DEVICE','body':_0x28fbf8(0x1d3),'thumbnailUrl':_0x28fbf8(0x1cf),'sourceUrl':_0x28fbf8(0x1e5),'mediaType':0x1,'renderLargerThumbnail':!![]}}});}else console[_0x28fbf8(0x1d0)](_0x28fbf8(0x1e8)),_0xea69b4(_0x28fbf8(0x1dd));}catch(_0x47dea8){console['error'](_0x28fbf8(0x1d5),_0x47dea8),_0xea69b4(_0x28fbf8(0x1dd));}});

const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "repo", categorie: "My Contact" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
❂━━━════──⊷──════━━━❂
   *INFORMATION ABOUT ME* 
▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒
❂━━━➳════⊷════➳━━━━❂

*GITHUB LINK*
>  https://github.com/Popkiddevs/POPKID-XTECH

*YouTube channel*
https://youtube.com/@Popkid_254

*FOR DEVELOPER T.ME*
> https://wa.me/+254111385747
*WHATSAPP CHANNEL*
> https://whatsapp.com/channel/0029VadQrNI8KMqo79BiHr3l
*BACKUP CHANNEL*
> https://whatsapp.com/channel/0029Vb11OEh4yltSrUQ3Gw2x
*FOR MORE INFO TAP ON THE LINK BELOW*
> https://github.com/Popkiddevs/POPKID-XTECH
╭──━━━━═════════━━━━⦿
┃ ❂━━━════➳════━━━━❂
┃▓▒⁠⁠⁠⁠ *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃▓▒ *DEV* : *POPKID BOT*
┃ ❂━━━════➳════━━━━❂
⁠⁠⁠⁠╰──━━━━═════════━━━━⦿ 
  `;
    
let menuMsg = `
     ╭──━━━━══⊷══━━━━⦿
     ┃ ❂━━━━━━━━━━━━❂
     ┃▓ 💊POPKID MD 💊
     ┃ ❂━━━━━━━━━━━━❂
     ╰──━━━━══⊷══━━━━⦿
❂━━━━═════⊷═════━━━━❂
▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒
❂━━━════──➳──════━━━❂`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "I am *popkid Md*, Developed By popkidSir" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "I am *popkid*, Developed By popkidSir" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
