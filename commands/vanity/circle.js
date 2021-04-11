const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'circle',
    description: 'Make a circle out of someone\'s avatar',
    usage: `${prefix}circle <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Circle().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'circle.png')

        message.channel.send(attach)
    }
}