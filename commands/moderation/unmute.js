const Discord = require("discord.js")
const { prefix } = require("../../config.json");
const color = require("../../colors.json")

module.exports = {
    name: 'unmute',
    description: 'Unmute a member',
    usage: `${prefix}unmute [user]`,
    execute(bot, message, args) {

        let muted = message.member.guild.roles.cache.find(r => r.name == 'Muted')
        let User = message.mentions.members.first();

        const erembed = new Discord.MessageEmbed()
            .setTitle(`Command: ${prefix}unmute`)
            .setDescription(`**Description:** Unmute a member\n**Cooldown:** None\n**Usage:** ${prefix}unmute [@user]\n**Example:** ${prefix}unmute @ShinePlays`)

        if (!User) return message.channel.send(erembed)

        if (!message.member.roles.cache.find(r => r.name === 'Mystic Staff')) return
        if (!User.roles.cache.find(r => r.name == 'Muted')) return message.channel.send({
            embed: {
                description: `❌ ${User.user.username} isn't muted`,
                color: color.red
            }
        })

        const embed = new Discord.MessageEmbed()
            .setDescription(`✅ ***${User.user.username} was unmuted***`)
            .setColor(color.green)

        User.roles.remove(muted).then(message.channel.send(embed))
    }
}