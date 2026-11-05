const express = require('express');

const router = express.Router();

// Get all comments for a photo
router.get('/:photoId', (req, res) => {
    res.send('Get comments route is working!');
});

// Add a new comment
router.post('/', (req, res) => {
    res.send('Add comment route is working!');
});

// Delete a comment
router.delete('/:id', (req, res) => {
    res.send('Delete comment route is working!');
});

module.exports = router;