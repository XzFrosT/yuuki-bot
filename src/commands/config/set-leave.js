const {MesssageEmbed} = require('discord.js')
const Command = require('../../Structures/Command')
const {think2} = require('../../settings/emojis.json')
const db = require('quick.db')

module.exports = class extends Command {
    
    constructor(...args) {
        super(...args, {
            aliases: ['leave-channel', 'setleave'],
            description: `This is the set leave channel for the leave message! with this u can set the leave channel !`,
            category: `${think2} Config`,
            ratelimit: {//limit for each command!
                bucket: 1,
                reset: 20 * 1000,
                stack: false,
            },
            userPerms : ['MANAGE_CHANNELS'],//Check user Perms with this!
            botPerms : ['MANAGE_CHANNELS']
        });
    }

    async run(message, args) {
        let channel = message.mentions.channels.first()

        if(!channel) {
            return message.channel.send("Please mention a channel first")
        }
        db.set(`levchannel_${message.guild.id}`, channel.id)

        message.channel.send(`Leave channel is seted as ${channel}!`)

    }
}