const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

/**
 * @route GET /events
 * @description Get a list of events.
 * @returns {Object[]} - List of events.
 * @throws {Error} - If there's an internal server error.
 */
router.get('/', eventController.listEvents);

/**
 * @route POST /events
 * @description Create a new event.
 * @param {string} req.body.name - The name of the event.
 * @param {string} req.body.description - The description of the event.
 * @param {string} req.body.start - The start date and time of the event.
 * @param {string} req.body.end - The end date and time of the event.
 * @param {string} req.body.timezone - The timezone of the event.
 * @returns {Object} - Success message.
 * @throws {Error} - If the input data is invalid or there's an internal server error.
 */
router.post('/', eventController.createEvent);

module.exports = router;




