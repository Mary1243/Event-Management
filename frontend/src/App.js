import React from 'react';
import './styles/App.css'; // You can also include your own CSS styles here
import EventList from './components/EventList';

/**
 * The root component of the Event Management App.
 *
 * @function App
 * @returns {JSX.Element} - The JSX representation of the App component.
 */
function App() {
  return (
    <div className="App">
      <h1>Event Management App</h1>   
      <EventList />
    </div>
  );
}

export default App;


