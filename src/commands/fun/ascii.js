const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')
const figlet = require('figlet')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['banner'],
            description: 'text to ascii!',
            category: `${angrybear} Fun`,

        })
    }
        async run(message, args) {
            if(!args[0]) return message.channel.send('Please provide some text');

        const msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

            message.channel.send('```' + data + '```')
        })
        }
    }