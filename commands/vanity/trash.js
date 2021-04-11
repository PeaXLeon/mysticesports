const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'trash',
    description: 'I just see trash there',
    usage: `${prefix}trash <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Trash().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'trash.png')

        message.channel.send(attach)
    }
}