const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');
const slotItems = ["🍕","🍔","🍟","🥓","🥚","🧇","🧀"]

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: 'Check your balance!... FUN FACT [ This economy system is for each server seperate! ]',
            category: `${stinkybear} Economy`,
            ratelimit: {//limit for each command!
                bucket: 1,
                reset: 10 * 1000,
                stack: false,
            },

        })
    }
        async run(message, args) {
            let win = false;
            let money = parseInt(args[0]);
            
            let number = []
            let i;
            for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

            if (number[0] == number[1] && number[1] == number[2]) { 
                money *= 9
                win = true;
            } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
                money *= 2
                win = true;
            }

            if (win) {
                let slotsEmbed1 = new MessageEmbed()
                    .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won coins`)
                    .setColor("#FFFFFF")
                message.channel.send(slotsEmbed1)
            } else {
                let slotsEmbed = new MessageEmbed()
                    .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost coins`)
                    .setColor("#FFFFFF")
                message.channel.send(slotsEmbed)
            }
        }
    }