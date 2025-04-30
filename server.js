const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const usersFilePath = path.join(__dirname, 'users.json');

// Ensure users.json exists
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, '[]');
}

// Read users
app.get('/api/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath));
    res.json(users);
});

// Create user
app.post('/api/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath));
    const newUser = {
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
    res.json(newUser);
});

// Update user
app.put('/api/users/:id', (req, res) => {
    let users = JSON.parse(fs.readFileSync(usersFilePath));
    const userIndex = users.findIndex(user => user.id === req.params.id);
    if (userIndex > -1) {
        users[userIndex] = { ...users[userIndex], ...req.body };
        fs.writeFileSync(usersFilePath, JSON.stringify(users));
        res.json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
    let users = JSON.parse(fs.readFileSync(usersFilePath));
    users = users.filter(user => user.id !== req.params.id);
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});