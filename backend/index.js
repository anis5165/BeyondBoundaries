const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const port = 5000;
const cors = require('cors');
const partnerDetailsRouter = require('./routers/partnerDetailRouter');
const businessDetailRouter = require('./routers/businessOwnerDetailRouter');
const userRouter = require('./routers/userRouter');


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});



app.use(express.json());
app.use('/partner', partnerDetailsRouter);
app.use('/businessOwner', businessDetailRouter);
app.use('/user', userRouter);


io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message', (messageData) => {
        // Broadcast the message to all connected clients
        io.emit('message', messageData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
