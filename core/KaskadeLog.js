class KaskadeLog {
    constructor(options) {
        /** @type {string} */
        this.name = options.name || "KaskadeCore";
        this.color = options.color;
        /** @type {boolean} */
        this.verbose = options.verbose;
    }

    print(message) {
        console.info(this.formatMessage(message))
    }

    formatMessage(message, level) {
        return `[${this.name}] ${message}`; /** temp */
    }
}

module.exports = KaskadeLog;