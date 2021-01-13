const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')
const fetch = require('node-fetch')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['nekogirl'],
            description: 'see girls :D',
            category: `${angrybear} Fun`,
            ratelimit: {
                // how many times this command can be ran before getting limited.
                bucket: 1,
                // the time (in milliseconds) before the command can be used again, in this case: seven seconds
                reset: 20 * 1000,
                // whether the reset time should stack.
                stack: false
            },

        })
    }
        async run(message, args) {
            let text = args.slice(0).join(" ");
            if(!text) return message.channel.send("you need some text there")
            fetch(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`)
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                .setImage(body.message)
                .setColor("RANDOM")
                message.channel.send(embed)
            })
        }
    }