const eco = require("discord-economy")
const Discord = require('discord.js')
const color = require("../colors.json")
const { logo } = require("../config.json")

module.exports = {
    name: 'daily',
    description: 'Get your daily reward',
    async execute(bot, message, args) {

        var output = await eco.Daily(message.author.id)
        //output.updated will tell you if the user already claimed his/her daily yes or no.

        if (output.updated) {

            let embed = new Discord.MessageEmbed()
                .setAuthor(`Daily Reward`, message.author.displayAvatarURL())
                .setColor(color.green)
                .addField(`Collected`, '250')
                .setFooter("#StayMystic", logo)
            message.channel.send(embed)
            await eco.AddToBalance(message.author.id, 250)

        } else {
            message.channel.send(`Sorry, you already claimed your daily coins!\nCome back in \`${output.timetowait}\` to claim your daily reward again!`)
        }
    }
}