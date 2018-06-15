module.exports.VERBOSE = 'VERBOSE';
module.exports.INFO = 'INFO';
module.exports.WARN = 'WARN';
module.exports.ERROR = 'ERROR';
module.exports.DEFAULT_LEVEL = module.exports.INFO;
module.exports.LEVELS = {
    VERBOSE: module.exports.VERBOSE,
    INFO: module.exports.INFO,
    WARN: module.exports.WARN,
    ERROR: module.exports.ERROR,
    DEFAULT_LEVEL: module.exports.DEFAULT_LEVEL,
};

module.exports.LEVEL_VALUES = {
    VERBOSE: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
};

module.exports.levelValue = function levelValue(level) {
    return module.exports.LEVEL_VALUES[level] || '0';
};
