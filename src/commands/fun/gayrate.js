const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: '',
            category: `${angrybear} Fun`,

        })
    }
        async run(message, args) {
            const love = Math.random() * 100;
            const loveIndex = Math.floor(love / 10);
            const loveLevel = "🎁".repeat(loveIndex) + "📄".repeat(10 - loveIndex);
    
            const embed = new MessageEmbed()
                .setColor("#FC08BD")
                .addField(`☁ **${message.member.displayName}** is  ** ${Math.floor(love)}%** gay Today! **`,`\n\n${loveLevel}`);
    
            message.channel.send(embed);
        }//hunt for skulls and die in hell 
    }