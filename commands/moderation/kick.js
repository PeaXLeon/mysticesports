const Discord = require("discord.js")
const { prefix } = require("../../config.json");
const color = require("../../colors.json")

module.exports = {
    name: 'kick',
    description: 'Kick a Member',
    usage: `${prefix}kick [user]`,
    execute(bot, message, args) {

        if(!message.member.hasPermission('KICK_MEMBERS')) return 

        let mentionMember = message.mentions.members.first();

        const erembed = new Discord.MessageEmbed()
            .setTitle(`Command ${prefix}kick`)
            .setDescription(`**Description:** Kick a member\n**Cooldown:** None\n**Usage:** ${prefix}kick [@user]\n**Example:** ${prefix}kick @ShinePlays`)

        const nokick = new Discord.MessageEmbed()
            .setDescription(`❌ I can't kick that user.`)
            .setColor(color.red)

        if(!mentionMember) return message.channel.send(erembed)

        let authorHighestRole = message.member.roles.highest.position;
        let mentionHighestRole = mentionMember.roles.highest.position;

        if(mentionHighestRole >= authorHighestRole) return message.channel.send(nokick)
        if(!mentionMember.kickable) return message.channel.send(nokick)

        const embed = new Discord.MessageEmbed()
            .setDescription(`✅ ***${User.user.username} was kicked***`)
            .setColor(color.green)

        mentionMember.kick()
            .then(() => message.channel.send(embed))
            .catch(console.error);
    }
}