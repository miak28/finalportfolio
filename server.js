const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


// Route to handle the form submission
app.post('/submit-form', (req, res) => {
    // You can log the form data here if you want to
    console.log(req.body);

    // Send back a thank-you message
    res.send('Thank you for contacting me! Your message has been received.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});