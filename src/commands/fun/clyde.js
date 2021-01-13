const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')
const fetch = require('node-fetch')


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['clyde'],
            description: 'Clyde the discord bot!',
            category: `${angrybear} Fun`,

        })
    }
        async run(message, args) {
            const text = args.slice(0).join(" ")
            if(!text) return message.channel.send("you need some text there")
            fetch(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`)
            .then((res) => res.json())
            .then((body) => {
                console.log(body)
                let embed = new MessageEmbed()
                    .setImage(body.message)
                    .setColor("GOLD")
            message.channel.send(embed)
})
        }
    }