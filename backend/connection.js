const mongoose = require('mongoose');
require("dotenv").config();
const url = process.env.MONGO_URI;

mongoose.connect(url)
.then((result) => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Error connecting to the database', err);
});


module.exports = mongoose;