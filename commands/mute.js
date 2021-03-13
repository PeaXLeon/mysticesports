const { prefix } = require("../config.json");
module.exports = {
    name: 'mute',
    description: 'Mute a member',
    usage: `${prefix}mute [user]`,
    execute(bot, message, args) {
        let User = message.mentions.members.first();
        if (!User) {
            message.channel.send('Please specify a user to mute.');
            return;
        };
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send("You don't have permissions to mute a member.");
            return;
        };
        if (User.roles.cache.find(r => r.name == 'Muted')) {
            message.channel.send("This member is already muted.");
            return;
        };
        if (User.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You can't mute an admin.");
            return;
        };
        let authorHighestRole = message.member.roles.highest.position;
        let mentionHighestRole = User.roles.highest.position;
        if(mentionHighestRole >= authorHighestRole) {
            message.channel.send("You can't mute members with a equal or a higher position.");
            return
        };
        User.roles.add(message.member.guild.roles.cache.find(r => r.name == 'Muted')).then(message.channel.send(`${User} succesfully muted.`)).catch(console.error);
    }
}