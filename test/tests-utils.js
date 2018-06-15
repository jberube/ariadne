const consoleMethods = ['log', 'warn', 'error'];

const originalMethods = consoleMethods.reduce((acc, m) => {
    acc[m] = console[m];
    return acc;
}, {});

module.exports.setupFakeConsole = function setupFakeConsole() {
    const counts = {};
    consoleMethods.forEach(methodName => {
        counts[methodName] = 0;
        console[methodName] = () => counts[methodName]++;
    });
    return counts;
}

module.exports.resetConsole = function () {
    Object.entries(originalMethods).map(entry => console[entry[0]] = entry[1]);
};
