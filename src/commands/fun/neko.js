const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')
const akaneko = require('akaneko')


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['nekogirl'],
            description: 'see girls :D',
            category: `${angrybear} Fun`,

        })
    }
        async run(message, args) {
            const em = new MessageEmbed()
            .setColor("GOLD")
            .setImage(akaneko.neko())

            message.channel.send(em);
        }
    }