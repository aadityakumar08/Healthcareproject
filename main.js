// Import necessary modules
const express = require('express');
const path = require('path');

// Create an Express app
const app = express();

// Define a port number
const PORT = process.env.PORT || 8000;

// Serve static files (like your HTML, CSS, and images)
app.use(express.static(path.join(__dirname, '../HEALTHCARE-WEBSITE/style1.css')));

// Define a route to serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});