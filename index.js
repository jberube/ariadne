module.exports = require('./lib/core');

const transports = require('./lib/transports');
Object.entries(transports).forEach(entry => {
    module.exports[entry[0]] = entry[1];
});

module.exports.Ariane = module.exports.Logger = require('./lib/logger');
