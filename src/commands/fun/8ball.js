const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')
const {prefix} = require('../../../config.json')


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['8ball'],
            description: 'Ask 8ball a question it responds with the best response!',
            category: `${angrybear} Fun`,

        })
    }
        async run(message, args) {

            const question = message.content.slice(prefix.length + 6)

            if(!question) {
                message.reply(`NO question mentioned!`)
            }
            else {
                const replies = [
                    "No.",
                    "Yes.",
                    "Absolutely",
                    "Maybe",
                    "Why did you ask?",
                    "Could u ask again?",
                    "Too lazy to answer.",
                ]
    
                const statement = replies[Math.floor(Math.random() * replies.length)]
            const em = new MessageEmbed()
            .setColor("GOLD")
            .setDescription(`Ask a question and 8ball give the best reply for it!`)
            .addFields(
                {
                    name: `Question!`,
                    value: question,
                    inline: false
                },
                {
                    name: `My answer`,
                    value: statement,
                    inline: false
                },
            )

            message.channel.send(em)//
            }
        }
    }