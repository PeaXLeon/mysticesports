const Discord = require("discord.js")
const color = require("../../colors.json")
const { prefix } = require("../../config.json")

module.exports = {
    name: 'mute',
    description: 'Mute a member',
    usage: `${prefix}mute [user]`,
    execute(bot, message, args) {
 
        let muted = message.member.guild.roles.cache.find(r => r.name == 'Muted')
        let User = message.mentions.members.first();

        const erembed = new Discord.MessageEmbed()
            .setTitle(`Command: ${prefix}mute`)
            .setDescription(`**Description:** Mute a member\n**Cooldown:** None\n**Usage:** ${prefix}mute [@user]\n**Example:** ${prefix}mute @ShinePlays`)

        if (!User) return message.channel.send(erembed)

        const nomute = new Discord.MessageEmbed()
            .setDescription(`❌ That user is a mod/admin, I can't do that.`)
            .setColor(color.red)

        if (!message.member.roles.cache.find(r => r.name === 'Mystic Staff')) return
        if (User.roles.cache.find(r => r.name == 'Muted')) return message.channel.send({
            embed: {
                description: `❌ ${User.user.username} is already muted`
            }
        })

        let authorHighestRole = message.member.roles.highest.position;
        let mentionHighestRole = User.roles.highest.position;

        if(mentionHighestRole >= authorHighestRole) return message.channel.send(nomute)

        const embed = new Discord.MessageEmbed()
            .setDescription(`✅ ***${User.user.username} was muted***`)
            .setColor(color.green)

        User.roles.add(muted).then(message.channel.send(embed)).catch(message.channel.send(nomute))
    }
}