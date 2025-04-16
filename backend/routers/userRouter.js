const express = require('express');
const router = express.Router();
const Model = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Signup route
router.post('/add', async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new Model({
            ...rest,
            password: hashedPassword
        });
        
        const savedUser = await newUser.save();
        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email, role: savedUser.role, name: savedUser.name },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ 
            member: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role
            }, 
            token 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Registration failed' });
    }
});

router.get('/getall', (req,res) => {
    Model.find()
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    });
});


router.get('/getbyid/:id', (req,res) => {
    Model.findById(req.params.id)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    });
})

router.put('/update/:id', (req,res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    });
})

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const member = await Model.findOne({ email });
        if (!member) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, member.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: member._id, 
                email: member.email, 
                role: member.role, 
                name: member.name 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send response
        res.json({
            member: {
                _id: member._id,
                name: member.name,
                email: member.email,
                role: member.role
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;