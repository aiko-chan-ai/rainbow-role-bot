module.exports = async (client, index, token) => {
    const { Client, Intents } = require('discord.js');
    const client_ = new Client({
        intents: [Intents.FLAGS.GUILDS],
    }).on('ready', () => {
        console.log(`Bot ${client_.user.tag} is ready!`);
    });
    try {
        await client_.login(token);
        // await client_.application.fetch().then(a => console.log(a.owner.id))
        client.rainbow.set(parseInt(index), client_);
        return client_
    } catch (e) {
        console.log(e);
        return false;
    }
}