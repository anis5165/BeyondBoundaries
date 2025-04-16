const express = require('express');
const router = express.Router();
const Model = require('../models/businessOwnerDetailModel');

router.post('/add', (req,res) => {
    console.log(req.body);

    new Model(req.body).save()
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    });
});

router.get('/getall', async (req, res) => {
    try {
        const owners = await Model.find();
        console.log('Found owners:', owners);
        res.json(owners);
    } catch (error) {
        console.error('Error fetching owners:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/getbyid/:id', async (req, res) => {
    try {
        const profile = await Model.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/getbyemail/:email', async (req, res) => {
    try {
        const profile = await Model.findOne({ email: req.params.email });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;