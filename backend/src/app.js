const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Use the event routes for handling event-related requests
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
   
  });

  
