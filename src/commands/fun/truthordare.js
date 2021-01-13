const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')
const {question, dare} = require('../../settings/truth r dare/truth.json')


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['truthordare'],
            description: 'truth or dare',
            category: `${angrybear} Fun`,

        })
    }
        async run(message, args) {
            if(!args[0]) return message.reply(`You have to say truth or dare bruh!`)
           if(args[0] === 'truth'){
            const questions = question[Math.floor(Math.random() * question.length)]
            message.channel.send(`> **question** - ${questions}🍪`)

            try {
                let msgs = await message.channel.awaitMessages(
                (u2) => u2.author.id === message.author.id,
                {time: 15000, max: 1, errors: ["time"]}
                )
            } catch (e) {
                return message.reply(`U didnt answer in time :sad:`)
            }}
            if(args[0] === 'dare') {
                const questions = dare[Math.floor(Math.random() * dare.length)]
                message.channel.send(`> **darre** - ${dare} you are given 15m to response!`)
                
                try {
                    let msgs = await message.channel.awaitMessages(
                    (u2) => u2.author.id === message.author.id,
                    {time: 150000, max: 1, errors: ["time"]}
                    )
                } catch (e) {
                    return message.reply(`U didnt answer in time :sad:`)
                }
            }
        }
    }