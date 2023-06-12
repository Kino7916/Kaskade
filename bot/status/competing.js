const { Events, ActivityType } = require("discord.js");

/** @module CommandModule @type {KaskadeTypes.ActivityModule}*/
module.exports = {
    type: ActivityType.Competing,
    time: 5,
    async execute() {
        return "myself";
    }
}
