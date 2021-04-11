module.exports = {
    name : 'potato',
    description: 'Search a potato image on Google Images',
    async execute(bot, message, args) {
        
        var list = [
            'https://i.imgur.com/hUq6fvu.jpg',
            'https://i.imgur.com/cu89Q8W.jpg',
            'https://i.imgur.com/Fv6dTrL.jpg',
            'https://i.imgur.com/QHhmdw5.jpg',
            'https://i.imgur.com/PdT3LoU.jpg',
            'https://i.imgur.com/GGwc9Lv.jpg',
            'https://i.imgur.com/LUyPhCl.jpg',
            'https://i.imgur.com/monCXN0.jpg',
            'https://i.imgur.com/sBFbY5l.jpg',
            'https://i.imgur.com/6nQqZ0B.jpg',
            'https://i.imgur.com/CQcfqmC.jpg',
            'https://i.imgur.com/9uajc9R.jpg',
            'https://i.imgur.com/X4TpLyb.jpg',
            'https://i.imgur.com/EE31Fbe.jpg',
            'https://i.imgur.com/WIwfVPO.jpg',
            'https://i.imgur.com/U7WYSdw.jpg',
            'https://i.imgur.com/GryPfQn.jpg',
            'https://i.imgur.com/N0Jim9S.jpg',
            'https://i.imgur.com/5lNbslC.jpg',
            'https://i.imgur.com/LcraBXZ.jpg',
            'https://i.imgur.com/tNVe9xK.jpg',
            'https://i.imgur.com/qad6pJJ.jpg',
            'https://i.imgur.com/14K0ywL.jpg',
            'https://i.imgur.com/NUboosA.jpg',
            'https://i.imgur.com/r2QfwrE.jpg',
            'https://i.imgur.com/b2z8ghd.jpg',
            'https://i.imgur.com/BNum6GU.jpg',
            'https://i.imgur.com/HFOvjq5.jpg',
            'https://i.imgur.com/VF5drjY.jpg',
            'https://i.imgur.com/TxmgRCw.jpg',
            'https://i.imgur.com/e69eHud.jpg',
            'https://i.imgur.com/vrD7hEe.jpg',
            'https://i.imgur.com/sgtYmql.jpg',
            'https://i.imgur.com/IwabIvC.jpg',
            'https://i.imgur.com/8kc5dmO.jpg',
            'https://i.imgur.com/unyW123.jpg',
            'https://i.imgur.com/e7B3RO0.jpg',
            'https://i.imgur.com/b5hw7Le.jpg',
            'https://i.imgur.com/fyESOmc.jpg',
            'https://i.imgur.com/pK8uJNv.jpg',
        ]
        
        let rand = Math.floor(Math.random() * list.length)
        await message.channel.send(list[rand])
    }
}