const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const figlet = require('figlet')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['with'],
            description: 'withdraw money from ur bank account!',
            category: `${stinkybear} Economy`,
//WITHDRAW MONEY USING THSI COMMAND HUNT COMMAND COMING SOON!!!!
        })
    }
        async run(message, args) {
            const usedtimes = require('../../models/usedtimes');
            const usedconfig = await usedtimes.findOne({
                user: message.author.id
            })

            const num = await usedconfig.get("times")

            await usedconfig.updateOne({
                times: parseInt(num) + 1
            })
            eco.connect(mongoPath)
            if(args[0] !== "all" && isNaN(args[0])) return message.reply('not valid'); //withdraw only accepts integers or string "all" which deposits all from the users wallet.
            const withdraw = await eco.withdraw(message.author.id, message.guild.id, args[0]);
            if(withdraw.noten) return message.reply('You can\'t withdraw what you don\'t have.');  //if user tries withdraw more than whats in their wallet
            const em = new MessageEmbed()
            .setTitle(`**Successfully withdrawed money!**`)
            .setColor("GOLD")
            .setDescription("This is the command which you can withdraw the amount of money from your bank!")
            .addFields(
                {
                    name: `Withdrawn amount`,
                    value: withdraw.amount
                }
            )
            .setTimestamp()
            message.channel.send(message.author, em);
        }
    }