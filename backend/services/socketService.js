const { Server } = require('socket.io');
const Message = require('../models/Message');
const NotificationService = require('./notificationService');

class SocketService {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: process.env.CLIENT_URL || 'http://localhost:3000',
                methods: ['GET', 'POST'],
                credentials: true
            }
        });

        this.userSockets = new Map(); // Maps userId to socketId
        this.initialize();
    }

    initialize() {
        this.io.on('connection', (socket) => {
            console.log('User connected:', socket.id);

            // Store user's socket connection
            socket.on('register', (userId) => {
                this.userSockets.set(userId, socket.id);
                console.log(`User ${userId} registered with socket ${socket.id}`);
            });

            // Handle joining chat rooms
            socket.on('join chat', (chatRoom) => {
                socket.join(chatRoom);
                console.log(`User joined chat room: ${chatRoom}`);
            });

            // Handle private messages
            socket.on('private message', async (data) => {
                try {
                    const { sender, receiver, text, senderName } = data;
                    const chatRoom = [sender, receiver].sort().join('-');

                    // Save message to database
                    const message = new Message({
                        sender,
                        receiver,
                        text,
                        senderName,
                        chatRoom
                    });
                    await message.save();

                    // Send message to chat room
                    this.io.to(chatRoom).emit('private message', message);

                    // Send notification to receiver if they're not in the chat room
                    const receiverSocket = this.userSockets.get(receiver);
                    if (receiverSocket) {
                        await NotificationService.sendMessageNotification(receiver, sender);
                    }
                } catch (error) {
                    console.error('Error handling private message:', error);
                }
            });

            // Handle connection requests
            socket.on('connection request', async (data) => {
                try {
                    const { receiverId, senderId } = data;
                    const receiverSocket = this.userSockets.get(receiverId);
                    if (receiverSocket) {
                        await NotificationService.sendConnectionRequest(receiverId, senderId);
                    }
                } catch (error) {
                    console.error('Error handling connection request:', error);
                }
            });

            // Handle typing indicators
            socket.on('typing', (data) => {
                const { chatRoom, user } = data;
                socket.to(chatRoom).emit('typing', user);
            });

            socket.on('stop typing', (chatRoom) => {
                socket.to(chatRoom).emit('stop typing');
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                // Remove user from userSockets map
                for (const [userId, socketId] of this.userSockets.entries()) {
                    if (socketId === socket.id) {
                        this.userSockets.delete(userId);
                        break;
                    }
                }
                console.log('User disconnected:', socket.id);
            });
        });
    }

    // Utility method to emit events to specific users
    emitToUser(userId, event, data) {
        const socketId = this.userSockets.get(userId);
        if (socketId) {
            this.io.to(socketId).emit(event, data);
        }
    }

    // Utility method to emit events to all connected users
    emitToAll(event, data) {
        this.io.emit(event, data);
    }

    // Utility method to get active users
    getActiveUsers() {
        return Array.from(this.userSockets.keys());
    }
}

module.exports = SocketService;