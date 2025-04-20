'use client';
import Link from 'next/link';
import { FaLinkedin, FaGlobe, FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { feedbackAPI } from '@/utils/api';

const PartnerCard = ({ partner, showActions = true, matchScore = null }) => {
    const [rating, setRating] = useState(null);
    const { currentMember } = useAuth();

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await feedbackAPI.getRating(partner._id);
                setRating(response.data);
            } catch (error) {
                console.error('Error fetching rating:', error);
            }
        };

        fetchRating();
    }, [partner._id]);

    const renderRating = () => {
        if (!rating) return null;
        
        return (
            <div className="flex items-center space-x-1 text-yellow-400">
                <FaStar />
                <span className="text-gray-700">
                    {rating.averageRating.toFixed(1)} ({rating.totalReviews})
                </span>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold">
                            {partner.role === 'business' ? partner.businessName : partner.name}
                        </h3>
                        <p className="text-gray-600">{partner.country}</p>
                        {renderRating()}
                    </div>
                    {matchScore && (
                        <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                            {matchScore}% Match
                        </div>
                    )}
                </div>

                <div className="mt-4 space-y-2">
                    {partner.role === 'business' ? (
                        <>
                            <p><span className="font-medium">Business Type:</span> {partner.businessType}</p>
                            <p><span className="font-medium">Investment Budget:</span> {partner.investmentBudget}</p>
                            <p><span className="font-medium">Target Market:</span> {partner.expansionCountry}</p>
                        </>
                    ) : (
                        <>
                            <p><span className="font-medium">Industry:</span> {partner.industry}</p>
                            <p><span className="font-medium">Experience:</span> {partner.experienceYears} years</p>
                            <p><span className="font-medium">Investment Capacity:</span> {partner.investmentCapacity}</p>
                        </>
                    )}
                </div>

                <div className="mt-4 flex items-center space-x-4">
                    {partner.website && (
                        <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <FaGlobe className="text-xl" />
                        </a>
                    )}
                    {partner.linkedin && (
                        <a
                            href={partner.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <FaLinkedin className="text-xl" />
                        </a>
                    )}
                </div>

                {showActions && currentMember && currentMember._id !== partner._id && (
                    <div className="mt-6 flex justify-end space-x-3">
                        <Link
                            href={`/view-profile/${partner._id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            View Profile
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartnerCard;