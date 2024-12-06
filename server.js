const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle the form submission
app.post('/submit-form', (req, res) => {
    // Get form data
    const { name, email, message } = req.body;

    // Create a new submission object
    const submission = {
        name: name,
        email: email,
        message: message,
        date: new Date().toISOString() // Include submission date
    };

    // Save submission to a JSON file (you can use a text file if you prefer)
    fs.readFile('submissions.json', (err, data) => {
        if (err && err.code === 'ENOENT') {
            // If the file does not exist, create a new array for submissions
            fs.writeFile('submissions.json', JSON.stringify([submission], null, 2), (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    res.status(500).send('Error saving your message.');
                    return;
                }
                res.send('Thank you for contacting me! Your message has been received.');
            });
        } else if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error saving your message.');
            return;
        } else {
            // If the file exists, append the new submission
            const submissions = JSON.parse(data);
            submissions.push(submission);

            // Save updated submissions to the file
            fs.writeFile('submissions.json', JSON.stringify(submissions, null, 2), (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    res.status(500).send('Error saving your message.');
                    return;
                }
                res.send('Thank you for contacting me! Your message has been received.');
            });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
