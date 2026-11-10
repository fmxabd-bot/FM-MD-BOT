'use strict';

let settings = {};
try { settings = require('../settings'); } catch (e) {}

// Yahan apni categories aur commands dalein
const categories = {
    'ＡＩ': ['ai', 'chatgpt', 'gemini', 'llama', 'imagine', 'simi', 'gpt', 'deepseek'],
    'ＯＷＮＥＲ': ['public', 'private', 'mode', 'setname', 'block', 'unblock', 'restart', 'addsudo', 'delsudo', 'setprefix', 'broadcast'],
    'ＧＲＯＵＰ': ['kick', 'add', 'promote', 'demote', 'mute', 'unmute', 'tagall', 'hidetag', 'groupinfo', 'welcome', 'antilink', 'antidelete'],
    'ＤＯＷＮＬＯＡＤ': ['song', 'video', 'insta', 'tiktok', 'facebook', 'youtube', 'spotify', 'apk', 'ytmp3', 'ytmp4'],
    'ＴＯＯＬＳ': ['ping', 'dp', 'vv', 'translate', 'base64', 'qr', 'weather', 'github', 'sticker', 'toimg', 'calc', 'runtime'],
    'ＦＵＮ': ['joke', 'meme', 'dare', 'truth', 'roast', 'ship', 'quote', 'fact', '8ball', 'riddle']
};

async function menuCommand(sock, from, msg, isAdmin, session, args) {
    // ── BOT INFO ──
    const botName = session?.botName || "𝐉𝐀𝐖𝐀𝐃-𝐌𝐃";
    const prefix = session?.prefix || ".";
    const ownerName = "JawadTech";
    const totalCmds = "922";
    const version = "7.0.0 BETA";
    const mode = "public";

    // Runtime calculation
    const up = process.uptime();
    const h = Math.floor(up / 3600);
    const m = Math.floor((up % 3600) / 60);
    const s = Math.floor(up % 60);
    const runtime = `${h}h ${m}m ${s}s`;

    // ── NEWSLETTER INFO (Forward tag ke liye) ──
    const newsletterId = "120363431511637061@newsletter"; // Apna ID dalein
    const newsletterName = "JAWAD-MD Updates"; // Apna channel name dalein

    // ── BUILDING MENU TEXT ──
    let menuText = ``;
    
    // Header Box
    menuText += `┌───────────────〔 ${botName} 〕\n`;
    menuText += `├✦ Owner: ${ownerName}\n`;
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
        
        // 3 commands per line formatting
        let line = `├ `;
        cmds.forEach((cmd, index) => {
            line += `${prefix}${cmd}`;
            if (index < cmds.length - 1) line += `, `;
            
            // Line break agar lambi ho jaye
            if (line.length > 35 || index === cmds.length - 1) {
                menuText += `${line}\n`;
                line = `├ `;
            }
        });
        menuText += `└────────────────────────○\n\n`;
    }

    menuText += `⚡ Powered By ${ownerName}`;

    // ── SEND MESSAGE WITH PHOTO AND FORWARD TAG ──
    const imageUrl = settings?.startimage || "https://files.catbox.moe/5w2e6g.jpg"; // Apni image ka link

    try {
        await sock.sendMessage(from, {
            image: { url: imageUrl },
            caption: menuText,
            contextInfo: {
                forwardingScore: 999, // High score means "Frequently forwarded"
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: newsletterId,
                    newsletterName: newsletterName,
                    serverMessageId: 1
                }
            }
        }, { quoted: msg });
    } catch (e) {
        // Fallback without photo if image fails
        await sock.sendMessage(from, { text: menuText }, { quoted: msg });
    }
}

module.exports = menuCommand;
