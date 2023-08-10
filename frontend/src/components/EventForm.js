import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Modal,
  TextField,
  Box,
} from '@mui/material';
import apiService from '../services/apiService';

const timezones = [
  'UTC', 'America/New_York', 'Europe/London', // Add more timezones as needed
];

/**
 * Component for creating new events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.addEventToList - Function to add a new event to the list.
 */
function EventForm({ addEventToList }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [timezone, setTimezone] = useState('UTC'); // Default to UTC
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Opens the modal for creating an event.
   *
   * @function openModal
   */
  const openModal = () => {
    setIsModalOpen(true);
  };

  /**
   * Closes the modal for creating an event.
   *
   * @function closeModal
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setError(''); // Clear error when closing the modal
  };

  /**
   * Creates a new event and adds it to the list.
   *
   * @async
   * @function createEvent
   */
  const createEvent = async () => {
    try {
      if (name.length > 32) {
        setError('Event name cannot exceed 32 characters.');
        return;
      }
      if (new Date(start) >= new Date(end)) {
        setError('Start date must be before end date.');
        return;
      }

      await apiService.createEvent({ name, description, start, end, timezone });

      // Call the function to add the new event to the list
      addEventToList({
        name,
        description,
        start,
        end,
        timezone,
      });
      setName('');
      setDescription('');
      setStart('');
      setEnd('');
      setTimezone('');
      setError('');
      closeModal(); // Close the modal after creating the event
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={openModal}>Add Event</Button>
        </Grid>
      </Grid>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Modal Content */}
          <Typography variant="h5" gutterBottom>Create Event</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            label="Event Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline // Enable multiline
            rows={4} // Set the number of rows
          />
          <Box mb={2} /> {/* Add margin bottom for spacing */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField 
                type="datetime-local" 
                label="Start Date and Time" 
                fullWidth 
                value={start} 
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setStart(e.target.value)}
                inputProps={{
                  min: new Date().toISOString().slice(0, 16), // Set min attribute to current date and time
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                type="datetime-local" 
                label="End Date and Time" 
                fullWidth 
                value={end} 
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setEnd(e.target.value)}
                inputProps={{
                  min: new Date().toISOString().slice(0, 16), // Set min attribute to current date and time
                }}
              />
            </Grid>
          </Grid>
          <FormControl fullWidth margin="normal">
            <InputLabel
              sx={{ paddingTop: '0.1rem', background: 'white' }} // Adjust the styling as needed
              htmlFor="timezone-select"
            >
              Timezone
            </InputLabel>
            <Select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              labelId="timezone-select"
            >
              {timezones.map((tz) => (
                <MenuItem key={tz} value={tz}>
                  {tz}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={createEvent}>Create Event</Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default EventForm;
