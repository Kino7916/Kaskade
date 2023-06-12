const { Events } = require("discord.js");

/** @module CommandModule @type {KaskadeTypes.CommandModule}*/
module.exports = {
    data: new ClientCommand()
    .setName("ping")
    .setDescription("A ping command")
    .setType(Events.MessageCreate),
    
    async execute(message) {
        interaction.reply(`Pong! ${interaction.client.ws.ping} ms.`);
    }
}
