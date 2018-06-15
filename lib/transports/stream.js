const BaseTransport = require('./base');

module.exports.StreamTransport = class StreamTransport extends BaseTransport {
    constructor(opts = {}, writableStream) {
        super(opts);
        this.stream = writableStream;
    }

    get encoding() {
        return this.opts.encoding || 'utf8';
    }
    set encoding(value) {
        this.opts.encoding = value;
    }

    addLogEntry(level, ...args) {
        if (!super.pass(level)) return false;

        const msg = this.logger.formatEntry({
            level,
            content: args
        });

        this.stream.write(`${level}: ${msg}\n`, this.encoding);

        return true;
    }

    close() {
        this.stream = null;
    }
}
