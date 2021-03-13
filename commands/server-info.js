const Discord = require("discord.js");
module.exports = {
    name: 'server-info',
    aliases: ['server'],
    description: 'Gets information of the server',
    execute(bot, message, args) {

        const { guild } = message
        const { name, region, memberCount, owner, afkTimeout, premiumTier, premiumSubscriptionCount, createdAt } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
            .setAuthor('Mystic Esports™', 'https://i.imgur.com/c6DGqm0.png')
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields(
                {
                    name: 'Region',
                    value: region,
                    inline: true,
                },
                {
                    name: 'Owner',
                    value: owner.user.tag,
                    inline: true,
                },
                {
                    name: 'Created At',
                    value: createdAt.toUTCString(),
                },
                {
                    name: 'Members',
                    value: memberCount,
                },
                {
                    name: 'Boosts',
                    value: `Boost Level: ${premiumTier}, Amount of boosts: ${premiumSubscriptionCount}`,
                },
                {
                    name: 'AFK Timeout',
                    value: afkTimeout / 60,
                }
            )
            .setColor('#4fabdd')
            .setFooter('#StayMystic');

        message.channel.send(embed)
    }
}