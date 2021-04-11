const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'affect',
    description: 'No, it doesn\'t affect my child',
    usage: `${prefix}affect <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Affect().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'affect.png')

        message.channel.send(attach)
    }
}