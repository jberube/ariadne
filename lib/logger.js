const { inspect } = require('util');
const {LEVELS} = require('./core');

const ConsoleTransport = require('./transports/console');

const DEFAULT_OPTIONS = {
    level: LEVELS.INFO,
    transports: [],
};

module.exports = class Logger {
    constructor(opts = {}) {
        this.opts = Object.assign({}, DEFAULT_OPTIONS, opts);
        if (this.opts.transports.length === 0) {
            this.opts.transports = [new ConsoleTransport()];
        }
        this.opts.transports.forEach(transport => transport.logger = this);
        this.closed = false;
    }

    get level() {
        return this.opts.level || LEVELS.DEFAULT_LEVEL;
    }
    set level(value) {
        this.opts.level = value;
    }

    get levelValue() {
        return levelValue(this.level);
    }

    get transports() {
        return this.opts.transports;
    }

    addLogEntry(level, ...args) {
        if (this.closed) {
            throw new Error('Logger has been closed.');
        }

        this.transports.forEach(transport => transport.addLogEntry(level, ...args));
    }

    addTransport(transport) {
        this.transports.push(transport);
        transport.logger = this;
    }

    close() {
        this.transports.forEach(transport => transport.close());
        this.transports = [];
        this.closed = true;
    }

    // 1 - VERBOSE LEVEL
    verbose(...args) {
        this.addLogEntry(LEVELS.VERBOSE, ...args);
    }

    // 2 - NORMAL LEVEL
    info(...args) {
        this.addLogEntry(LEVELS.INFO, ...args);
    }

    log(...args) {
        this.info(...args);
    }

    // 3 - WARN LEVEL
    warn(...args) {
        this.addLogEntry(LEVELS.WARN, ...args);
    }

    // 4 - ERROR LEVEL
    error(...args) {
        this.addLogEntry(LEVELS.ERROR, ...args);
    }

    debug(...args) {
        this.error(...args);
    }

    // UTILS
    formatEntry(entry) {
        const content = Array.isArray(entry.content) ?
            entry.content.map(c => inspect(c)) :
            inspect(entry.content);
        return `${entry.level}: ${content}`;
    }
}
