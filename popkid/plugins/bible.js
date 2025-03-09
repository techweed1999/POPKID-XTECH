/*
Project Name : POPKID XMD
Creator      : POP KID ( Mr IAN TARACHA )
Repo         : https//github.com/Popkiddevs/POPKID-XTECH
Support      : wa.me/254111385747
*/


const axios = require("axios");
const { cmd } = require("../command");

// Command: bible
cmd({
    pattern: "bible",
    desc: "Fetch Bible verses by reference.",
    category: "fun",
    react: "馃摉",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        // V茅rifiez si une r茅f茅rence est fournie
        if (args.length === 0) {
            return reply(`鈿狅笍 *Please provide a Bible reference.*\n\n馃摑 *Example:*\n.bible John 1:1`);
        }

        // Joindre les arguments pour former la r茅f茅rence
        const reference = args.join(" ");

        // Appeler l'API avec la r茅f茅rence
        const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}`;
        const response = await axios.get(apiUrl);

        // V茅rifiez si la r茅ponse contient des donn茅es
        if (response.status === 200 && response.data.text) {
            const { reference: ref, text, translation_name } = response.data;

            // Envoyez la r茅ponse format茅e avec des emojis
            reply(
                `馃摐 *饾樈饾檮饾樈饾檱饾檧 饾檻饾檧饾檷饾檸饾檧 饾檨饾檴饾檺饾檳饾樋!*\n\n` +
                `馃摉 *饾懝饾拞饾拠饾拞饾挀饾拞饾拸饾拕饾拞:* ${ref}\n` +
                `馃摎 *饾懟饾拞饾挋饾挄:* ${text}\n\n` +
                `馃梻锔? *饾懟饾挀饾拏饾拸饾挃饾拲饾拏饾挄饾拪饾拹饾拸:* ${translation_name}\n\n> 漏 饾悓饾悁饾悑饾悤饾悎饾悕 饾悧饾悆 饾悂饾悎饾悂饾悑饾悇`
            );
        } else {
            reply("鉂? *Verse not found.* Please check the reference and try again.");
        }
    } catch (error) {
        console.error(error);
        reply("鈿狅笍 *An error occurred while fetching the Bible verse.* Please try again.");
    }
});
