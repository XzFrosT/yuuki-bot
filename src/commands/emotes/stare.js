const Command = require('../../Structures/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const {beardance} = require('../../settings/emojis.json')


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['coronas'],
            description: 'this provides the corona rate limit for a country!',
            category: `${beardance} Emotes`
        });
    }

    async run(message, args) {
        const emotes = [
            'https://media.discordapp.net/attachments/763258869417377792/763261348679254016/tenor.gif',//https://media.discordapp.net/attachments/736472260541415457/736591542877421661/logo-square.png?width=20&height=20
            'https://media.discordapp.net/attachments/763258869417377792/763262078072651796/y.gif',
            'https://media.discordapp.net/attachments/763258869417377792/763262105938952222/z.gif',
            'https://media.discordapp.net/attachments/763258869417377792/763262079805161482/h.gif',
            'https://media.discordapp.net/attachments/763258869417377792/763262089094627328/tenor.gif',
        ]

        const emotives = emotes[Math.floor(Math.random() * emotes.length)]
        console.log(emotives) 
        const embed = new MessageEmbed()
        .setDescription(`@${message.author.username} Stares at @${message.mentions.users.first().username || message.mentions.members.first()}`)
        .setImage(emotives)
        message.channel.send(embed)
    }
}