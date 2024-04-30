// // Import required modules
// const express = require('express');
// const path = require('path');

// // Create an instance of Express app
// const app = express();

// // Define middleware to serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Define routes for each HTML file
// app.get('/donate', (req, res) => {
//     res.sendFile(path.join(__dirname, 'donate.html'));
// });

// app.get('/donor', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Donor.html'));
// });

// app.get('/emer', (req, res) => {
//     res.sendFile(path.join(__dirname, 'emer.html'));
// });

// app.get('/form', (req, res) => {
//     res.sendFile(path.join(__dirname, 'form.html'));
// });

// app.get('/health', (req, res) => {
//     res.sendFile(path.join(__dirname, 'health.html'));
// });

// app.get('/', (req, res) => {
//     // For index.html, also include the links to CSS files
//     const indexFilePath = path.join(__dirname, 'index.html');
//     const styleCssPath = path.join(__dirname, 'style.css');
//     const style1CssPath = path.join(__dirname, 'style1.css');
//     const cssLinks = `<link rel="stylesheet" type="text/css" href="${styleCssPath}">
//                       <link rel="stylesheet" type="text/css" href="${style1CssPath}">`;
//     // Read the index.html file
//     fs.readFile(indexFilePath, 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).send('Error loading index.html');
//         }
//         // Inject CSS links into index.html
//         const modifiedHtml = data.replace('</head>', `${cssLinks}</head>`);
//         res.send(modifiedHtml);
//     });
// });

// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Serve static files from the 'images' directory
const imagesPath = path.join(__dirname, "Img");
app.use('/Img', express.static(imagesPath));

// Serve static files from the 'new' directory
const staticPath = path.join(__dirname, "new");
app.use(express.static(staticPath));

// Serve static files from the 'emer' directory
const emerPath = path.join(__dirname, "emer");
app.use('/emer', express.static(emerPath));

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/healthCareDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define Mongoose schema for blood donations
const donationSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  bloodgroup: String,
  total: Number,
  age: Number,
  gender: String
});

const Donation = mongoose.model('Donation', donationSchema);

// Routes for blood donation
app.get('/donate', (req, res) => {
  res.sendFile(path.join(__dirname, 'donate.html'));
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
    res.status(500).send('Internal Server Error');
  }
});

// Define Mongoose schema for user registration
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// Routes for user registration (signup)
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/signup', async (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save()
        .then(() => {
            res.send(`
                <h2>User registered successfully!</h2>
                <p>Click <a href="/login">here</a> to login.</p>
            `);
        })
        .catch(err => console.log(err))
});

// Routes for user login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email, password: password })
        .then(user => {
            if (user) {
                res.send("Welcome " + user.firstname + " " + user.lastname);
            } else {
                res.status(401).send('Invalid email or password');
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

// Define Mongoose schema for appointments
const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctor: String,
  date: Date
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Routes for appointments
app.get('/appointment', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

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

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});

