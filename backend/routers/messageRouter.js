const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { 
    getMessages, 
    sendMessage, 
    markAsRead, 
    getUnreadCount,
    getChatPreviews 
} = require('../controllers/chatController');

const router = express.Router();

// Protect all routes
router.use(protect);

// Get chat messages between two users
router.get('/chat/:userId1/:userId2', getMessages);

// Send a new message
router.post('/add', sendMessage);

// Mark message as read
router.put('/:messageId/read', markAsRead);

// Get unread messages count
router.get('/unread', getUnreadCount);

// Get chat history preview
router.get('/previews', getChatPreviews);

module.exports = router;