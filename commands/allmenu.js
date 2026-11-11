'use strict';

// ─── AAPKI DETAILS ────────────────────────────────────────────────────────
const BOT_NAME = "⚡ 𝐅𝐌 𝐌𝐃 𝐁𝐎𝐓 ⚡";
const OWNER_NAME = "⚡ 𝐎𝐖𝐍 𝐅𝐌 𝐀𝐁𝐃𝐔𝐋𝐋𝐀𝐇 ⚡";
const BOT_IMAGE = "https://i.ibb.co/Nd4mgdtd/hh.png"; // Aapki pic
const NEWSLETTER_JID = "120363412723420805@newsletter"; // Aapki ID
const NEWSLETTER_NAME = "⚡ 𝐅𝐌 𝐌𝐃 𝐁𝐎𝐓 ⚡";

// ─── CATEGORIES & COMMANDS ────────────────────────────────────────────────
const categories = {
    'ＡＩ': ['ai', 'bot', 'gpt', 'gpt2', 'gpt3', 'gpt35turbo', 'gpt4', 'gpt4turbo', 'gpt4o', 'gpt4omini', 'gpt4vision', 'gpt4all', 'gpt5', 'gpt5mini', 'chatgpt', 'chatgpt35'],
    'ＯＷＮＥＲ': ['public', 'private', 'mode', 'setname', 'block', 'unblock', 'restart', 'addsudo', 'delsudo', 'setprefix', 'broadcast'],
    'ＧＲＯＵＰ': ['kick', 'add', 'promote', 'demote', 'mute', 'unmute', 'tagall', 'hidetag', 'groupinfo', 'welcome', 'antilink', 'antidelete'],
    'ＤＯＷＮＬＯＡＤ': ['song', 'video', 'insta', 'tiktok', 'facebook', 'youtube', 'spotify', 'apk', 'ytmp3', 'ytmp4'],
    'ＴＯＯＬＳ': ['ping', 'dp', 'vv', 'translate', 'base64', 'qr', 'weather', 'github', 'sticker', 'toimg', 'calc', 'runtime'],
    'ＦＵＮ': ['joke', 'meme', 'dare', 'truth', 'roast', 'ship', 'quote', 'fact', '8ball', 'riddle']
};

async function menuCommand(sock, from, msg, isAdmin, session, args) {
    const prefix = session?.prefix || ".";
    const totalCmds = "175"; // Apne hisaab se change kar lein
    const version = "7.0.0 BETA";
    const mode = "public";

    // Runtime calculation
    const up = process.uptime();
    const h = Math.floor(up / 3600);
    const m = Math.floor((up % 3600) / 60);
    const s = Math.floor(up % 60);
    const runtime = `${h}h ${m}m ${s}s`;

    // ── BUILDING MENU TEXT (Exact Screenshot Style) ──
    let menuText = ``;
    
    // Header Box
    menuText += `┌───────────────〔 ${BOT_NAME} 〕\n`;
    menuText += `├✦ Owner: ${OWNER_NAME}\n`;
    menuText += `├✦ Commands: ${totalCmds}\n`;
    menuText += `├✦ Runtime: ${runtime}\n`;
    menuText += `├✦ Prefix: ${prefix}\n`;
    menuText += `├✦ Mode: ${mode}\n`;
    menuText += `├✦ Version: ${version}\n`;
    menuText += `└────────────────────────○\n\n`;

    // Categories List
    for (const [catName, cmds] of Object.entries(categories)) {
        menuText += `「 ${catName} 」\n`;
        menuText += `┌────────────────────────\n`;
        
        // Har command alag line par
        cmds.forEach((cmd) => {
            menuText += `┇ ⬡ ${prefix}${cmd}\n`;
        });
        
        menuText += `└────────────────────────○\n\n`;
    }

    // Footer
    menuText += `⚡ 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐅𝐌 𝐌𝐃 𝐁𝐎𝐓 ⚡\n`;
    menuText += `⚡ 𝐎𝐖𝐍 𝐅𝐌 𝐀𝐁𝐃𝐔𝐋𝐋𝐀𝐇 ⚡`;

    // ── SEND MESSAGE WITH PHOTO AND FORWARD TAG ──
    try {
        await sock.sendMessage(from, {
            image: { url: BOT_IMAGE },
            caption: menuText,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: NEWSLETTER_JID,
                    newsletterName: NEWSLETTER_NAME,
                    serverMessageId: 1
                }
            }
        }, { quoted: msg });
    } catch (e) {
        // Fallback without photo
        await sock.sendMessage(from, { text: menuText }, { quoted: msg });
    }
}

module.exports = menuCommand;
