const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const figlet = require('figlet')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['dep'],
            description: 'deposit money in bank!',
            category: `${stinkybear} Economy`,

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
            console.log(args[0])
            if(args[0] !== "all" && isNaN(args[0])) return message.reply('not valid'); //deposit only accepts integers or string "all" which deposits all from the users wallet.
            const deposit = await eco.deposit(message.author.id, message.guild.id, args[0]);
            if(deposit.noten) return message.reply('You can\'t deposit what you don\'t have.'); //if user states more than whats in his wallet
            message.reply(`Deposited ${deposit.amount} to your bank.`)
            
        }
    }