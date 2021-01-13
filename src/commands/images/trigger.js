const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {bear4} = require('../../settings/emojis.json')
const axios = require('axios')


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: '',
            category: `${bear4} Images`,

        })
    }
        async run(message, args) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            /*const url = ``
    
            let response, data;
            try {
                response = await axios.get(url);
                data = response.data;
            } catch (e) {
                return message.channel.send(`An error occured!`)
            }*///hut command needed
            
    
            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} was used in!`, message.guild.iconURL({ dynamic: true }))
                .setImage(`https://some-random-api.ml/canvas/triggered?avatar=${user.user.displayAvatarURL()}`)// hunt command working or  not soon!
                .setFooter(`${message.author.username} asked this`, message.author.displayAvatarURL({ dynamic: true }))
    
            await message.channel.send(embed)
        }
    }