const Discord = require("discord.js")
const color = require("../../colors.json")
const { logo } = require("../../config.json")

module.exports = {
    name: 'invite',
    description: 'The invite to the Mystic Esports Discord Server',
    async execute(bot, message, args) {

        message.channel.send("https://discord.gg/8FFvNuP")
    }
}