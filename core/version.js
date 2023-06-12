class Version {
    constructor() {
        /** @type {number} */
        this.majorVersion = 0;
        /** @type {number} */
         this.minorVersion = 0;
        /** @type {number} */
        this.buildVersion = 1;

        /** @type {string} */
        this.versionType = "release"
    }

    setMajor(version) {
        this.majorVersion = version;
        return this;
    }

    setMinor(version) {
        this.minorVersion = version;
        return this;
    }

    setBuild(version) {
        this.buildVersion = version;
        return this;
    }

    setType(type) {
        this.versionType = type;
        return this;
    }

    toString() {
        return `${this.majorVersion}.${this.minorVersion}.${this.buildVersion}` + 
        (this.versionType ? "-" + this.versionType : "");
    }
}

module.exports.Version = Version;

module.exports = {
    core_version: new Version()
        .setMinor(2)
        .setBuild(1)
        .setType("alpha")
        .toString()
}