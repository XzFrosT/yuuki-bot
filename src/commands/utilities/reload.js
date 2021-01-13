const {fun} = require('../../settings/emojis.json')
const Command = require('../../Structures/Command');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'This provides the ping of the bot',
            category: `${fun} Utilities`,
            ownerOnly: true
		});
	}

	async run(message, args) {
        let cmd = args[0];
        if(!cmd) {
            let noCMD = new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Please enter the command name for reload!`)
            .setTimestamp();
            return message.channel.send(noCMD);
        }
        
        let command = this.bot.commands.get(cmd) || this.bot.commands.get(this.bot.aliases.get(cmd));
        
        if(command) {
            delete require.cache[require.resolve(`../${command.category}/${ucFirst(command.name)}.js`)];
        
            const File = require(`../${command.category}/${ucFirst(command.name)}.js`);
            const Command = new File(this.bot, command.name.toLowerCase());
        
            this.bot.commands.delete(command.name);
            await this.bot.commands.set(command.name, Command);
        
            let restartedCMD = new MessageEmbed()
            .setColor("DARK-BLUE")
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Command **${command.name}** has been restarted!`)
            .setTimestamp();
            return message.channel.send(restartedCMD);
        }else {
            let notFound = new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Could not find command named **${cmd}**!`)
            .setTimestamp();
            return message.channel.send(notFound);
        }
        
        function ucFirst(str) {
            if(!str) return str;
            return str[0].toUpperCase() + str.slice(1);
        }
    }
}