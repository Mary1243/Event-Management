import axios from 'axios';

const API_URL = 'http://localhost:3001/api/events';

/**
 * Creates a new event.
 *
 * @function createEvent
 * @param {Object} eventData - Data of the event to be created.
 * @throws {Error} If an error occurs while creating the event.
 */
const createEvent = async (eventData) => {
  try {
    await axios.post(API_URL, eventData);
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieves a list of events.
 *
 * @function getEvents
 * @returns {Promise<Array>} A promise that resolves with the list of events.
 * @throws {Error} If an error occurs while fetching events.
 */
const getEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * API service for managing events.
 */
const apiService = {
  createEvent,
  getEvents,
};

export default apiService;
