const express = require('express');

const router = express.Router();

// Get all photos
router.get('/', (req, res) => {
    res.send('Get all photos route is working!');
});

// Get a single photo
router.get('/:id', (req, res) => {
    res.send('Get single photo route is working!');
});

// Upload a new photo
router.post('/upload', (req, res) => {
    res.send('Upload photo route is working!');
});

// Delete a photo
router.delete('/:id', (req, res) => {
    res.send('Delete photo route is working!');
});

module.exports = router;