const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const SocketService = require('./services/socketService');
const errorHandler = require('./middleware/errorHandler');

// Import routers
const userRouter = require('./routers/userRouter');
const messageRouter = require('./routers/messageRouter');
const feedbackRouter = require('./routers/feedbackRouter');
const notificationRouter = require('./routers/notificationRouter');
const connectionRouter = require('./routers/connectionRouter');
const businessOwnerDetailRouter = require('./routers/businessOwnerDetailRouter');
const partnerDetailRouter = require('./routers/partnerDetailRouter');

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();
const server = http.createServer(app);

// Initialize socket service
const socketService = new SocketService(server);
app.set('socketService', socketService);
global.app = app;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/user', userRouter);
app.use('/message', messageRouter);
app.use('/feedback', feedbackRouter);
app.use('/notification', notificationRouter);
app.use('/connection', connectionRouter);
app.use('/businessOwner', businessOwnerDetailRouter);
app.use('/partner', partnerDetailRouter);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
