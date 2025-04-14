const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

// Get all messages
router.get('/getall', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Get chat messages between two users
router.get('/chat/:userId1/:userId2', async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;
        const chatRoom = [userId1, userId2].sort().join('-');

        const messages = await Message.find({ chatRoom })
            .sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Add new message
router.post('/add', async (req, res) => {
    try {
        const { sender, receiver, text, senderName } = req.body;
        const chatRoom = [sender, receiver].sort().join('-');

        const newMessage = new Message({
            sender,
            receiver,
            text,
            senderName,
            chatRoom
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

// Get all chat rooms for a user
router.get('/chats/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }]
        })
        .sort({ timestamp: -1 })
        .populate('sender receiver', 'name');

        // Get unique chat rooms
        const chats = messages.reduce((acc, msg) => {
            const otherUser = msg.sender._id.toString() === userId ? msg.receiver : msg.sender;
            if (!acc.find(chat => chat.userId === otherUser._id.toString())) {
                acc.push({
                    userId: otherUser._id,
                    name: otherUser.name,
                    lastMessage: msg.text,
                    timestamp: msg.timestamp
                });
            }
            return acc;
        }, []);

        res.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ error: 'Failed to fetch chats' });
    }
});

module.exports = router;