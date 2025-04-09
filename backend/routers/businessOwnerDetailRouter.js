const express = require('express');
const router = express.Router();
const BusinessOwner = require('../models/businessOwnerDetailModel');

router.post('/add', (req,res) => {
    console.log(req.body);

    new BusinessOwner(req.body).save()
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    });
});

router.get('/getall', async (req, res) => {
    try {
        const owners = await BusinessOwner.find();
        console.log('Found owners:', owners);
        res.json(owners);
    } catch (error) {
        console.error('Error fetching owners:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/getbyid/:id', async (req, res) => {
    try {
        const owner = await BusinessOwner.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        res.json(owner);
    } catch (error) {
        console.error('Error fetching owner by ID:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;