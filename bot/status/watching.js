const { Events, ActivityType } = require("discord.js");

/** @module CommandModule @type {KaskadeTypes.ActivityModule}*/
module.exports = {
    type: ActivityType.Watching,
    time: 2,
    async execute() {
        return "your waifus";
    }
}
