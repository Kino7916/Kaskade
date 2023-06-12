const { Events } = require("discord.js");

class ClientEvent {
    /** @type {Map<Events, Set<KaskadeTypes.EventModule>} */
    static REGISTERED_EVENTS = new Map();
    constructor() {
        /** @type {Events} */
        this.type = Events.ClientReady;
        /** @type {boolean} */
        this.once = false;
    }

    /**
     * 
     * @param {Events} event 
     */
    setEvent(event) {
        this.type = event;
        return this;
    }

    onlyOnce() {
        this.once = true;
        return this;
    }

    /**
     * 
     * @param {KaskadeTypes.EventModule} ev 
     */
    static addEvent(ev) {
        let events = ClientEvent.REGISTERED_EVENTS.get(ev.data.type);
        if (!events) {
            events = new Set();
            this.createEventHandler(ev.data.type);
            Kaskade.log.print(`Created event handler for '${ev.data.type}'`);
        }

        events.add(ev);
        ClientEvent.REGISTERED_EVENTS.set(ev.data.type, events);
    }

    /**
     * 
     * @param {Events} event 
     */
    static createEventHandler(event) {
        Kaskade.client.on(event, (...data) => {
            const getEvents = this.REGISTERED_EVENTS.get(event);
            getEvents.forEach(async x => {
                if (x.data.once) getEvents.delete(x);
                x.execute(...data);
            })
        });
        // switch (event) {
        //     case Events.ClientReady: {
        //         Kaskade.client.on("ready", async () => {
        //             const getEvents = this.REGISTERED_EVENTS.get(Events.ClientReady);
        //             getEvents.forEach(x => x.execute());
        //         });
        //     }
        //     break;
        //     default: throw new Error(`Unimplemented support for event handler '${event}'!`);
        // }
    }
}

module.exports = ClientEvent;