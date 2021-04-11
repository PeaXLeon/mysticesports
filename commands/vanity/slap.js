const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'slap',
    description: 'Slap someone in the face',
    usage: `${prefix}slap <@user>`,
    async execute(bot, message, args) {

        let author = message.author
        let user = message.mentions.users.first()

        if (!user) user = message.author

        let av1 = author.displayAvatarURL({ dynamic: false, format: 'png' })
        let av2 = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Batslap().getImage(av1, av2)
        let attach = new Discord.MessageAttachment(img, 'slap.png')

        message.channel.send(attach)
    }
}