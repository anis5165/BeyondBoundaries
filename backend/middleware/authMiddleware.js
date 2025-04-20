const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Verify JWT token
const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Check if user is a business owner
const isBusinessOwner = (req, res, next) => {
    if (req.user && req.user.role === 'business') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a business owner' });
    }
};

// Check if user is a partner
const isPartner = (req, res, next) => {
    if (req.user && req.user.role === 'partner') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a partner' });
    }
};

// Check if user is either a business owner or partner
const isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(403).json({ message: 'Not authenticated' });
    }
};

// Check if user owns the resource
const isOwner = (resourceField) => async (req, res, next) => {
    try {
        if (req.user._id.toString() === req.params[resourceField]) {
            next();
        } else {
            res.status(403).json({ message: 'Not authorized to access this resource' });
        }
    } catch (error) {
        console.error('Authorization error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    protect,
    isBusinessOwner,
    isPartner,
    isAuthenticated,
    isOwner
};