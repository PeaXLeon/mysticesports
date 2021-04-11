const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'gay',
    description: 'Someone is looking kinda gay',
    usage: `${prefix}gay <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Gay().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'gay.png')

        message.channel.send(attach)
    }
}