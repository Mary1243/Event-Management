import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import apiService from '../services/apiService';
import moment from 'moment'; // Use moment library for date formatting
import EventForm from './EventForm';

/**
 * Component for displaying a list of events.
 *
 * @component
 */
function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  /**
   * Fetches the list of events from the API.
   *
   * @async
   * @function fetchEvents
   */
  const fetchEvents = async () => {
    try {
      const fetchedEvents = await apiService.getEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  /**
   * Adds a new event to the list of events.
   *
   * @function addEventToList
   * @param {Object} newEvent - The event to add to the list.
   */
  const addEventToList = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <EventForm addEventToList={addEventToList} />
      <Container>
        <Box my={2}>
          <Typography variant="h4" gutterBottom>
            Events
          </Typography>
        </Box>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {events.length === 0 ? (
            <Typography variant="subtitle1">No events available.</Typography>
          ) : (
            events.map((event, index) => (
              <Paper
                key={index}
                elevation={3}
                style={{ flex: '0 0 calc(30.33% - 1rem)', width: 'calc(30.33% - 1rem)', padding: '1rem' }}
              >
                <Box>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography variant="body1">{event.description}</Typography>
                  <Typography variant="body2">
                    Start: {moment(event.start).format('MMMM D, YYYY h:mm A')}
                  </Typography>
                  <Typography variant="body2">
                    End: {moment(event.end).format('MMMM D, YYYY h:mm A')}
                  </Typography>
                </Box>
              </Paper>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default EventList;
