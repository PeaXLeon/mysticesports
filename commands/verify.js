const Discord = require("discord.js");
const color = require("../colors.json")
const { prefix } = require("../config.json");
const { execute } = require("./role");

module.exports = {
    "name": "verify",
    "description": "Verify a new member of our server. Use \"team\" after the user if the user is in a Mystic club",
    "usage": `${prefix}verify [user] <"team"> <"pres/vp/senior">`,
    async execute(bot, message, args) {

        const { guild } = message
        const target = message.mentions.members.first()

        if (!message.member.roles.cache.get(guild.roles.cache.find(r => r.name === "Mystic Staff").id)) {
            return message.channel.send("You don't have permission to use this command. Only people with the \"Mystic Staff\" role can use this command.")
        }

        args.shift()

        const unverified = guild.roles.cache.find(r => r.name === "Unverified")
        const visitor = guild.roles.cache.find(r => r.name === "Visitor")
        const team = guild.roles.cache.find(r => r.name === "Team Mystic")
        const pres = guild.roles.cache.find(r => r.name === "Club President")
        const vp = guild.roles.cache.find(r => r.name === "Club VP")
        const sen = guild.roles.cache.find(r => r.name === "Club Senior")

        const member = guild.members.cache.get(target.id)
        var embed = new Discord.MessageEmbed()
            .setTitle("Verifying a new member!")
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(color.gold);

        if (member.roles.cache.get(unverified.id)) {
            
            member.roles.add(visitor)
            member.roles.remove(unverified)
            embed.setDescription("Changes made: +Visitor, -Unverified")
            if (message.content.includes("team")) {
                
                member.roles.add(team)
                embed.setDescription("Changes made: +Visitor, -Unverified, +Team Mystic")
                if (message.content.includes("pres")) {
                    member.roles.add(pres)
                    embed.setDescription("Changes made: +Visitor, -Unverified, +Team Mystic, +Club President")
                } else if (message.content.includes("vp")) {
                    member.roles.add(vp)
                    embed.setDescription("Changes made: +Visitor, -Unverified, +Team Mystic, +Club VP")
                } else if (message.content.includes("senior")) {
                    member.roles.add(sen)
                    embed.setDescription("Changes made: +Visitor, -Unverified, +Team Mystic, +Club Senior")
                }
            }
            message.channel.send(embed)
        } else {
            message.channel.send("That user has already been verified")
        }

        
    }
}