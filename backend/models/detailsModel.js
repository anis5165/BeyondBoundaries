const mongoose = require('../connection');
const { Schema, model } = mongoose;
const detailSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    location: {type: String, required: true},
    companyName: {type: String, required: true},
    industry: {type: String, required: true},
    businessRegNo: {type: String, required: true},
    services: {type: String, required: true},
    projectScope: {type: String, required: true},
    budget: {type: Number, required: true},
    startDate: {type: Date, required: true},
    skills: {type: String, required: true},
    expertise: {type: String, required: true},
    pastExprerience: {type: String, required: true}
});

module.exports = model('details', detailSchema);

