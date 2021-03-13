const { MessageEmbed } = require('discord.js');
const { prefix } = require("../config.json");

module.exports = {
    name: 'unban',
    description: 'Unban a banned member',
    usage: `${prefix}unban [user]`,
    async execute(bot, message, args) {

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You can't use that command").then(m => m.delete({ timeout: 5000 }));
        let member = args[0];
        if (!args[0]) return message.channel.send('Please enter a users id to unban!').then(m => m.delete({ timeout: 5000 }));

        try {
            member = await bot.users.fetch(member)
        } catch (e) {
            console.log(e)
            return message.channel.send("That's not a valid user").then(m => m.delete({ timeout: 5000 }));
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        message.guild.fetchBans().then( bans => {

            const user = bans.find(ban => ban.user.id === member.id );

            if (user) {
                embed.setTitle(`Successfully unbanned ${user.user.tag}`)
                    .setColor('#00ff00')
                    .addField('User ID', user.user.id, true)
                    .addField('User Tag', user.user.tag, true)
                    .addField('Reason', reason)
                message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed))
            } else {
                embed.setTitle(`User ${member.tag} isn't banned!`)
                    .setColor('#ff0000')
                message.channel.send(embed)
            }

        }).catch(e => {
            console.log(e)
            message.channel.send('An error has occurred!')
        });

    }
}