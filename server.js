const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let users = [];

// Determine the data source based on the environment
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    const testDataPath = path.join(__dirname, 'data', 'test-users.json');
    users = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
    console.log('Using test data from JSON file');
} else {
    console.log('Using in-memory database');
}

// Read users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Create user
app.post('/api/users', (req, res) => {
    const newUser = {
        id: Date.now().toString(),
        username: req.body.username,
        email: req.body.email
    };
    users.push(newUser);
    res.json(newUser);
});

// Update user
app.put('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(user => user.id === req.params.id);
    if (userIndex > -1) {
        users[userIndex] = { ...users[userIndex], ...req.body };
        res.json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
    users = users.filter(user => user.id !== req.params.id);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
});