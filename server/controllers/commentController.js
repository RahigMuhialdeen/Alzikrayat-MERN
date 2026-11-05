const Comment = require('../models/Comment');

// Get all comments for a photo
const getCommentsByPhoto = async (req, res) => {
    try {
        const comments = await Comment.find({
            photoId: req.params.photoId
        })
            .populate('userId', 'firstName lastName')
            .sort({ dateTime: -1 });

        res.status(200).json(comments);

    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve comments',
            error: error.message
        });
    }
};

// Add a new comment
const addComment = async (req, res) => {
    try {
        const { photoId, userId, comment } = req.body;

        const newComment = new Comment({
            photoId,
            userId,
            comment
        });

        await newComment.save();

        res.status(201).json({
            message: 'Comment added successfully',
            newComment
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to add comment',
            error: error.message
        });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);

        if (!deletedComment) {
            return res.status(404).json({
                message: 'Comment not found'
            });
        }

        res.status(200).json({
            message: 'Comment deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete comment',
            error: error.message
        });
    }
};

module.exports = {
    getCommentsByPhoto,
    addComment,
    deleteComment
};