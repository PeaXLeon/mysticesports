const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'invert',
    description: 'Invert the colors on someone\'s avatar',
    aliases: ['negative'],
    usage: `${prefix}invert <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Invert().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'invert.png')

        message.channel.send(attach)
    }
}