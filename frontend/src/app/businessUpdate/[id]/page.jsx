'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BusinessUpdatePage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        country: '',
        businessName: '',
        businessType: '',
        businessRegNo: '',
        website: '',
        linkedin: '',
        annualRevenue: '',
        expansionCountry: '',
        investmentBudget: '',
        businessPlan: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/businessOwner/getbyid/${id}`);
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error('Failed to load profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/businessOwner/update/${id}`, formData);
            toast.success('Profile updated successfully');
            // Redirect to profile page
            window.location.href = `/profile/${id}`;
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="mt-28 max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-semibold mb-8 text-center">Update Business Profile</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Business Name</label>
                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Business Type</label>
                        <input
                            type="text"
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Business Registration Number</label>
                        <input
                            type="text"
                            name="businessRegNo"
                            value={formData.businessRegNo}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Website</label>
                        <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Annual Revenue</label>
                        <input
                            type="text"
                            name="annualRevenue"
                            value={formData.annualRevenue}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expansion Country</label>
                        <input
                            type="text"
                            name="expansionCountry"
                            value={formData.expansionCountry}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Investment Budget</label>
                        <input
                            type="text"
                            name="investmentBudget"
                            value={formData.investmentBudget}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Business Plan</label>
                    <textarea
                        name="businessPlan"
                        value={formData.businessPlan}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => window.location.href = `/profile/${id}`}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BusinessUpdatePage;