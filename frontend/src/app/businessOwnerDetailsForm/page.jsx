'use client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const BusinessOwnerDetailsForm = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const decoded = jwt_decode(token);
            setUserData(decoded);
        } catch (error) {
            console.error('Token decode error:', error);
            router.push('/login');
        }
    }, []);

    const detailsForm = useFormik({
        initialValues: {
            fullName: userData?.name || '',
            email: userData?.email || '',
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
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(
                    'http://localhost:5000/businessOwner/add',
                    values,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data) {
                    toast.success('Details submitted successfully');
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to submit details');
            }
        }
    });

    return (
        <div className="mt-28 px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Complete Your Business Profile</h1>
            <form onSubmit={detailsForm.handleSubmit} className="max-w-2xl mx-auto space-y-6">
                {/* Pre-filled fields (read-only) */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={detailsForm.values.fullName}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={detailsForm.values.email}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                </div>

                {/* Rest of your form fields */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                        type="text"
                        name="country"
                        onChange={detailsForm.handleChange}
                        value={detailsForm.values.country}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your country"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Business Name</label>
                    <input
                        type="text"
                        name="businessName"
                        onChange={detailsForm.handleChange}
                        value={detailsForm.values.businessName}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your business name"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Business Type</label>
                    <input
                        type="text"
                        name="businessType"
                        onChange={detailsForm.handleChange}
                        value={detailsForm.values.businessType}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your business type"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Business Registration Number</label>
                    <input
                        type="text"
                        name="businessRegNo"
                        onChange={detailsForm.handleChange}
                        value={detailsForm.values.businessRegNo}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your business registration number"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    <input
                        type="text"
                        name="website"
                        onChange={detailsForm.handleChange}
                        value={detailsForm.values.website}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your website URL"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                    <input
                        type="text"
                        name="linkedin"
                        onChange={detailsForm.handleChange}
                        value={detailsForm.values.linkedin}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your LinkedIn profile"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Annual Revenue</label>
                    <input
                        type="text"
                        name="annualRevenue"
                        onChange={detailsForm.handleChange}
                        value={detailsForm.values.annualRevenue}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your annual revenue"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Expansion Country</label>
                    <input
                        type="text"
                        name="expansionCountry"
                        onChange={detailsForm.handleChange}
                        value={detailsForm.values.expansionCountry}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your expansion country"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Investment Budget</label>
                    <input
                        type="text"
                        name="investmentBudget"
                        onChange={detailsForm.handleChange}
                        value={detailsForm.values.investmentBudget}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your investment budget"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Business Plan</label>
                    <input
                        type="file"
                        name="businessPlan"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const fd = new FormData();
                            fd.append('file', file);
                            fd.append('upload_preset', 'Mernbatch8');
                            fd.append('cloud_name', 'dgx8094we');

                            axios.post('https://api.cloudinary.com/v1_1/dgx8094we/image/upload', fd)
                                .then((result) => {
                                    toast.success('File uploaded successfully');
                                    detailsForm.setFieldValue('businessPlan', result.data.url);
                                })
                                .catch(() => {
                                    toast.error('Failed to upload file');
                                });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Submit Details
                </button>
            </form>
        </div>
    );
};

export default BusinessOwnerDetailsForm;
