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
    Object.keys(originalMethods).map(key => console[key] = originalMethods[key]);
};
