const Message = require('../models/Message');
const User = require('../models/userModel');
const NotificationService = require('../services/notificationService');

// Get chat messages between two users
const getMessages = async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;
        const chatRoom = [userId1, userId2].sort().join('-');

        const messages = await Message.find({ chatRoom })
            .sort({ timestamp: 1 });

        // Mark messages as read
        await Message.updateMany(
            { 
                chatRoom,
                receiver: req.user._id,
                read: false 
            },
            { read: true }
        );

        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
};

// Send a new message
const sendMessage = async (req, res) => {
    try {
        const { receiver, text } = req.body;
        const sender = req.user._id;
        const senderUser = await User.findById(sender);
        const chatRoom = [sender, receiver].sort().join('-');

        const message = new Message({
            sender,
            receiver,
            text,
            senderName: senderUser.name,
            chatRoom
        });

        const savedMessage = await message.save();

        // Send notification to receiver
        await NotificationService.sendMessageNotification(receiver, sender);

        // Emit message through socket
        req.app.get('socketService').emitToUser(receiver, 'new message', savedMessage);

        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
};

// Mark message as read
const markAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        const message = await Message.findByIdAndUpdate(
            messageId,
            { read: true },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json(message);
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json({ message: 'Error marking message as read' });
    }
};

// Get unread messages count
const getUnreadCount = async (req, res) => {
    try {
        const count = await Message.countDocuments({
            receiver: req.user._id,
            read: false
        });

        res.json({ count });
    } catch (error) {
        console.error('Error getting unread count:', error);
        res.status(500).json({ message: 'Error getting unread count' });
    }
};

// Get chat history preview
const getChatPreviews = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get the last message from each chat room
        const lastMessages = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { sender: userId },
                        { receiver: userId }
                    ]
                }
            },
            {
                $sort: { timestamp: -1 }
            },
            {
                $group: {
                    _id: '$chatRoom',
                    lastMessage: { $first: '$$ROOT' }
                }
            }
        ]);

        // Get user details for each chat
        const chatPreviews = await Promise.all(lastMessages.map(async ({ lastMessage }) => {
            const otherUserId = lastMessage.sender.equals(userId) 
                ? lastMessage.receiver 
                : lastMessage.sender;
            
            const otherUser = await User.findById(otherUserId).select('name');
            
            const unreadCount = await Message.countDocuments({
                chatRoom: lastMessage.chatRoom,
                receiver: userId,
                read: false
            });

            return {
                chatRoom: lastMessage.chatRoom,
                otherUser,
                lastMessage: lastMessage.text,
                timestamp: lastMessage.timestamp,
                unreadCount
            };
        }));

        res.json(chatPreviews);
    } catch (error) {
        console.error('Error getting chat previews:', error);
        res.status(500).json({ message: 'Error getting chat previews' });
    }
};

module.exports = {
    getMessages,
    sendMessage,
    markAsRead,
    getUnreadCount,
    getChatPreviews
};