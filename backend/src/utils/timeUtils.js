const moment = require('moment-timezone');

/**
 * Check if a given timezone is valid.
 *
 * @param {string} timezone - The timezone to validate.
 * @returns {boolean} - `true` if the timezone is valid, otherwise `false`.
 */
exports.isValidTimezone = (timezone) => {
  return moment.tz.names().includes(timezone);
};

