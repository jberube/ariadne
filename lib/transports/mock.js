const BaseTransport = require('./base');

module.exports = class MockTransport extends BaseTransport {
    constructor(opts) {
        super(opts);
        this.calls = [];
    }

    addLogEntry(level, ...args) {
        this.calls.push({level, args});
    }

    getCalls(level = null) {
        return level === null ?
            this.calls.reduce((calls, call) => calls.concat(call), []) :
            this.calls.filter(call => call.level === level);
    }

    reset() {
        this.calls = [];
    }
}
