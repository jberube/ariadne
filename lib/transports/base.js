const {levelValue} = require('../core');

module.exports = class BaseTransport {
    constructor(opts = {}) {
        this.opts = Object.assign({}, {
            level: null,
        }, opts);
        this.logger = null;
    }

    get level() {
        return this.opts.level || this.logger.level;
    }
    set level(value) {
        this.opts.level = value;
    }

    get levelValue() {
        return levelValue(this.level);
    }

    addLogEntry(level, ...args) {
        throw new Error('NotImplemented: implementations of BaseTransport must override "addLogEntry"');
    }

    pass(level) {
        return levelValue(level) >= this.levelValue;
    }

    close() {
        this.logger = null;
    }
}
