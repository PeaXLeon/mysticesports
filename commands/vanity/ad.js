const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'ad',
    description: 'Always these stupids ads',
    usage: `${prefix}ad <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Ad().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'ad.png')

        message.channel.send(attach)
    }
}