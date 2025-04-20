const Joi = require('joi');

const registerValidator = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('business', 'partner').required()
});

const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const businessProfileValidator = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    country: Joi.string().required(),
    businessName: Joi.string().required(),
    businessType: Joi.string().required(),
    businessRegNo: Joi.string().required(),
    website: Joi.string().uri().allow(''),
    linkedin: Joi.string().uri().allow(''),
    annualRevenue: Joi.string().required(),
    expansionCountry: Joi.string().required(),
    investmentBudget: Joi.string().required(),
    businessPlan: Joi.string().required()
});

const partnerProfileValidator = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    country: Joi.string().required(),
    companyName: Joi.string().required(),
    industry: Joi.string().required(),
    businessRegNo: Joi.string().required(),
    website: Joi.string().uri().allow(''),
    linkedin: Joi.string().uri().allow(''),
    experienceYears: Joi.string().required(),
    investmentCapacity: Joi.string().required(),
    availability: Joi.string().required(),
    helpDescription: Joi.string().required()
});

const feedbackValidator = Joi.object({
    giverId: Joi.string().required(),
    receiverId: Joi.string().required(),
    giverRole: Joi.string().valid('business', 'partner').required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(10).max(500).required(),
    recommendation: Joi.boolean().required()
});

module.exports = {
    registerValidator,
    loginValidator,
    businessProfileValidator,
    partnerProfileValidator,
    feedbackValidator
};