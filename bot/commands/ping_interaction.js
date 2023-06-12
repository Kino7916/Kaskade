const { Events } = require("discord.js");

/** @module CommandModule @type {KaskadeTypes.CommandModule<import("discord.js").Interaction>}*/
module.exports = {
    data: new ClientCommand()
    .setName("ping")
    .setDescription("A ping command")
    .setType(Events.MessageCreate)
    .setAsInteraction(),
    
    async execute(interaction) {
        interaction.reply(`Pong! ${interaction.client.ws.ping} ms.`);
    }
}
