require('dotenv').config();
const { Client, Collection } = require('discord.js');
const index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const config = require('./config.js');
const roleColorList = config.color;
let i = 1;
let roleColorIndex = 0;
let counting = 0;
const func = async (callback) => {
	console.log(`Logging in ${client.rainbow.size} Users ...`);
	if (client.rainbow.size !== index.length) {
		console.log(
			`${client.rainbow.size}/${index.length}, not enough users, retrying in 5 seconds ...`,
		);
		await new Promise((resolve) => setTimeout(resolve, 5000));
		callback(callback);
	} else {
		const user = client.rainbow.get(i);
		const server = user.guilds.cache.get(process.env.GUILDID);
		const role = await server.roles.fetch(process.env.ROLEID);
		if (!role) {
			console.log(
				`${server.name} has no role ${process.env.ROLEID}, retrying in 10 seconds ...`,
			);
		} else {
			role.setColor(roleColorList[roleColorIndex]).catch(console.log);
			roleColorIndex++;
			if (roleColorIndex == roleColorList.length) roleColorIndex = 0;
			console.log(
				`Setting color ${roleColorList[roleColorIndex]} to ${
					role.name
				}, Counting: ${++counting}, Setby ${i}: ${user.user.tag}`,
			);
			i++;
			if (i > index.length) i = 1;
		}
		await new Promise((resolve) => setTimeout(resolve, 10000));
		callback(callback);
	}
};

const client = new Client({
    intents: 32767
}).on('ready', () => {
    console.log(`Manager Bot ${client.user.tag} is ready!`);
    func(func);
});
client.rainbow = new Collection();
Promise.all(index.map(async (index) => {
    await require('./bot.js')(client, index, process.env[`TOKEN${index}`]);
}))
client.login(process.env.TOKEN);