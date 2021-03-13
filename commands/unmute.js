const { prefix } = require("../config.json");
module.exports = {
    name: 'unmute',
    description: 'Unmute a member',
    usage: `${prefix}unmute [user]`,
    execute(bot, message, args) {
        let User = message.mentions.members.first();
        if (!User) {
            message.channel.send('Please specify a user to unmute.');
            return;
        };
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send("You don't have permissions to unmute a member.");
            return;
        };
        if (!User.roles.cache.find(r => r.name == 'Muted')) {
            message.channel.send("This member isn't muted.");
            return;
        };
        User.roles.remove(message.member.guild.roles.cache.find(r => r.name == 'Muted')).then(message.channel.send(`${User} succesfully unmuted.`)).catch(console.error);
    }
}