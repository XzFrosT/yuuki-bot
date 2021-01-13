const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {moderation} = require('../../settings/emojis.json')
const DisabledCommands = require('../../models/disable');
//i never tried sql, its hard.. ikr
module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: ['disable-command'],
            description: 'disable commands using this command!',
            args: 1,
			category: `${moderation} Moderation`,
		});
	}

    async run(message, args) {
        let command = this.client.commands.get(args[0].toLowerCase());

        const disabledCommands = await DisabledCommands.findOne({ guildId: message.guild.id });

        if(!disabledCommands) {
            const dbc = await DisabledCommands.create({
                guildId: message.guild.id
            });

            dbc.save();
        }
        
        let commandDB = await disabledCommands.get('commands');
        let check = await commandDB.find(c => c == command.name);

        if(check) {
            return message.reply('The command is already disabled')
        } else {
            commandDB.push(command.name);
            disabledCommands.save();
            message.reply('The command '+command.name+' has been disabled.');
        }

        console.log(disabledCommands)
    }

}