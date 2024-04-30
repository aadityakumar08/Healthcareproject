const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');

const app = express();
const staticPath = path.join(__dirname, "index.html");

// Middleware setup
app.use(cookieParser());
app.use(session({
  secret: "your-secret-key", // Change this to a random string
  resave: false,
  saveUninitialized: true,
}));

// Serve static files
app.use(express.static(staticPath));

// Define route for form submission
app.post("/formprocess", (req, res) => {
  // Retrieve form data from request body
  const { fname, lname, gender, city, address, password, agree } = req.body;

  // Store form data in session
  req.session.formData = { fname, lname, gender, city, address, password, agree };

  // Redirect user to another page or do other processing
  res.redirect("/thankyou"); // Redirect to a thank you page
});

// Define route to serve the HTML form
app.get("/form", (req, res) => {
  res.sendFile(path.join(staticPath, "form.html"));
});

// Define route to serve the thank you page
app.get("/thankyou", (req, res) => {
  // Retrieve form data from session
  const formData = req.session.formData || {};

  // Render thank you page with form data
  res.send(`Thank you, ${formData.fname}, for submitting the form!`);
});

// Start the server
app.listen(5001, () => {
  console.log("Server is running on port 3000");
});


