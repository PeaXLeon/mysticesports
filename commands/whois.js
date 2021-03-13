const Discord = require('discord.js');
const { prefix } = require("../config.json");
module.exports = {
    name: 'whois',
    aliases: ['userinfo'],
    description: 'Get the userinfo',
    usage: `${prefix}whois [user]`,
    execute(bot, message, args) {
        const { guild, channel } = message
        const User = message.mentions.users.first() || message.member.user
        const Member = guild.members.cache.get(User.id)
        const AllRoles = Member.roles.cache.array()
        const Roles = AllRoles.filter(r => r.name !== '@everyone')
        const embed = new Discord.MessageEmbed()
            .setAuthor(`User info for ${User.username}`, User.displayAvatarURL())
            .setThumbnail(User.displayAvatarURL())
            .addFields(
                {
                    name: 'User ID',
                    value: User.id,
                    inline: true,
                },
                {
                    name: 'User Tag',
                    value: User.tag,
                    inline: true,
                },
                {
                    name: 'User Presence',
                    value: User.presence.status,
                },
                {
                    name: 'Created Account',
                    value: new Date(User.createdAt).toUTCString(),
                    inline: true,
                },
                {
                    name: 'Joined Server',
                    value: new Date(Member.joinedAt).toUTCString(),
                    inline: true,
                },
                {
                    name: `Roles (${Member.roles.cache.size - 1})`,
                    value: Roles.join(' '),
                },
                {
                    name: 'Highest Role',
                    value: Member.roles.highest.name,
                }
            )
            .setColor('#4fabdd')
            .setFooter('#StayMystic');
        message.channel.send(embed)
    }
}