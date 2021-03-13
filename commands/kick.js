const { prefix } = require("../config.json");
module.exports = {
    name: 'kick',
    description: 'Kick a Member',
    usage: `${prefix}kick [user]`,
    execute(bot, message, args) {
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send('You have no permissions to do that');
            return;
        };
        let mentionMember = message.mentions.members.first();
        if(!mentionMember) {
            message.channel.send('Please mention the member you want to kick');
            return;
        }
        let authorHighestRole = message.member.roles.highest.position;
        let mentionHighestRole = mentionMember.roles.highest.position;
        if(mentionHighestRole >= authorHighestRole) {
            message.channel.send("You can't kick members with equal or higher position");
            return;
        };
        if(!mentionMember.kickable) {
            message.channel.send('I have no permissions to kick this user');
            return
        };
        mentionMember.kick()
            .then(() => console.log(`Kicked ${mentionMember.displayName}`))
            .catch(console.error);
    }
}