// Import required modules
const express = require('express');
const path = require('path');

// Create an instance of Express app
const app = express();

// Define middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
// Example route for appointment.html
app.get('/appointment', (req, res) => {
    res.sendFile(path.join(__dirname, 'appointment.html'));
});

// Example route for checkup.html
app.get('/checkup', (req, res) => {
    res.sendFile(path.join(__dirname, 'checkup.html'));
});

// Define other routes as needed...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
