// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/usersDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Define Mongoose schema
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

// Create Express app
const app = express();

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve signup form
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/singup.html');
});

// Handle signup POST request
// Serve signup form
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/singup.html');
});

// Handle signup POST request
app.post('/singup.html', async (req, res) => {
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
                <p>Click <a href="/login.html">here</a> to login.</p>
            `);
        })
        .catch(err => console.log(err))
});


// Serve login form
app.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Handle login POST request
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

// Start server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});