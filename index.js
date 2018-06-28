module.exports = require('./lib/core');

module.exports.BaseTransport = require('./lib/transports/base');
module.exports.ConsoleTransport = require('./lib/transports/console');
module.exports.StreamTransport = require('./lib/transports/stream');
module.exports.MockTransport = require('./lib/transports/mock');

module.exports.Ariane = module.exports.Logger = require('./lib/logger');
