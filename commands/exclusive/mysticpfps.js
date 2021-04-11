module.exports = {
	name: 'mysticpfps',
    description: 'All the Mystic Esports profile pictures available',
    aliases: ['mysticpfp', 'mpfp'],
    async execute(bot, message, args) {
    	
        message.channel.send('Here are all the Mystic profile pictures', {
            files: ['https://i.imgur.com/vx952ey.jpg', 'https://i.imgur.com/OkuaG6W.jpg', 'https://i.imgur.com/TvK18Ej.jpg', 'https://i.imgur.com/8EcCkxf.jpg']
        })
    }
}