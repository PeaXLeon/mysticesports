const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'hitler',
    description: 'Someone is even worse than Hitler',
    usage: `${prefix}hitler <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Hitler().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'hitler.png')

        message.channel.send(attach)
    }
}