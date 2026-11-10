const settings = require('../settings');

// SYED MINI interactive menu categories. Keep command names in sync with index.js.
const categories = {
    'OWNER': ['public', 'private', 'mode', 'owner', 'setname', 'block', 'unblock', 'bcgc', 'bcall', 'restart', 'shutdown', 'xrestart', 'xshutdown', 'nuke', 'clear', 'backup', 'restore', 'clone', 'addsudo', 'delsudo', 'listsudo', 'setprefix', 'broadcast', 'self', 'autostatus', 'autoseen', 'autolike', 'autobio'],
    'GROUP': ['kick', 'add', 'promote', 'demote', 'mute', 'unmute', 'tagall', 'hidetag', 'grouplink', 'groupinfo', 'join', 'leave', 'setdesc', 'setppgc', 'getbio', 'getdp', 'accept', 'poll', 'everyonemsg', 'listonline', 'tagme', 'mention', 'kickoffline', 'snipe', 'editmsg', 'react', 'send', 'forward', 'save', 'welcome', 'goodbye', 'setwelcome', 'setgoodbye', 'antilink', 'antidelete', 'antiviewonce', 'antifake', 'antispam', 'antibug', 'anticall', 'antistatus'],
    'AI': ['ai', 'chatbot', 'gali', 'chatgpt', 'gemini', 'llama', 'deepseek', 'flux', 'pixart', 'dalle', 'bingai', 'blackbox', 'imagine', 'midjourney', 'simi', 'brainly', 'math'],
    'DOWNLOAD': ['song', 'video', 'insta', 'tiktok', 'facebook', 'youtube', 'pinterest', 'twitter', 'reddit', 'spotify', 'mf', 'apk', 'gdrive', 'ytdl', 'ytmp3', 'ytmp4', 'gitclone', 'threads', 'snapchat', 'capcut', 'terabox'],
    'TOOLS': ['ping', 'dp', 'vv', 'translate', 'base64', 'qr', 'shorturl', 'calc', 'weather', 'github', 'ipinfo', 'tempmail', 'fakeinfo', 'binlookup', 'whois', 'dnslookup', 'portscan', 'screenshot', 'define', 'google', 'wiki', 'yts', 'playstore', 'npm', 'sticker', 'toimg', 'tomp3', 'tts', 'blur', 'invert', 'crop', 'flip', 'grayscale', 'removebg', 'enlarge', 'runtime', 'uptime', 'serverinfo', 'speedtest', 'device', 'pdf', 'ocr', 'remini', 'enhance', 'upscale', 'find', 'location', 'time', 'search'],
    'FUN': ['joke', 'meme', 'dare', 'truth', 'ascii', 'roast', 'compliment', 'ship', 'emojimix', 'character', 'quote', 'fact', 'trivia', 'coinflip', 'roll', 'riddle', 'wouldyourather', 'hack', 'report', 'spam', 'smsbomb', 'callbomb', 'crash', 'freeze', 'lag', 'bug', 'locspam', 'vcardspam', 'buttonspam', 'pollspam', 'contactspam', 'flirt', 'insult', 'pickup', 'tictactoe', '8ball', 'chess', 'hangman'],
    'ISLAMIC': ['quran', 'hadith', 'prayer', 'qibla', 'asmaulhusna', 'surah', 'ayat', 'tafsir', 'dua', 'azkar'],
    'ANIME': ['anime', 'manga', 'waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'slap', 'kill', 'happy', 'wink', 'poke', 'dance', 'cringe'],
    'LOGO': ['neon', 'glitch', 'gold', '3dtext', 'fire', 'water', 'galaxy', 'marvel', 'avengers', 'transformer', 'blackpink', 'gradient', 'luxury', 'royal', 'metal', 'steel', 'chrome', 'glossy'],
    'TEXT MAKER': ['syed', 'cup', 'coffee', 'cloud', 'smoke', 'flower', 'leaf', 'wood', 'stone', 'blood', 'horror', 'scary', 'spooky', 'christmas', 'birthday', 'love', 'heart']
};

const icons = {
    OWNER: '👑', GROUP: '👥', AI: '🤖', DOWNLOAD: '⬇️', TOOLS: '🛠️',
    FUN: '🎉', ISLAMIC: '🕌', ANIME: '🎌', LOGO: '🏢', 'TEXT MAKER': '✏️'
};

async function sendList(sock, from, msg, title, description, rows) {
    return sock.sendMessage(from, {
        title,
        text: description,
        footer: '☠️ POWERED BY SYED MINI ☠️',
        buttonText: '📂 OPEN MENU',
        sections: [{ title: 'SYED MINI MENU', rows }]
    }, { quoted: msg });
}

async function allMenu(sock, from, msg) {
    try {
        await sock.sendMessage(from, {
            image: { url: settings.startimage },
            caption: '💀 *SYED MINI BOT* 💀\n\nWelcome to the official bot menu!\n\n📂 Tap the menu button below to browse categories and commands.\n\n⚡ Categories: 10\n☠️ Powered By SYED MINI'
        }, { quoted: msg });
    } catch (error) {
        console.error('SYED MINI menu image error:', error.message);
    }

    const rows = Object.keys(categories).map(category => ({
        title: `${icons[category]} ${category}`,
        description: `${categories[category].length} commands available`,
        rowId: `smcat:${encodeURIComponent(category)}:0`
    }));

    await sendList(sock, from, msg, '💀 SYED MINI MENU', '📂 Select a category to view its commands:', rows);
}

function unwrapMessage(message) {
    let current = message || {};
    for (let i = 0; i < 5; i++) {
        const wrapper = current.ephemeralMessage || current.viewOnceMessage || current.viewOnceMessageV2 || current.viewOnceMessageV2Extension || current.documentWithCaptionMessage;
        if (!wrapper || !wrapper.message) break;
        current = wrapper.message;
    }
    return current;
}

function getRowId(msg) {
    const content = unwrapMessage(msg.message);
    return content.listResponseMessage?.singleSelectReply?.selectedRowId ||
        content.listResponseMessage?.singleSelectReply?.selectedRowId || null;
}

async function handleMenuSelection(sock, from, msg) {
    const rowId = getRowId(msg);
    if (!rowId) return false;

    if (rowId.startsWith('smcat:')) {
        const parts = rowId.split(':');
        const category = decodeURIComponent(parts[1] || '');
        const page = Math.max(0, Number(parts[2]) || 0);
        const cmds = categories[category];
        if (!cmds) return true;

        // WhatsApp list messages have a limited number of rows. Reserve rows for paging.
        const pageSize = 8;
        const start = page * pageSize;
        const current = cmds.slice(start, start + pageSize);
        const rows = current.map(cmd => ({
            title: `.${cmd}`,
            description: `Choose to display .${cmd}`,
            rowId: `smcmd:${encodeURIComponent(category)}:${cmd}`
        }));

        if (start + pageSize < cmds.length) {
            rows.push({ title: '➡️ NEXT PAGE', description: 'View more commands', rowId: `smcat:${encodeURIComponent(category)}:${page + 1}` });
        }
        if (page > 0) {
            rows.push({ title: '⬅️ PREVIOUS PAGE', description: 'Go back to previous commands', rowId: `smcat:${encodeURIComponent(category)}:${page - 1}` });
        }

        await sendList(sock, from, msg, `${icons[category]} ${category}`, `📂 ${category} COMMANDS\nPage ${page + 1}`, rows);
        return true;
    }

    if (rowId.startsWith('smcmd:')) {
        const parts = rowId.split(':');
        const category = decodeURIComponent(parts[1] || '');
        const cmd = parts[2];
        if (!categories[category]?.includes(cmd)) return true;

        await sock.sendMessage(from, {
            text: `✅ *SELECTED COMMAND*\n\n.${cmd}\n\nSend this command in the chat to run it.`
        }, { quoted: msg });
        return true;
    }

    return false;
}

module.exports = allMenu;
module.exports.handleMenuSelection = handleMenuSelection;
