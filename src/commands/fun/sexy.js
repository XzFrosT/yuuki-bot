const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const Random = require('srod-v2')
const {angrybear} = require('../../settings/emojis.json')


module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['sexyy'],
            description: 'find ur sexy rate!',
            category: `${angrybear} Fun`,

        })
    }
        async run(message, args) {
            const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new MessageEmbed()
            .setColor("#FC08BD")
            .addField(`☁ **${message.member.displayName}** is  **💟 ${Math.floor(love)}%** Sexy Today! **`,`\n\n${loveLevel}`);

        message.channel.send(embed);
        }
    }