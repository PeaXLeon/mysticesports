const Discord = require("discord.js")
const color = require("../../colors.json")
const { logo } = require("../../config.json")

module.exports = {
    name: 'socials',
    description: 'All of the Mystic Social Media',
    async execute(bot, message, args) {

        const embed = new Discord.MessageEmbed()
            .setAuthor("#StayMystic", logo)
            .setThumbnail(logo)
            .setTitle("Mystic Esports Social Media")
            .addFields(
                { name: 'Website', value: 'https://mysticesportsbs.wixsite.com/mysticesports'},
                { name: 'YouTube', value: 'https://youtube.com/mysticesports'},
                { name: 'Twitter', value: 'https://twitter.com/MysticEsportsOP'},
                { name: 'Reddit', value: 'https://www.reddit.com/r/MysticEsports/'},
                { name: 'Instagram', value: 'https://instagram.com/mysticesportsop'},
                { name: 'TikTok', value: 'https://www.tiktok.com/@mysticesportsop'},
                { name: 'Email', value: '@mysticesportsop.com'}
            )
            .setColor(color.blue)

        message.channel.send(embed)
    }
}