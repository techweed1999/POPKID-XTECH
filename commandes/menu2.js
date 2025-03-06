const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "menu2", categorie: "General" }, async (dest, zk, commandeOptions) => {
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
> *POPKID MD V2 AVAILABLE MENUS* 
╭─────────────────
│❍╭─────────────
│❍│▸ *MENU* 
│❍│▸ *MENU2* 
│❍│▸ *HACHERS HOOD*
│❍╰──────────────
│❍│▸ *PLUGINS* : ${cm.length} 
│❍│▸ *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│❍│▸ *SAVER* : ${os.platform()}
│❍│▸ *THEME* : *POPKID MD V2 THEMES*
│❍╰──────────────
╰──────────────────\n`;
    
let menuMsg = `

 *popkid🍀*${readmore}
`;

    for (const cat in coms) {
        menuMsg += ` ╭────────❒⁠⁠⁠⁠ *${cat}* ✣`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│❍│▸ ${cmd}`;
        }
        menuMsg += `
╰────────────···▸▸ \n`
    }

    menuMsg += `> popkid🍀
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *msela-chui-v2*, déveloper mselachui Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 

}
            }
        });
        // Send the audio (song)
        await zk.sendMessage(dest, {
            audio: { url: "https://files.catbox.moe/p6p605.m4a" }, // Replace with your song URL
            mimetype: "audio/mpeg",
            ptt: true, // Send as voice note
        }, { quoted: ms });

    } catch (error) {
        console.error("Error sending menu and song: ", error);
        repondre("Error sending menu and song: " + error);
    }
});
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *msela-chui-v2*, déveloper mselachui Tech" }, { quoted: ms });
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
