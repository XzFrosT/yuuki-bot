const {MesssageEmbed} = require('discord.js')
const Command = require('../../Structures/Command')
const {think2} = require('../../settings/emojis.json')
const db = require('quick.db')
const logchannel = require('../../models/logchannel')

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
        const channel = message.mentions.channels.first()
        const newdata = new logchannel({
            Channel : channel.id,
            Guild : message.guild.id
        })
        newdata.save()
        console.log(newdata)
        message.channel.send(`You have set the channel ${channel} as the log channel!`)
    }
}