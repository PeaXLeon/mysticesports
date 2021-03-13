const snekfetch = require("snekfetch");
const Discord   = require("discord.js");

module.exports = {
    name: 'meme',
    description: 'Get a meme from r/dankmemes',
    async execute(bot, message, args) {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);

        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)

        var embedmeme = new Discord.MessageEmbed()
            .setTitle(allowed[randomnumber].data.title)
            .setDescription("Posted by: " + allowed[randomnumber].data.author)
            .setImage(allowed[randomnumber].data.url)
            .addField("More information:", "Votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
            .setFooter("Memes from the r/dankmemes community")
            .setColor("RANDOM");
        await message.channel.send(embedmeme)
    }
}