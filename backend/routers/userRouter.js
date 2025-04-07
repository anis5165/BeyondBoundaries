const express = require('express');
const router = express.Router();
const Model = require('../models/userModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');
require('dotenv').config();

router.post('/add', (req,res) => {
    console.log(req.body);

    new Model(req.body).save()
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    });
})

router.get('/getall', (req,res) => {
    Model.find()
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    });
});


router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                // email and password matched
                // generate token

                const { _id, email, password } = result;
                const payload = { _id, email, password }

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '6h' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({ token });
                        }
                    }
                )

            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;