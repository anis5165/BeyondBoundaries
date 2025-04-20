const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    addFeedback,
    getUserFeedback,
    getUserRating,
    updateFeedback,
    deleteFeedback
} = require('../controllers/feedbackController');

const router = express.Router();

// Protect all routes
router.use(protect);

// Add new feedback
router.post('/add', addFeedback);

// Get feedback for a user
router.get('/user/:userId', getUserFeedback);

// Get average rating for a user
router.get('/rating/:userId', getUserRating);

// Update feedback
router.put('/:feedbackId', updateFeedback);

// Delete feedback
router.delete('/:feedbackId', deleteFeedback);

module.exports = router;