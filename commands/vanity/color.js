const Discord = require("discord.js")
const dig = require("discord-image-generation")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'color',
    description: 'Get a color out of a HEX code',
    usage: `${prefix}color [hex code]`,
    async execute(bot, message, args) {

        let color = args[0]
        if (!color) return message.reply("You need to enter a HEX code")
        let regex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i
        if (!color.match(regex)) return message.reply("You need to enter a valid hex code (example: https://www.w3schools.com/colors/colors_hexadecimal.asp)")
        let img = await new dig.Color().getImage(color)
        let attach = new Discord.MessageAttachment(img, 'color.png')

        message.channel.send(attach)
    }
}