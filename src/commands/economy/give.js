const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['lend'],
            description: 'Give people money as much as you like!',
            category: `${stinkybear} Economy`,
            ratelimit: {//limit for each command!
                bucket: 1,
                reset: 30 * 1000,
                stack: false,
            },

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
            const user = message.mentions.users.first()//mention for the user

            if(!user){
                return message.reply(`Hmm... could you ping the user you want to give!`)//if user isnt mentioned this will be triggered
            }

            const amount = args[1]//amount which the user wil be mentioning !
            console.log(args[1])//tsting whether the user mentioned the amount!

            if(!args[1]){
                return message.reply(`with not amount you can give ppl duh! usage: m!give <usermention> <amount>`)//if user didnt mention any amount this will be triggered
            }

            const balance = await eco.balance(message.author.id, message.guild.id)

            if(balance.wallet < amount){
                return message.channel.send(`Are u sure you have that much cash in your wallet -_-!`)//if user has the amount in there wallet!
            }

            eco.give(user.id, message.guild.id, amount);//gives the amount for user
            eco.deduct(message.author.id, message.guild.id, amount);//deducts the amount for the author

            message.channel.send(`You have given ${amount} to ${user}!`)//message at last!
        }
    }
