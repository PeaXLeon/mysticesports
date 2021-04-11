const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'wanted',
    description: 'Someone is wanted... and there is a reward?',
    usage: `${prefix}wanted <@user> <reward>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Wanted().getImage(av, '$')
        let attach = new Discord.MessageAttachment(img, 'wanted.png')

        message.channel.send(attach)
    }
}