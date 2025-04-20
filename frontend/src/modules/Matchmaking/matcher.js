import { calculateMatchPercentage } from '@/utils/helpers';

export const findMatches = async (currentMember, allProfiles) => {
    const matches = allProfiles
        .filter(profile => {
            // Don't match with self
            if (profile._id === currentMember._id) return false;

            // Business owners can only match with partners and vice versa
            if (currentMember.role === 'business') {
                return profile.role === 'partner';
            } else {
                return profile.role === 'business';
            }
        })
        .map(profile => {
            const matchScore = currentMember.role === 'business'
                ? calculateMatchPercentage(currentMember, profile)
                : calculateMatchPercentage(profile, currentMember);

            return {
                ...profile,
                matchScore
            };
        })
        .sort((a, b) => b.matchScore - a.matchScore);

    return matches;
};

export const getTopMatches = (matches, limit = 5) => {
    return matches
        .filter(match => match.matchScore >= 60) // Only return good matches
        .slice(0, limit);
};

export const filterMatchesByCountry = (matches, country) => {
    return matches.filter(match => 
        match.country.toLowerCase().includes(country.toLowerCase())
    );
};

export const filterMatchesByIndustry = (matches, industry) => {
    return matches.filter(match => 
        (match.industry || match.businessType)
            .toLowerCase()
            .includes(industry.toLowerCase())
    );
};

export const filterMatchesByInvestmentRange = (matches, minAmount, maxAmount) => {
    return matches.filter(match => {
        const amount = parseFloat(match.investmentCapacity || match.investmentBudget);
        return amount >= minAmount && amount <= maxAmount;
    });
};

export const sortMatches = (matches, sortBy = 'matchScore') => {
    return [...matches].sort((a, b) => {
        switch (sortBy) {
            case 'matchScore':
                return b.matchScore - a.matchScore;
            case 'name':
                return (a.name || a.businessName).localeCompare(b.name || b.businessName);
            case 'country':
                return a.country.localeCompare(b.country);
            case 'investment':
                return parseFloat(b.investmentCapacity || b.investmentBudget) - 
                       parseFloat(a.investmentCapacity || a.investmentBudget);
            default:
                return 0;
        }
    });
};