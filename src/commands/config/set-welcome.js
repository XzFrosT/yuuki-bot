const {MesssageEmbed} = require('discord.js')
const Command = require('../../Structures/Command')
const {think2} = require('../../settings/emojis.json')
const db = require('quick.db')
const welcomeChannel = require('../../models/welcome-channel')

module.exports = class extends Command {
    
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: ``,
            category: `${think2} Config`,
            userPerms : ['MANAGE_CHANNELS'],//Check user Perms with this!
            botPerms : ['MANAGE_CHANNELS'],
        });
    }

    async run(message, args) {
        const channel = message.mentions.channels.first()
       welcomeChannel.findOne({guild: message.guild.id}, async (err, existing) => {
           if(err) throw err;
           if(existing) return message.reply(`Isn't there a channel already please make sure to use m!unset-welcome and use this command again!`)
       
           const newt = new welcomeChannel({
            channelid: channel.id,
            guild: message.guild.id,
     });
     await newt.save()
     console.log(newt)
        })
       message.channel.send(`hehe worked`)


    }
}