const Discord = require("discord.js")
const config = require("../../config.json")

module.exports = {
	name: 'skiller',
    description: 'The code you should be using in the Brawl Stars shop',
    async execute(bot, message, args) {
    	
        
      const codeembed = new Discord.MessageEmbed()
        .setAuthor('CODE: Skiller')
        .setTitle('Best code in Brawl Stars')
        .setDescription('Make sure to use CODE: Skiller in the Brawl Stars shop to support a great content creator and to support the Mystic community. \n🎵 (S-K-I-L-L-E-R Code Skiller in the Brawl Stars shop)')
        .setFooter('#StayMystic', config.logo)
        .setThumbnail('https://i.imgur.com/mKjmx6Q.jpg')
        .setColor('#a5cced')
      
      message.channel.send(codeembed)
    
    }
}