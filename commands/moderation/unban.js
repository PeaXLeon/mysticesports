const Discord = require('discord.js');
const { prefix } = require("../../config.json");
const color = require("../../colors.json")

module.exports = {
    name: 'unban',
    description: 'Unban a banned member',
    usage: `${prefix}unban [user] [reason]`,
    async execute(bot, message, args) {

        if (!message.member.hasPermission('BAN_MEMBERS')) return

        let member = args[0];

        const erembed = new Discord.MessageEmbed()
            .setTitle(`Command ${prefix}unban`)
            .setDescription(`**Description:** Unban a user\n**Cooldown:** None\n**Usage:** ${prefix}unban [@user] [reason]\n**Example:** ${prefix}unban @ShinePlays No more beef`)
        if (!args[0]) return message.channel.send(erembed)

        try {
            member = await bot.users.fetch(member)
        } catch {
            return
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'No reason';

        const embed = new Discord.MessageEmbed()

        message.guild.fetchBans().then(bans => {

            const user = bans.find(ban => ban.user.id === member.id );
            if (user) {

                embed
                    .setTitle(`✅ ***${user.user.tag} was unbanned***`)
                    .setColor(color.green)
                message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed))

            } else {
                message.channel.send({
                    embed: {
                        description: `❌ ${member.tag} isn't banned`,
                        color: color.red
                    }
                })
            }
        })
    }
}