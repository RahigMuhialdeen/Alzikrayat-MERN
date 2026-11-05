const express = require('express');
const router = express.Router();

const {
    getAllPhotos,
    getPhotoById,
    uploadPhoto,
    deletePhoto
} = require('../controllers/photoController');

// Get all photos
router.get('/', getAllPhotos);

// Get single photo
router.get('/:id', getPhotoById);

// Upload photo
router.post('/upload', uploadPhoto);

// Delete photo
router.delete('/:id', deletePhoto);

module.exports = router;