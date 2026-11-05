const mongoose = require('mongoose');
const Photo = require('../models/Photo');
const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Get all photos
const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find()
            .populate('userId', 'firstName lastName');

        res.status(200).json(photos);

    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve photos',
            error: error.message
        });
    }
};

// Get a single photo
const getPhotoById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
        message: 'Invalid photo ID'
    });
}
        const photo = await Photo.findById(req.params.id)
            .populate('userId', 'firstName lastName');

        if (!photo) {
            return res.status(404).json({
                message: 'Photo not found'
            });
        }

        res.status(200).json(photo);

    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve photo',
            error: error.message
        });
    }
};

// Upload a new photo
const uploadPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'Please upload a photo'
            });
        }

        const { userId, title, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            });
        }

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: 'Photo title is required'
            });
        }

        const newPhoto = new Photo({
            userId,
            fileName: req.file.filename,
            title,
            description
        });

        await newPhoto.save();

        res.status(201).json({
            message: 'Photo uploaded successfully',
            photo: newPhoto
        });

    } catch (error) {
        res.status(500).json({
            message: 'Photo upload failed',
            error: error.message
        });
    }
};

// Delete a photo
const deletePhoto = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid photo ID'
            });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            });
        }

        const photo = await Photo.findById(req.params.id);

        if (!photo) {
            return res.status(404).json({
                message: 'Photo not found'
            });
        }

        if (photo.userId.toString() !== userId) {
            return res.status(403).json({
                message: 'You are not authorized to delete this photo'
            });
        }

        await Photo.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Photo deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Photo deletion failed',
            error: error.message
        });
    }
};

module.exports = {
    getAllPhotos,
    getPhotoById,
    uploadPhoto,
    deletePhoto,
    upload
};