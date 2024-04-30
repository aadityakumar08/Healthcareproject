// 1. Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// 2. Create Express app
const app = express();

// 3. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bloodDonationDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// 4. Define Mongoose schema
const donationSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  bloodgroup: String,
  total: Number,
  age: Number,
  gender: String
});

const Donation = mongoose.model('Donation', donationSchema);

// 5. Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// 6. Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/donate.html');
});

app.post('/formprocess', async (req, res) => {
  try {
    const newDonation = new Donation({
      fullname: req.body.fullname,
      email: req.body.email,
      bloodgroup: req.body.bloodgroup,
      total: req.body.total,
      age: req.body.age,
      gender: req.body.gender
    });
    await newDonation.save();
    res.send('Data saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); // Inform user about the error
  }
});

// 7. Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





