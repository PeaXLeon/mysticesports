const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'rip',
    description: 'R.I.P.',
    usage: `${prefix}rip <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Rip().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'rip.png')

        message.channel.send(attach)
    }
}