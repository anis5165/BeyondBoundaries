'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PartnerUpdatePage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
        companyName: '',
        industry: '',
        businessRegNo: '',
        website: '',
        linkedin: '',
        experienceYears: '',
        investmentCapacity: '',
        availability: '',
        helpDescription: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/partner/getbyid/${id}`);
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
            await axios.put(`http://localhost:5000/partner/update/${id}`, formData);
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
            <h1 className="text-4xl font-semibold mb-8 text-center">Update Partner Profile</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
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
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Industry</label>
                        <input
                            type="text"
                            name="industry"
                            value={formData.industry}
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
                        <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                        <input
                            type="text"
                            name="experienceYears"
                            value={formData.experienceYears}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Investment Capacity</label>
                        <input
                            type="text"
                            name="investmentCapacity"
                            value={formData.investmentCapacity}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Availability</label>
                        <select
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Availability</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Flexible">Flexible</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">How You Can Help</label>
                    <textarea
                        name="helpDescription"
                        value={formData.helpDescription}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
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

export default PartnerUpdatePage;