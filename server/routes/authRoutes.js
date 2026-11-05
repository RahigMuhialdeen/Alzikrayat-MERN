const express = require('express');

const router = express.Router();

// Registration Route
router.post('/register', (req, res) => {
    res.send('Registration route is working!');
});

// Login Route
router.post('/login', (req, res) => {
    res.send('Login route is working!');
});

module.exports = router;