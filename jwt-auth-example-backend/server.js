const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'your_secret_key';

app.use(cors());
app.use(bodyParser.json());
// Fake user data for demonstration purposes
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Route for user login and JWT generation
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the fake user data array
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Generate and send the JWT token
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});