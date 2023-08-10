import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventForm from './EventForm';

// Mock the apiService module for testing purposes
jest.mock('../services/apiService', () => ({
  createEvent: jest.fn(),
}));

describe('EventForm', () => {
  it('renders the form and handles input changes', () => {
    render(<EventForm />);

    const eventNameInput = screen.getByLabelText('Event Name');
    const descriptionInput = screen.getByLabelText('Description');
    const startInput = screen.getByLabelText('Start Date and Time');
    const endInput = screen.getByLabelText('End Date and Time');
    const timezoneInput = screen.getByLabelText('Timezone');

    fireEvent.change(eventNameInput, { target: { value: 'Test Event' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(startInput, { target: { value: '2023-08-10T10:00' } });
    fireEvent.change(endInput, { target: { value: '2023-08-10T12:00' } });
    fireEvent.change(timezoneInput, { target: { value: 'UTC' } });

    expect(eventNameInput.value).toBe('Test Event');
    expect(descriptionInput.value).toBe('Test Description');
    expect(startInput.value).toBe('2023-08-10T10:00');
    expect(endInput.value).toBe('2023-08-10T12:00');
    expect(timezoneInput.value).toBe('UTC');
  });

  // Add more test cases as needed
});
