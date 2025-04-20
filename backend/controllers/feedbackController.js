const Feedback = require('../models/Feedback');
const User = require('../models/userModel');
const NotificationService = require('../services/notificationService');

// Add new feedback
const addFeedback = async (req, res) => {
    try {
        const { receiverId, rating, comment } = req.body;
        const senderId = req.user._id;

        // Check if user has already given feedback
        const existingFeedback = await Feedback.findOne({
            sender: senderId,
            receiver: receiverId
        });

        if (existingFeedback) {
            return res.status(400).json({
                message: 'You have already provided feedback for this user'
            });
        }

        const feedback = new Feedback({
            sender: senderId,
            receiver: receiverId,
            rating,
            comment
        });

        await feedback.save();

        // Send notification to receiver
        await NotificationService.sendFeedbackNotification(receiverId, senderId);

        res.status(201).json(feedback);
    } catch (error) {
        console.error('Error adding feedback:', error);
        res.status(500).json({ message: 'Error adding feedback' });
    }
};

// Get feedback for a user
const getUserFeedback = async (req, res) => {
    try {
        const { userId } = req.params;

        const feedback = await Feedback.find({ receiver: userId })
            .populate('sender', 'name role')
            .sort({ createdAt: -1 });

        res.json(feedback);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Error fetching feedback' });
    }
};

// Get average rating for a user
const getUserRating = async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await Feedback.aggregate([
            { $match: { receiver: userId } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        if (result.length === 0) {
            return res.json({
                averageRating: 0,
                totalReviews: 0
            });
        }

        res.json({
            averageRating: result[0].averageRating,
            totalReviews: result[0].totalReviews
        });
    } catch (error) {
        console.error('Error calculating rating:', error);
        res.status(500).json({ message: 'Error calculating rating' });
    }
};

// Update feedback
const updateFeedback = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user._id;

        const feedback = await Feedback.findOne({
            _id: feedbackId,
            sender: userId
        });

        if (!feedback) {
            return res.status(404).json({
                message: 'Feedback not found or you are not authorized to update it'
            });
        }

        feedback.rating = rating;
        feedback.comment = comment;
        feedback.updatedAt = Date.now();

        await feedback.save();

        res.json(feedback);
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({ message: 'Error updating feedback' });
    }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const userId = req.user._id;

        const feedback = await Feedback.findOne({
            _id: feedbackId,
            sender: userId
        });

        if (!feedback) {
            return res.status(404).json({
                message: 'Feedback not found or you are not authorized to delete it'
            });
        }

        await feedback.remove();

        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ message: 'Error deleting feedback' });
    }
};

module.exports = {
    addFeedback,
    getUserFeedback,
    getUserRating,
    updateFeedback,
    deleteFeedback
};