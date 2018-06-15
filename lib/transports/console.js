const {LEVELS} = require ('../core');
const BaseTransport = require('./base');

module.exports = class ConsoleTransport extends BaseTransport {
    constructor(opts = {}) {
        super(opts);
    }

    addLogEntry(level, ...args) {
        if (!super.pass(level)) return false;

        switch (level) {
            case LEVELS.VERBOSE:
                console.log(...args);
                break;
            case LEVELS.INFO:
                console.log(...args);
                break;
            case LEVELS.WARN:
                console.warn(...args);
                break;
            case LEVELS.ERROR:
                console.error(...args);
                break;
            default:
                console.log(...args);
                break;
        }

        return true;
    }
}
