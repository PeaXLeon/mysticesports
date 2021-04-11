const { prefix } = require("../../config.json")
const Discord = require("discord.js")
const color = require("../../colors.json")

module.exports = {
    name: 'ban',
    description: 'Ban a user',
    usage: `${prefix}ban [user] [reason]`,
    execute(bot, message, args) {

        if (!message.member.hasPermission("BAN_MEMBERS")) return

        let User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

        const erembed = new Discord.MessageEmbed()
            .setTitle(`Command ${prefix}ban`)
            .setDescription(`**Description:** Ban a member\n**Cooldown:** None\n**Usage:** ${prefix}ban [@user] [reason]\n**Example:** ${prefix}ban @ShinePlays Raiding`)

        const noban = new Discord.MessageEmbed()
            .setDescription(`❌ I can't ban that user.`)
            .setColor(color.red)

        if (!User) return message.channel.send(erembed);
        if (User.hasPermission("BAN_MEMBERS")) return message.channel.send(noban)
        let banReason = args.join(" ").slice(22);
        if (!banReason) {
            banReason = "None"
        }

        const embed = new Discord.MessageEmbed()
            .setDescription(`✅ ***${User.user.username} was banned***`)
            .setColor(color.green)

        User.ban({reason: banReason})
        .then(() => {
            message.channel.send(embed)
            User.send(`You were banned from ${message.guild.name} for ${banReason}`)
        })
        .catch(console.error);
    },
};