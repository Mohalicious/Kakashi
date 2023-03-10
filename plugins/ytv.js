let fetch = require('node-fetch')
const { servers, ytv } = require('../lib/y2mate')
let handler = async(m, { conn, args, isPrems, isOwner }) => {
    if (!args || !args[0]) return conn.reply(m.chat, 'Uhm... the url?', m)
    let chat = global.db.data.chats[m.chat]
    let server = (args[1] || servers[0]).toLowerCase()
    let { dl_link, thumb, title, filesize, filesizeF } = await ytv(args[0], servers.includes(server) ? server : servers[0])
    let _thumb = {}
    try { _thumb = { thumbnail: await (await fetch(thumb)).buffer() } } catch (e) {}
    m.reply(wait)
	await conn.sendMessage(m.chat, { document: { url: dl_link }, mimetype: 'video/mp4', fileName: title + `.mp4`}, {quoted: m})
   conn.sendFile(m.chat, dl_link, title + '.mp4', `
*Title:* ${title}
*Filesize:* ${filesizeF}
`.trim(), m, false, { thumbnail: Buffer.alloc(0), mimetype: 'video/mp4' })
}
handler.help = ['ytmp4', 'ytv', 'video']
handler.tags = ['downloader']
handler.command = /^(ytv|ytmp4|video)$/i

module.exports = handler
