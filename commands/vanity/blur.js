const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'blur',
    description: 'Blur out someone\'s avatar',
    usage: `${prefix}blur <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Blur().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'blur.png')

        message.channel.send(attach)
    }
}