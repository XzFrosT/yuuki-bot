const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {owner} = require('../../settings/emojis.json');
const premiumuser = require('../../models/premiumuser');

module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: ['premium'],
			description: '',
			category: `${owner} Owner`,
		});
	}

    async run(message, args) {
        if(args[0] === "user") {
           const user = message.mentions.users.first().id

           premiumuser.findOne({}, (err, res) => {
               if(err) throw err;
               const newe = new premiumuser({
                   user: user
               }).save()
               message.channel.send(`Added premium to that user!`)
               console.log(newe)
           })
        }//now its time to check premium user :_|
    }
}