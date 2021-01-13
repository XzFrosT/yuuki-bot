const Command = require('../../Structures/Command')
const {owner} = require('../../settings/emojis.json')
const User = require('../../models/user');

module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: [''],
			description: '',
            category: `${owner} Owner`,
            ownerOnly: true

		});
	}

    async run(message, args) {
const user = this.client.users.cache.get(args[0]);
if (!user) {
    return message.channel.send('You must input a **User ID**.');
}

const userData = await User.findOne({ User: user.id });
if (!userData) {
    const newUserData = new User({
        User: user.id,
        Blacklist: true
    });
    newUserData.save();
    return message.channel.send('The user was **added** to the blacklist data.');
} else if (userData.Blacklist === true) {
    userData.Blacklist = false;
    userData.save();
    return message.channel.send('The user was **removed** from the blacklist data.');
} else if (userData.Blacklist === false) {
    userData.Blacklist = true;
    userData.save();
    return message.channel.send('The user was **added** to the blacklist data.');
}
    }
}