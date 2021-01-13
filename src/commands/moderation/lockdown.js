const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {moderation} = require('../../settings/emojis.json')
const DisabledCommands = require('../../models/disable');

const validateFlag = f => f === 'true' || f === 'false' || f === 'null';
const IGNORED = new Set([
  // PLACE YOUR CHANNEL IDS HERE
]);
module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: ['enable-command'],
            description: 'enable commands using this command!',
			category: `${moderation} Moderation`,
		});
	}

    async run(message, args) {

        let roleId = args[0]
        let flag = args[1]
      if(!isNaN(roleId) && validateFlag(flag.toLowerCase())) {
        if(message.guild.roles.cache.has(roleId)) {
          flag = flag.toLowerCase() === 'true' ? true : (flag.toLowerCase() === 'false' ? false : null);
          const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
          channels.forEach(channel => {
            if(!IGNORED.has(channel.id)) {
              channel.updateOverwrite(roleId, {
                SEND_MESSAGES: !flag
              }).then(g => {
                console.log(`Updated ${g.name} (${g.id})`); 
                if(flag) {
                  if(!g.name.endsWith('🔒')) {
                    g.edit({ name: g.name + ' 🔒'});
                  }
                } else {
                  g.edit({ name: g.name.replace(/\s*🔒/, '')});
                }
              })
              .catch(err => console.log(err));
            } else {
              console.log(`Skipping ${channel.name} (${channel.id})`);
            }
          });
        }
        else {
          message.channel.send('Invalid Role.');
        }
      }
    }
}