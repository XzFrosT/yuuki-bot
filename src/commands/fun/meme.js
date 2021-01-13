const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')
const axois = require('axios')


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['nekogirl'],
            description: 'see girls :D',
            category: `${angrybear} Fun`,

        })
    }
        async run(message, args) {
            const url = 'https://some-random-api.ml/meme';

            let data, response;
            try {
                response = await axios.get(url);
                data = response.data;
            } catch (e) {
                return message.channel.send(`An error has occured, try again!`)
            }
    
            const embed = new MessageEmbed()
                .setTitle(`Random Meme: `)
                .setDescription(data.caption)
                .setColor('#f3f3f3')
                .setImage(data.image)
    
            await message.channel.send(embed)
        }
    }