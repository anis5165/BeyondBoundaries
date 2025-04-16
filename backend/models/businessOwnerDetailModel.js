const {Schema, model} = require("../connection")

const BusinessOwnerSchema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    country: {type: String, required: true},
    businessName: {type: String, required: true},
    businessType: {type: String, required: true},
    businessRegNo: {type: String, required: true},
    website: {type: String},
    linkedin: {type: String},
    annualRevenue: {type: String},
    expansionCountry: {type: String, required: true},
    investmentBudget: {type: String},
    businessPlan: {type: String, required: true},
});

module.exports = model("businessowners", BusinessOwnerSchema);