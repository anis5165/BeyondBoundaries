const express = require('express');
const router = express.Router();
const Connection = require('../models/Connection');
const { verifyToken } = require('../middleware/verifyToken');
const notificationService = require('../services/notificationService');

// Request connection
router.post('/request', verifyToken, async (req, res) => {
    try {
        const { businessOwnerId, partnerId, message } = req.body;
        
        const connection = new Connection({
            businessOwnerId,
            partnerId,
            message,
            initiator: req.user.id,
            status: 'pending'
        });

        const savedConnection = await connection.save();
        
        // Send notification to receiver
        const receiverId = req.user.id === businessOwnerId ? partnerId : businessOwnerId;
        await notificationService.sendConnectionRequest(receiverId, req.user.id);

        res.status(201).json(savedConnection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Accept/Reject connection
router.put('/:connectionId/status', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const connection = await Connection.findById(req.params.connectionId);
        
        if (!connection) {
            return res.status(404).json({ message: 'Connection not found' });
        }

        connection.status = status;
        if (status === 'accepted') {
            connection.connectedAt = new Date();
            await notificationService.sendConnectionAccepted(connection.initiator);
        }

        const updatedConnection = await connection.save();
        res.json(updatedConnection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user's connections
router.get('/user/:userId', verifyToken, async (req, res) => {
    try {
        const connections = await Connection.find({
            $or: [
                { businessOwnerId: req.params.userId },
                { partnerId: req.params.userId }
            ],
            status: 'accepted'
        })
        .populate('businessOwnerId', 'name email')
        .populate('partnerId', 'name email')
        .sort({ connectedAt: -1 });

        res.json(connections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get pending connection requests
router.get('/pending/:userId', verifyToken, async (req, res) => {
    try {
        const connections = await Connection.find({
            $or: [
                { businessOwnerId: req.params.userId },
                { partnerId: req.params.userId }
            ],
            status: 'pending'
        })
        .populate('businessOwnerId', 'name email')
        .populate('partnerId', 'name email')
        .sort({ createdAt: -1 });

        res.json(connections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;