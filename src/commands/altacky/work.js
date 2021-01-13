const {MessageEmbed} = require('discord.js')
const Command = require('../../Structures/Command')
const {shook} = require('../../settings/emojis.json')
const eco = require("discord-mongoose-economy")
const travel = require("../../models/travel")
module.exports = class extends Command {
    
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: ``,
            category: `${shook} Flight`,
        });
    }

    async run(message, args) {
       const a = [1,2,3]
       const b = a[Math.floor(Math.random()* a.length)]
       
       if(b == 1) {
           message.channel.send("test")
       } else if(b == 2) {
           message.channel.send("test 2")
       } else if(b == 3) {
           message.channel.send("test 3")
       }
    }
}