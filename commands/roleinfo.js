const Discord = require('discord.js');
const { prefix } = require("../config.json");

module.exports = {
    name: 'roleinfo',
    description: 'Get info of a role',
    usage: `${prefix}roleinfo [role]`,
    execute(bot, message, args) {

    try {
        const roleName = message.guild.roles.cache.find(r => (r.name === args.join(' ').toString()) || (r.id === args.join(' ').toString())) || message.mentions.roles.first()
        const perms = new Discord.Permissions(roleName.permissions.bitfield).toArray()

        const embed = new Discord.MessageEmbed()
            .setColor(roleName.color)
            .setTitle(roleName.name)
            .addFields(
                {
                    name: 'Role ID',
                    value: roleName.id,
                    inline: true
                },
                {
                    name: 'Role Color',
                    value: roleName.hexColor,
                    inline: true
                },
                {
                    name: 'Mentionable',
                    value: roleName.mentionable ? 'Yes' : 'No',
                    inline: true
                },
                {
                    name: 'Role Permissions',
                    value: perms.join(', ').toLowerCase() || "None"
                }
            )
            .setFooter("Role Created")
            .setTimestamp(roleName.createdAt.toUTCString())
        message.channel.send(embed)
    } catch (e) {
        return message.channel.send("Role Doesn't Exist").then(() => console.log(e))
    }
    }
}