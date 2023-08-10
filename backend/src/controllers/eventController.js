const moment = require('moment-timezone');
const events = require('../models/eventModel');
const { isValidTimezone } = require('../utils/timeUtils');

/**
 * Create a new event.
 *
 * @route POST /api/events
 * @param {string} req.body.name - Name of the event.
 * @param {string} req.body.description - Description of the event.
 * @param {string} req.body.start - Start date and time of the event.
 * @param {string} req.body.end - End date and time of the event.
 * @param {string} req.body.timezone - Timezone of the event.
 * @returns {Object} - Response object with a message indicating success or failure.
 */
exports.createEvent = (req, res) => {
  const { name, description, start, end, timezone } = req.body;
  const startMoment = moment.tz(start, timezone);
  const endMoment = moment.tz(end, timezone);

  if (!startMoment.isValid() || !endMoment.isValid() || !isValidTimezone(timezone)) {
    return res.status(400).json({ message: 'Invalid input data.' });
  }

  events.push({
    name,
    description,
    start: startMoment.toISOString(),
    end: endMoment.toISOString(),
    timezone,
  });

  res.status(201).json({ message: 'Event created successfully.' });
};

/**
 * Get a list of all events.
 *
 * @route GET /api/events
 * @returns {Object[]} - Array of event objects.
 */
exports.listEvents = (req, res) => {
  try {
    res.status(200).json(events);
  } catch (error) {
    console.error('Error in listEvents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
