const { prefix } = require("../config.json");
module.exports = {
    name: 'ban',
    description: 'Ban a user',
    usage: `${prefix}ban [user]`,
    execute(bot, message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have permission to use that command")

        let User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

        if (!User) return message.channel.send("Invalid User.");
        if (User.hasPermission("BAN_MEMBERS")) return message.reply("I can't ban that user");
        let banReason = args.join(" ").slice(22);
        if (!banReason) {
            banReason = "None"
        }
        User.ban({reason: banReason})
        .then(() => console.log(`Banned ${User.displayName} for ${banReason}`))
        .catch(console.error);
    },
};