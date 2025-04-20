'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import Link from 'next/link';

const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentMember } = useAuth();

    useEffect(() => {
        if (currentMember) {
            fetchMatches();
        }
    }, [currentMember]);

    const fetchMatches = async () => {
        try {
            const endpoint = currentMember.role === 'business'
                ? '/partner/matches'
                : '/businessOwner/matches';
                
            const response = await axios.get(`http://localhost:5000${endpoint}/${currentMember._id}`);
            setMatches(response.data);
        } catch (error) {
            console.error('Error fetching matches:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Your Matches</h2>
            {matches.length === 0 ? (
                <p className="text-gray-500 text-center">No matches found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matches.map((match) => (
                        <div key={match._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{match.name}</h3>
                                    <p className="text-sm text-gray-600">{match.country}</p>
                                </div>
                                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    {match.matchScore}% Match
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                {currentMember.role === 'business' ? (
                                    <>
                                        <p><span className="font-medium">Experience:</span> {match.experienceYears} years</p>
                                        <p><span className="font-medium">Industry:</span> {match.industry}</p>
                                    </>
                                ) : (
                                    <>
                                        <p><span className="font-medium">Business Type:</span> {match.businessType}</p>
                                        <p><span className="font-medium">Target Market:</span> {match.expansionCountry}</p>
                                    </>
                                )}
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <Link 
                                    href={`/view-profile/${match._id}`}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MatchList;