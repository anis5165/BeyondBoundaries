'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaLinkedin, FaGlobe } from 'react-icons/fa';
import ChatApp from '@/components/ChatApp';
import { useAuth } from '@/context/AuthContext';

const ViewProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const { currentMember } = useAuth();
    const {id} = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // First try business owner profile
                try {
                    const businessResponse = await axios.get(`http://localhost:5000/businessOwner/getbyid/${id}`);
                    if (businessResponse.data) {
                        console.log('Found business profile:', businessResponse.data);
                        setProfile({ ...businessResponse.data, type: 'business' });
                        return;
                    }
                } catch (error) {
                    console.log('Not a business profile, trying partner profile...');
                }

                // If not found, try partner profile
                const partnerResponse = await axios.get(`http://localhost:5000/partner/getbyid/${id}`);
                if (partnerResponse.data) {
                    console.log('Found partner profile:', partnerResponse.data);
                    setProfile({ ...partnerResponse.data, type: 'partner' });
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProfile();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="text-center py-8 mt-20">
                <p className="text-gray-600">Profile not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-blue-600 text-white px-6 py-4">
                        <h1 className="text-3xl font-bold">
                            {profile.type === 'business' ? profile.businessName : profile.companyName}
                        </h1>
                        <p className="text-xl mt-2">{profile.type === 'business' ? profile.fullName : profile.name}</p>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6 space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                                <div className="space-y-3">
                                    <p><span className="font-medium">Country:</span> {profile.country}</p>
                                    {profile.type === 'business' ? (
                                        <>
                                            <p><span className="font-medium">Business Type:</span> {profile.businessType}</p>
                                            <p><span className="font-medium">Registration No:</span> {profile.businessRegNo}</p>
                                            <p><span className="font-medium">Annual Revenue:</span> {profile.annualRevenue}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p><span className="font-medium">Experience:</span> {profile.experienceYears} years</p>
                                            <p><span className="font-medium">Industry:</span> {profile.industry}</p>
                                            <p><span className="font-medium">Services:</span> {profile.services}</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Additional Details */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4">
                                    {profile.type === 'business' ? 'Expansion Details' : 'Investment Details'}
                                </h2>
                                <div className="space-y-3">
                                    {profile.type === 'business' ? (
                                        <>
                                            <p><span className="font-medium">Target Market:</span> {profile.expansionCountry}</p>
                                            <p><span className="font-medium">Investment Budget:</span> {profile.investmentBudget}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p><span className="font-medium">Investment Capacity:</span> {profile.investmentCapacity}</p>
                                            <p><span className="font-medium">Availability:</span> {profile.availability ? 'Yes' : 'No'}</p>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;