const tape = require('tape');

const ConsoleTransport = require('../../lib/transports/console');
const {VERBOSE, INFO, WARN, ERROR} = require('../../lib/core');
const {setupFakeConsole, resetConsole} = require('../tests-utils');

[
    { method: 'log', level: VERBOSE, args: 'test' },
    { method: 'log', level: INFO, args: 'test' },
    { method: 'warn', level: WARN, args: 'test' },
    { method: 'error', level: ERROR, args: 'test' },
].forEach(({method, level, args}) => {
    tape(`logs entry with level ${level} are logged using console.${method}`, t => {
        t.plan(1);

        const transport = new ConsoleTransport({ level: VERBOSE });
        const counts = setupFakeConsole();

        transport.addLogEntry(level, args);

        t.equal(counts[method], 1);
    });
});

resetConsole();
