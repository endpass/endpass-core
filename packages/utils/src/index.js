// Test utilities
const e2e = require('./test/e2e');

module.exports.test = {
  e2e,
};

// Plain utilities
module.exports.arrays = require('./arrays');
module.exports.asyncCheckProperty = require('./asyncCheckProperty');
module.exports.date = require('./date');
module.exports.getOptionParameter = require('./getOptionParameter');
module.exports.hex = require('./hex');
module.exports.keystore = require('./keystore');
module.exports.numbers = require('./numbers');
module.exports.objects = require('./objects');
module.exports.strings = require('./strings');
module.exports.serviceWorkers = require('./serviceWorkers');
// module.exports.build = require('./build'); // noo need in client, only for build
