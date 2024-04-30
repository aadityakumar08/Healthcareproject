// 1. Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// 2. Create Express app
const app = express();

// 3. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/appointmentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// 4. Define Mongoose schema
const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctor: String,
  date: Date
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// 5. Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// 6. Routes
// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

// Handle form submission with async/await for cleaner error handling
app.post('/formprocess', async (req, res) => {
  try {
    const newAppointment = new Appointment({
      patientName: req.body.patientName,
      doctor: req.body.doctor,
      date: req.body.date
    });
    await newAppointment.save();
    res.send('Appointment booked successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error booking appointment');
  }
});

// 7. Route to display data (optional)
// Assuming you want to display all appointments on a separate route
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    // You can further process or format the data before sending it to the client
    res.send(appointments); // Send the array of appointments
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving appointments');
  }
});

// 8. Start server
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





