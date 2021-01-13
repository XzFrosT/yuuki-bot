const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {bear4, stinkybear, beardance, anime} = require('../../settings/emojis.json')
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

            const url = `https://api.no-api-key.com/api/v1/punch?punch=${message.author.displayAvatarURL({ format: 'png'})}&punched=${user.user.displayAvatarURL({ format: 'png' })}`
    
            let response, data;
            try {
                response = await axios.get(url);
                data = response.data;
            } catch (e) {
                return message.channel.send(`An error occured!`)
            }
    
            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} was used in!`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`${message.author.username} has punched the user ${user.username} would have hurt so bad ${bear4}.`)
                .setImage(data.url)
                .setFooter(`${message.author.username} asked this`, message.author.displayAvatarURL({ dynamic: true }))
    
            await message.channel.send(embed)
        }
    }