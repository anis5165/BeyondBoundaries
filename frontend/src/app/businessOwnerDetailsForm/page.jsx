'use client';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from "react-hot-toast";
import axios from 'axios';

const BusinessOwnerDetailsForm = () => {
    const [businessPlan, setBusinessPlan] = useState(null);

    const detailsForm = useFormik({
        initialValues: {
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
            businessPlan: '',
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            axios.post('http://localhost:5000/businessOwner/add', values)
                .then(() => {
                    resetForm();
                    toast.success('Details Submitted Successfully');
                })
                .catch(() => {
                    toast.error('Error Submitting Details');
                });
        },
    });

    const upload = (e) => {
        const file = e.target.files[0];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'Mernbatch8');
        fd.append('cloud_name', 'dgx8094we');

        axios.post('https://api.cloudinary.com/v1_1/dgx8094we/image/upload', fd)
            .then((result) => {
                toast.success('File uploaded successfully');
                setBusinessPlan(result.data.url);
                detailsForm.setFieldValue('businessPlan', result.data.url);
            })
            .catch(() => {
                toast.error('Failed to upload file');
            });
    };

    return (
        <div className="my-16 mt-28 flex flex-col items-center px-5">
            <h2 className="text-4xl font-bold text-center">Business Owner Profile</h2>
            <h5 className="bg-[#F7EDE8] py-3 mt-2 px-10 rounded text-center">
                Please Fill Correct Details
            </h5>

            <div className="max-w-4xl mt-10 w-full p-8 border border-gray-300 rounded-lg shadow-lg">
                <form onSubmit={detailsForm.handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[
                                { id: 'fullName', label: 'Full Name', placeholder: 'Enter your name' },
                                { id: 'email', label: 'Email', placeholder: 'Enter your email' },
                                { id: 'country', label: 'Country', placeholder: 'Enter your location' },
                            ].map(({ id, label, placeholder }) => (
                                <div key={id}>
                                    <label htmlFor={id} className="block font-medium">{label}:</label>
                                    <input
                                        type="text"
                                        id={id}
                                        onChange={detailsForm.handleChange}
                                        value={detailsForm.values[id]}
                                        className="border-2 w-full border-gray-300 rounded-md py-2 px-3 focus:ring focus:ring-[#F7EDE8]"
                                        placeholder={placeholder}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-300" />

                    {/* Business Details */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Business Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[
                                { id: 'businessName', label: 'Business Name', placeholder: 'Enter company name' },
                                { id: 'businessType', label: 'Business Type', placeholder: 'Enter industry/sector' },
                                { id: 'businessRegNo', label: 'Business Reg No.', placeholder: 'Enter registration number' },
                                { id: 'website', label: 'Website', placeholder: 'Enter website URL' },
                                { id: 'linkedin', label: 'LinkedIn', placeholder: 'Enter LinkedIn profile' },
                                { id: 'annualRevenue', label: 'Annual Revenue', placeholder: 'Enter revenue' },
                                { id: 'expansionCountry', label: 'Expansion Country', placeholder: 'Enter country' },
                                { id: 'investmentBudget', label: 'Investment Budget', placeholder: 'Enter budget' },
                            ].map(({ id, label, placeholder }) => (
                                <div key={id}>
                                    <label htmlFor={id} className="block font-medium">{label}:</label>
                                    <input
                                        type="text"
                                        id={id}
                                        onChange={detailsForm.handleChange}
                                        value={detailsForm.values[id]}
                                        className="border-2 w-full border-gray-300 rounded-md py-2 px-3 focus:ring focus:ring-[#F7EDE8]"
                                        placeholder={placeholder}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Business Plan Upload */}
                    <div>
                        <label className="block font-medium">Business Plan:</label>
                        <input
                            type="file"
                            onChange={upload}
                            className="border-2 border-gray-300 rounded-md py-2 px-3 w-full cursor-pointer file:bg-[#F7EDE8] file:px-4 file:py-2 file:border-none file:rounded-lg"
                        />
                        {businessPlan && (
                            <a
                                href={businessPlan}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline mt-2 inline-block"
                            >
                                View Uploaded File
                            </a>
                        )}
                    </div>

                    <hr className="border-gray-300" />

                    {/* Additional Notes */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Additional Notes</h3>
                        <label htmlFor="pastExperience" className="block font-medium">
                            Past Experiences with Similar Projects:
                        </label>
                        <textarea
                            id="pastExperience"
                            onChange={detailsForm.handleChange}
                            value={detailsForm.values.pastExperience}
                            rows={3}
                            className="border-2 w-full border-gray-300 rounded-md py-2 px-3 focus:ring focus:ring-[#F7EDE8]"
                            placeholder="Share any relevant experience..."
                        ></textarea>
                    </div>

                    {/* Agreement & Submit */}
                    <div className="flex flex-col mt-5 space-y-3">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="mr-2 accent-[#F7EDE8]" />
                            I hereby declare that the above information is true to the best of my knowledge.
                        </label>
                        <button
                            type="submit"
                            className="bg-[#F7EDE8] hover:bg-[#f5dacf] text-black px-5 py-3 rounded-lg text-lg font-medium transition-all"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BusinessOwnerDetailsForm;
