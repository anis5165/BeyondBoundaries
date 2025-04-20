const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const member = await User.findOne({ email });

        if (!member) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, member.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: member._id, email: member.email, role: member.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

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
};

exports.register = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            ...rest,
            password: hashedPassword
        });
        
        const savedUser = await newUser.save();
        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email, role: savedUser.role },
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
};