const Discord = require("discord.js");
const { prefix } = require("../../config.json");

module.exports = {
    name: "avatar",
    aliases: ['av', 'pfp', 'icon'],
    description: "Show the avatar of the user",
    usage: `${prefix}avatar [user]`,
    execute(bot, message, args) {
        const target = message.mentions.users.first() || message.member.user
        var embedavatar = new Discord.MessageEmbed()
        .setTitle(`${target.username}'s avatar`)
        .setImage(target.displayAvatarURL({ size: 256}))
        .setColor('DARK_BLUE');
        message.channel.send(embedavatar)
    }
}