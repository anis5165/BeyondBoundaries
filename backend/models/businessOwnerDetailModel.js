const {Schema, model} = require("../connection")
const BusinessOwnerSchema = new Schema({
    fullName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    country: {type: String, require: true},
    businessName: {type: String, require: true},
    businessType: {type: String, require: true},
    businessRegNo: {type: String, require: true},
    website: {type: String},
    linkedin: {type: String},
    annualRevenue: {type: String},
    expansionCountry: {type: String, require: true},
    investmentBudget: {type: String},
    businessPlan: {type: String, require: true},
});

module.exports = model("/businessOwner", BusinessOwnerSchema);