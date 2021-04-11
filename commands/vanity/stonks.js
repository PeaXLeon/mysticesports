const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'stonks',
    description: 'Easy stonks',
    usage: `${prefix}stonks <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Stonk().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'stonks.png')

        message.channel.send(attach)
    }
}