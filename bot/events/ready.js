const { Events } = require("discord.js");

/** @module CommandModule @type {KaskadeTypes.EventModule<Events.ClientReady>}*/
module.exports = {
    data: new ClientEvent()
    .setEvent(Events.ClientReady),
    
    async execute(i) {
        console.log("Client is ready from ready.js!");
    }
}
