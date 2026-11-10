'use strict';

// settings import kar lein agar image wahan hai
let settings = {};
try { settings = require('../settings'); } catch (e) {}

// Aapki categories ka data
const categories = {
    '👑 OWNER': ['public', 'private', 'mode', 'setname', 'block', 'unblock', 'restart', 'addsudo', 'delsudo', 'broadcast'],
    '👥 GROUP': ['kick', 'add', 'promote', 'demote', 'mute', 'unmute', 'tagall', 'hidetag', 'groupinfo', 'welcome', 'antilink'],
    '🤖 AI': ['ai', 'chatgpt', 'gemini', 'llama', 'imagine', 'simi'],
    '⬇️ DOWNLOAD': ['song', 'video', 'insta', 'tiktok', 'facebook', 'youtube', 'spotify', 'apk'],
    '🛠️ TOOLS': ['ping', 'dp', 'vv', 'translate', 'base64', 'qr', 'weather', 'github', 'sticker', 'toimg'],
    '🎉 FUN': ['joke', 'meme', 'dare', 'truth', 'roast', 'ship', 'quote', 'fact', '8ball']
};

async function menuCommand(sock, from, msg, isAdmin, session, args) {
    const botName = session?.botName || "𝐒𝐘𝐄𝐃 𝐌𝐈𝐍𝐈 𝐁𝐎𝐓";
    const prefix = session?.prefix || ".";
    const newsletterId = "120363431511637061@newsletter";
    const newsletterName = "𝐒𝐘𝐄𝐃 𝐌𝐈𝐍𝐈 𝐔𝐩𝐝𝐚𝐭𝐞𝐬";

    // ── TEXT JO PHOTO KE NEECHE AAYEGA ──
    const captionText = `
💀 *${botName}* 💀

Welcome to the official bot menu!

📁 Tap the menu button below to browse categories and commands.

⚡ *Categories:* ${Object.keys(categories).length}
☠️ *Powered By:* SYED MINI
`.trim();

    // ── BUTTONS BANAIN ──
    // Har category ke liye ek button banega
    const interactiveButtons = [];
    
    for (const catName of Object.keys(categories)) {
        interactiveButtons.push({
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
                display_text: catName,
                id: `${prefix}menucat ${catName}` // Ye command trigger karega jab click hoga
            })
        });
    }

    try {
        // Check karein ke kya bot ke paas button library (wolfbtns) hai
        const wolfBtns = globalThis._wolfBtns;
        
        if (wolfBtns && typeof wolfBtns.sendInteractiveMessage === 'function') {
            // PHOTO KE SAATH BUTTON BHEJNA
            await wolfBtns.sendInteractiveMessage(sock, from, {
                image: { url: settings.startimage || "https://files.catbox.moe/5w2e6g.jpg" }, // Apni image ka link dalein
                text: captionText,
                footer: "🐺 System Online",
                interactiveButtons: interactiveButtons
            }, { quoted: msg });
            
        } else {
            // FALLBACK: Agar button system fail ho jaye toh simple photo bhej de
            throw new Error("Button system not found");
        }
    } catch (error) {
        console.error("Menu Button Error:", error.message);
        // Fallback: Agar button na lage toh normal photo + list bhej de
        let fallbackText = captionText + "\n\n*Categories:*\n";
        for (const [cat, cmds] of Object.entries(categories)) {
            fallbackText += `\n*${cat}*\n${cmds.map(c => prefix + c).join(', ')}\n`;
        }
        
        await sock.sendMessage(from, { 
            image: { url: settings.startimage || "https://files.catbox.moe/5w2e6g.jpg" }, 
            caption: fallbackText 
        }, { quoted: msg });
    }
}

module.exports = menuCommand;
