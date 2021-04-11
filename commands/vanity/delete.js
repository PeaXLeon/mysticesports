const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'delete',
    description: 'Delete that trash person',
    usage: `${prefix}delete <@user>`,
    async execute(bot, message, args) {

        let user = message.mentions.users.first() || message.author

        let av = user.displayAvatarURL({ dynamic: false, format: 'png' })
        let img = await new dig.Delete().getImage(av)
        let attach = new Discord.MessageAttachment(img, 'delete.png')

        message.channel.send(attach)
    }
}