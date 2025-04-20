// Date formatting
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Time ago formatting
export const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
    }
    return 'just now';
};

// Input validation
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 6;
};

// Local storage helpers
export const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }
    return null;
};

export const setLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }
};

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

// Truncate text
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

// Generate chat room ID
export const generateChatRoomId = (userId1, userId2) => {
    return [userId1, userId2].sort().join('-');
};

// Format file size
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Calculate match percentage
export const calculateMatchPercentage = (business, partner) => {
    let matchScore = 0;
    let totalCriteria = 0;

    // Industry match
    if (business.businessType === partner.industry) {
        matchScore += 30;
    }
    totalCriteria += 30;

    // Location/Market match
    if (business.expansionCountry === partner.country) {
        matchScore += 25;
    }
    totalCriteria += 25;

    // Investment range match
    const businessBudget = parseFloat(business.investmentBudget);
    const partnerCapacity = parseFloat(partner.investmentCapacity);
    if (businessBudget <= partnerCapacity) {
        matchScore += 25;
    }
    totalCriteria += 25;

    // Experience match
    const experienceYears = parseInt(partner.experienceYears);
    if (experienceYears >= 5) {
        matchScore += 20;
    } else if (experienceYears >= 3) {
        matchScore += 15;
    } else {
        matchScore += 10;
    }
    totalCriteria += 20;

    return Math.round((matchScore / totalCriteria) * 100);
};

// Error handling
export const handleAPIError = (error) => {
    if (error.response) {
        // Server responded with error
        return error.response.data.message || 'An error occurred';
    } else if (error.request) {
        // Request made but no response
        return 'Unable to connect to server';
    } else {
        // Something else went wrong
        return 'An unexpected error occurred';
    }
};