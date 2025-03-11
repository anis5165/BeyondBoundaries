const mongoose = require('mongoose');

const url = "mongodb+srv://anis5165:Vikas2002@cluster0.y3opu.mongodb.net/BeyondBoundaries?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url)
.then((result) => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Error connecting to the database', err);
});


module.exports = mongoose;