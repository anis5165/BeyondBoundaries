const mongoose = require('../connection');
const { Schema, model } = mongoose;
const clientdetailsSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    country: {type: String, required: true},
    companyName: {type: String, required: true},
    industry: {type: String, required: true},
    businessRegNo: {type: String, required: true},
    website: {type: String},
    linkedin: {type: String},
    experienceYears: {type: String, required: true},
    investmentCapacity: {type: String},
    availability: {type: String, required: true},
    helpDescription: {type: String},
});

module.exports = model('clientdetails', clientdetailsSchema);

