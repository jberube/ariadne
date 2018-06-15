const tape = require('tape');

const Logger = require('../lib/logger');
const {ConsoleTransport, MockTransport} = require('../lib/transports');
const {LEVELS} = require('../lib/core');

tape('default transport', t => {
    t.plan(2);

    const logger = new Logger();
    t.equal(logger.transports.length, 1, 'should have a default transport');
    t.ok(logger.transports[0] instanceof ConsoleTransport, 'default transport is `Console Transport`');
});

tape('accepts multiple transports in options', t => {
    t.plan(3);

    const tr1 = new MockTransport(), tr2 = new MockTransport();

    logger = new Logger({ transports: [tr1, tr2] });

    t.equal(logger.transports.length, 2);
    t.equal(logger.transports[0], tr1);
    t.equal(logger.transports[1], tr2);
});

[
    { method: 'verbose', level: LEVELS.VERBOSE },
    { method: 'log', level: LEVELS.INFO },
    { method: 'info', level: LEVELS.INFO },
    { method: 'warn', level: LEVELS.WARN },
    { method: 'error', level: LEVELS.ERROR },
    { method: 'debug', level: LEVELS.ERROR },
].forEach(test => {
    tape(`${test.method} logs to multiple transports using verbosity level ${test.level}`, t => {
        t.plan(4);

        const tr1 = new MockTransport(),
            tr2 = new MockTransport();
        logger = new Logger({
            transports: [tr1, tr2],
        });

        logger[test.method]('should be logger to both transports');
        t.equal(tr1.getCalls().length, 1);
        t.equal(tr1.getCalls(test.level).length, 1);
        t.equal(tr2.getCalls().length, 1);
        t.equal(tr2.getCalls(test.level).length, 1);
    });
});
