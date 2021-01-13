const Command = require('../../Structures/Command')
const Discord = require('discord.js')
const {bear4} = require('../../settings/emojis.json')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: '',
            category: `${bear4} Images`,

        })
    }
        async run(message, args) {
            const question = args.join(" ");
    if (!question) {
        const errorembed = new Discord.MessageEmbed()
            .setColor(`#ff0000`)
            .setTimestamp()
            .setDescription(`<a:wrongggg:755042144539902013>** | Please type something after the command!**`)
            .setFooter('use "-invite" to invite me!');
        return message.channel.send(errorembed)
    } else {
        const loadingEmbed = new Discord.MessageEmbed()
            .setColor("#ffb640")
            .setDescription(`**<a:load:751007122388418600> Generating your Logo!...**`)
        let msg = await message.channel.send(loadingEmbed)
        const encodedQuestion = question.replace(/[' '_]/g, "+");
        const cat = new Discord.MessageEmbed()
            .setColor('#ffb640')
            .setTitle('Link to your logo!')
            .setURL(`https://dynamic.brandcrowd.com/asset/logo/362270db-6933-4ccc-8c11-25b2fe97f023/logo?v=4&text=${encodedQuestion}`)
            .setImage(`https://dynamic.brandcrowd.com/asset/logo/362270db-6933-4ccc-8c11-25b2fe97f023/logo?v=4&text=${encodedQuestion}`)
            .setTimestamp()
            .setFooter('use "-invite" to invite me!', 'https://i.imgur.com/2ag2QWP.pngs');
        msg.edit(cat);
        }
    }
}