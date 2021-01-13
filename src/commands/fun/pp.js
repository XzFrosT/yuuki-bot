const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')
const { matches } = require('lodash')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: '',
            category: `${angrybear} Fun`,

        })
    }
        async run(message, args) {
            const pp = [
                "8=D",
                "8===D",
                "8====D",
                "8======D",
                "8=========D",
            ]
            const random = pp[Math.floor(Math.random() * pp.length)]

            const em = new MessageEmbed()
            .setTitle("Penis size!")
            .setColor("GOLD")
            .setDescription(random)

            message.channel.send(em)
        }
    }