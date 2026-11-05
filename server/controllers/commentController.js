const mongoose = require('mongoose');
const Comment = require('../models/Comment');

// Get all comments for a photo
const getCommentsByPhoto = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.photoId)) {
    return res.status(400).json({
        message: 'Invalid photo ID'
    });
}
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
        const { userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid comment ID'
            });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            });
        }

        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({
                message: 'You are not authorized to delete this comment'
            });
        }

        await Comment.findByIdAndDelete(req.params.id);

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