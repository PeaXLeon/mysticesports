const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'greyscale',
    description: 'Remove the color from someone\'s avatar',
    aliases: ['grey', 'grayscale', 'gray'],
    usage: `${prefix}greyscale <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Greyscale().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'grey.png')

        message.channel.send(attach)
    }
}