'use client';
import { useState } from 'react';
import { FaLinkedin, FaGlobe } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import ChatWindow from '../Chat/ChatWindow';

const ProfileCard = ({ profile, showContactButtons = true }) => {
    const [showChat, setShowChat] = useState(false);
    const [rating, setRating] = useState(null);
    const { currentMember } = useAuth();

    const fetchRating = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/feedback/rating/${profile._id}`);
            setRating(response.data);
        } catch (error) {
            console.error('Error fetching rating:', error);
        }
    };

    const sendConnectionRequest = async () => {
        try {
            const data = {
                businessOwnerId: currentMember.role === 'business' ? currentMember._id : profile._id,
                partnerId: currentMember.role === 'partner' ? currentMember._id : profile._id,
                message: `Hi, I'd like to connect with you.`
            };

            await axios.post('http://localhost:5000/connection/request', data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            toast.success('Connection request sent successfully');
        } catch (error) {
            console.error('Error sending connection request:', error);
            toast.error('Failed to send connection request');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4">
                <h2 className="text-2xl font-bold">{profile.businessName || profile.companyName}</h2>
                <p className="text-lg">{profile.fullName || profile.name}</p>
            </div>

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Basic Information</h3>
                        <div className="space-y-2">
                            <p><span className="font-medium">Location:</span> {profile.country}</p>
                            {profile.businessType ? (
                                <>
                                    <p><span className="font-medium">Business Type:</span> {profile.businessType}</p>
                                    <p><span className="font-medium">Annual Revenue:</span> {profile.annualRevenue}</p>
                                </>
                            ) : (
                                <>
                                    <p><span className="font-medium">Industry:</span> {profile.industry}</p>
                                    <p><span className="font-medium">Experience:</span> {profile.experienceYears} years</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">
                            {profile.businessType ? 'Expansion Details' : 'Investment Details'}
                        </h3>
                        <div className="space-y-2">
                            {profile.businessType ? (
                                <>
                                    <p><span className="font-medium">Target Market:</span> {profile.expansionCountry}</p>
                                    <p><span className="font-medium">Investment Budget:</span> {profile.investmentBudget}</p>
                                </>
                            ) : (
                                <>
                                    <p><span className="font-medium">Investment Capacity:</span> {profile.investmentCapacity}</p>
                                    <p><span className="font-medium">Help Description:</span> {profile.helpDescription}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 pt-4">
                    {profile.website && (
                        <a 
                            href={profile.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <FaGlobe className="mr-2" /> Website
                        </a>
                    )}
                    {profile.linkedin && (
                        <a 
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <FaLinkedin className="mr-2" /> LinkedIn
                        </a>
                    )}
                </div>

                {/* Contact Buttons */}
                {showContactButtons && currentMember && currentMember._id !== profile._id && (
                    <div className="flex justify-center gap-4 pt-6">
                        <button
                            onClick={() => window.location.href = `mailto:${profile.email}`}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Send Email
                        </button>
                        <button
                            onClick={sendConnectionRequest}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Connect
                        </button>
                        <button
                            onClick={() => setShowChat(true)}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Chat
                        </button>
                    </div>
                )}
            </div>

            {showChat && (
                <div className="fixed bottom-0 right-4 w-96 h-[600px] bg-white shadow-2xl rounded-t-lg">
                    <ChatWindow
                        receiverId={profile._id}
                        receiverName={profile.fullName || profile.name}
                        onClose={() => setShowChat(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default ProfileCard;