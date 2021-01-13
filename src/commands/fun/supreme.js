const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['nekogirl'],
            description: 'see girls :D',
            category: `${angrybear} Fun`,

        })
    }
        async run(message, args) {
            if (!args[0]) return message.channel.send("Please Add Text To Supremeify");
        
            const supreme = new MessageEmbed()
            .setColor('#de0000')
            .setTitle('Here\'s Your Supremeified Text')
            .setImage(`https://api.alexflipnote.dev/supreme?text=${args.join("%20")}`)
            .setFooter(`Requested By ${message.author.tag}`)
            .setTimestamp();
            
    message.channel.send(supreme);
        }
    }