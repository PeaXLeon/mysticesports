const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'spank',
    description: 'Spank someone for being bad',
    usage: `${prefix}spank <@user>`,
    async execute(bot, message, args) {

        let author = message.author
        let user = message.mentions.users.first()

        if (!user) user = message.author

        let av1 = author.displayAvatarURL({ dynamic: false, format: 'png' })
        let av2 = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Spank().getImage(av1, av2)
        let attach = new Discord.MessageAttachment(img, 'spank.png')

        message.channel.send(attach)
    }
}