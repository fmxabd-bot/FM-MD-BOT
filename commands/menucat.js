'use strict';

const categories = {
    '👑 OWNER': ['public', 'private', 'mode', 'setname', 'block', 'unblock', 'restart', 'addsudo', 'delsudo', 'broadcast'],
    '👥 GROUP': ['kick', 'add', 'promote', 'demote', 'mute', 'unmute', 'tagall', 'hidetag', 'groupinfo', 'welcome', 'antilink'],
    '🤖 AI': ['ai', 'chatgpt', 'gemini', 'llama', 'imagine', 'simi'],
    '⬇️ DOWNLOAD': ['song', 'video', 'insta', 'tiktok', 'facebook', 'youtube', 'spotify', 'apk'],
    '🛠️ TOOLS': ['ping', 'dp', 'vv', 'translate', 'base64', 'qr', 'weather', 'github', 'sticker', 'toimg'],
    '🎉 FUN': ['joke', 'meme', 'dare', 'truth', 'roast', 'ship', 'quote', 'fact', '8ball']
};

async function menucatCommand(sock, from, msg, isAdmin, session, args) {
    const prefix = session?.prefix || ".";
    
    // Button se category ka naam aayega
    let categoryName = args.join(' '); 
    
    // Agar exact match nahi mil raha toh dhoondein
    const actualCat = Object.keys(categories).find(c => c.toLowerCase().includes(categoryName.toLowerCase()));

    if (!actualCat) {
        return await sock.sendMessage(from, { text: "❌ Category not found." }, { quoted: msg });
    }

    const cmds = categories[actualCat];
    
    let text = `╭───「 *${actualCat}* 」───╮\n\n`;
    cmds.forEach(cmd => {
        text += `➤ ${prefix}${cmd}\n`;
    });
    text += `\n╰──────────────────╯`;

    await sock.sendMessage(from, { text: text }, { quoted: msg });
}

module.exports = menucatCommand;
