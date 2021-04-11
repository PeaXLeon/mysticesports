const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'triggered',
    description: 'Someone is really triggered',
    aliases: ['trigger'],
    usage: `${prefix}triggered <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Triggered().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'triggered.gif')

        message.channel.send(attach)
    }
}