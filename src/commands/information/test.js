const { formatDate } = require("../../../functions");
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const {help} = require('../../settings/emojis.json')

module.exports = class extends Command{
    constructor(...args) {
		super(...args, {
            aliases: ['inst'],
            description: 'Woohoo insta online!',
            category: `${help} Information`
		});
	}
    
    async run( message, args) {
        let pages = [`hehe embedp ages looks awwwwwwwwwwwwwwsooooooomeeeee`, 'page two', 'seems it works!'];
        let page = 1;

        const embed = new MessageEmbed()
        .setColor("ffffff")
        .setFooter(`Page ${page} of ${pages.length}`)
        .setDescription(pages[page-1])

        message.channel.send(embed) .then(msg => {
            msg.react('⏪').then(r => {
                msg.react('⏩')

                const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
                const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

                const backwards = msg.createReactionCollector(backwardsFilter, {time: 60000});
                const forwards = msg.createReactionCollector(forwardsFilter, {time: 60000})

                backwards.on('collect', r => {
                    if(page === 1) return;
                    page--;
                    embed.setDescription(pages[page-1]);
                    embed.setFooter(`Page ${page} of ${pages.length}`)
                    msg.edit(embed)
                })
                
                forwards.on('collect', r => {
                    if(page === pages.length) return;
                    page++;
                    embed.setDescription(pages[page-1]);
                    embed.setFooter(`Page ${page} of ${pages.length}`)
                    msg.edit(embed)
                })
            })
        })
    }
}