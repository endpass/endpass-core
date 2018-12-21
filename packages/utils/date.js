const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

/**
 * Setting up dayjs globally
 */
dayjs.extend(relativeTime);

module.exports.formateDate = date => dayjs(date).format('YYYY-MM-DD H:mm');

module.exports.fromNow = date => dayjs(date).fromNow();
