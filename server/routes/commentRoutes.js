const express = require('express');
const router = express.Router();

const {
    getCommentsByPhoto,
    addComment,
    deleteComment
} = require('../controllers/commentController');

// Get comments for a photo
router.get('/:photoId', getCommentsByPhoto);

// Add a new comment
router.post('/', addComment);

// Delete a comment
router.delete('/:id', deleteComment);

module.exports = router;