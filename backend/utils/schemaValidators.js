const userSchema = {
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: {
            values: ['business', 'partner'],
            message: 'Role must be either business or partner'
        }
    }
};

const businessProfileSchema = {
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        minlength: [2, 'Full name must be at least 2 characters'],
        maxlength: [50, 'Full name cannot exceed 50 characters']
    },
    businessName: {
        type: String,
        required: [true, 'Business name is required'],
        minlength: [2, 'Business name must be at least 2 characters']
    },
    businessType: {
        type: String,
        required: [true, 'Business type is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    businessRegNo: {
        type: String,
        required: [true, 'Business registration number is required']
    },
    website: {
        type: String,
        match: [
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            'Please provide a valid URL'
        ]
    },
    linkedin: {
        type: String,
        match: [
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            'Please provide a valid LinkedIn URL'
        ]
    },
    annualRevenue: {
        type: String,
        required: [true, 'Annual revenue is required']
    },
    expansionCountry: {
        type: String,
        required: [true, 'Target expansion country is required']
    },
    investmentBudget: {
        type: String,
        required: [true, 'Investment budget is required']
    }
};

const partnerProfileSchema = {
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required']
    },
    industry: {
        type: String,
        required: [true, 'Industry is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    businessRegNo: {
        type: String,
        required: [true, 'Business registration number is required']
    },
    website: {
        type: String,
        match: [
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            'Please provide a valid URL'
        ]
    },
    linkedin: {
        type: String,
        match: [
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            'Please provide a valid LinkedIn URL'
        ]
    },
    experienceYears: {
        type: String,
        required: [true, 'Experience years is required']
    },
    investmentCapacity: {
        type: String,
        required: [true, 'Investment capacity is required']
    },
    availability: {
        type: String,
        required: [true, 'Availability is required'],
        enum: {
            values: ['immediate', 'within_1_month', 'within_3_months', 'more_than_3_months'],
            message: 'Please select a valid availability option'
        }
    }
};

module.exports = {
    userSchema,
    businessProfileSchema,
    partnerProfileSchema
};