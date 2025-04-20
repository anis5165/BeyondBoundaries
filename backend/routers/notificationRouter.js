const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const NotificationService = require('../services/notificationService');

const router = express.Router();

// Protect all routes
router.use(protect);

// Get user's notifications with pagination
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await NotificationService.getUserNotifications(userId, page, limit);
        res.json(result);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications' });
    }
});

// Get unread notification count
router.get('/:userId/unread', async (req, res) => {
    try {
        const { userId } = req.params;
        const count = await NotificationService.getUnreadCount(userId);
        res.json({ count });
    } catch (error) {
        console.error('Error getting unread count:', error);
        res.status(500).json({ message: 'Error getting unread count' });
    }
});

// Mark single notification as read
router.put('/:notificationId/read', async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await NotificationService.markAsRead(notificationId);
        res.json(notification);
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Error marking notification as read' });
    }
});

// Mark all notifications as read for a user
router.put('/user/:userId/read-all', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await NotificationService.markAllAsRead(userId);
        res.json(result);
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        res.status(500).json({ message: 'Error marking all notifications as read' });
    }
});

// Delete old notifications (admin only)
router.delete('/cleanup', async (req, res) => {
    try {
        const daysOld = parseInt(req.query.daysOld) || 30;
        const result = await NotificationService.deleteOldNotifications(daysOld);
        res.json(result);
    } catch (error) {
        console.error('Error deleting old notifications:', error);
        res.status(500).json({ message: 'Error deleting old notifications' });
    }
});

module.exports = router;