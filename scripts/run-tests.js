#!/usr/bin/env node
const path = require('path');

// Register test environment and tests
require(path.join(__dirname, '..', 'test', 'index.js'));

// Run scar tests programmatically with the bundled reporter
(async () => {
    const scar = require('scar');
    try {
        await scar.test.run({ reporter: require('scar/lib/reporter') });
    } catch (err) {
        console.error(err);
        process.exit(2);
    }
})();
