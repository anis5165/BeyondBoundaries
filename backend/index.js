const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const cors = require('cors');
const partnerDetailsRouter = require('./routers/partnerDetailRouter');
const businessDetailRouter = require('./routers/businessOwnerDetailRouter');
const userRouter = require('./routers/userRouter');
const messageRouter = require('./routers/messageRouter');
const Message = require('./routers/messageRouter'); // Assuming Message model is defined

// Enable CORS
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Routes
app.use('/partner', partnerDetailsRouter);
app.use('/businessOwner', businessDetailRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);

// Socket.IO event handlers
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join private chat room
    socket.on('join chat', (chatRoom) => {
        socket.join(chatRoom);
        console.log(`User joined chat room: ${chatRoom}`);
    });

    // Handle private messages
    socket.on('private message', async (messageData) => {
        try {
            const { sender, receiver, text, senderName } = messageData;
            const chatRoom = [sender, receiver].sort().join('-');

            // Save message to database
            const newMessage = new Message({
                sender,
                receiver,
                text,
                senderName,
                chatRoom
            });
            await newMessage.save();

            // Emit message to chat room
            io.to(chatRoom).emit('private message', newMessage);
        } catch (error) {
            console.error('Error handling private message:', error);
        }
    });

    socket.on('message', async (messageData) => {
        try {
            // Save message to database
            const response = await fetch('http://localhost:5000/message/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            if (response.ok) {
                // Broadcast the message to all connected clients
                io.emit('message', messageData);
            }
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Use server.listen instead of app.listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
