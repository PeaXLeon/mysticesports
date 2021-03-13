const { MessageEmbed } = require("discord.js")
const color = require("../colors.json")
const { logo } = require("../config.json")

module.exports = {
    name: "store",
    description: "See what we have to sell",
    aliases: ["shop"],
    async execute(bot, message, args) {

        let items = Object.keys(bot.shop);
        let content = "";

        for (var i in items) {
            content += `${message.guild.roles.cache.find(r => r.name === items[i])} - *${bot.shop[items[i]].cost} coins*\n`
        }

        const embed = new MessageEmbed()
            .setAuthor("Mystic Esports Shop", "https://i.imgur.com/c6DGqm0.png")
            .setTitle("Visit #shop to get more info on each of these roles!")
            .setDescription(content)
            .setTimestamp()
            .addField('Use the "buy" command to buy one of these items', '\u200B')
            .setColor(color.blue)
            .setFooter("#StayMystic", logo)
        message.channel.send(embed)
    }
}