module.exports = require('./lib/core');

const transports = require('./lib/transports');
Object.keys(transports).forEach(key => {
    module.exports[key] = transports[key];
});

module.exports.Ariane = module.exports.Logger = require('./lib/logger');
