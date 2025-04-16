'use client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const BusinessOwnerDetailsForm = () => {
    const router = useRouter();

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
            businessPlan: ''
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(
                    'http://localhost:5000/businessOwner/add',
                    values
                );

                if (response.data) {
                    resetForm();
                    toast.success('Details submitted successfully');
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to submit details');
            }
        }
    });

    const upload = (e) => {
        const file = e.target.files[0];
        
        // Check file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Please upload a PDF or Word document');
            return;
        }

        // Check file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('File size should be less than 10MB');
            return;
        }

        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'Mernbatch8');
        fd.append('cloud_name', 'dgx8094we');

        toast.loading('Uploading file...');

        axios.post('https://api.cloudinary.com/v1_1/dgx8094we/image/upload', fd)
            .then((result) => {
                toast.dismiss();
                toast.success('File uploaded successfully');
                detailsForm.setFieldValue('businessPlan', result.data.url);
            })
            .catch((err) => {
                toast.dismiss();
                console.error(err);
                toast.error('Failed to upload file');
            });
    };

    return (
        <div className="my-16 mt-28 flex flex-col items-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center">Business Owner Profile</h2>
            <h5 className="bg-[#F7EDE8] py-3 mt-2 px-10 md:px-24 rounded text-center text-sm md:text-base">
                Please Fill Correct Details
            </h5>

            <div className="max-w-4xl w-full mt-10 mx-auto p-6 md:p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
                <form onSubmit={detailsForm.handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {['fullName', 'email', 'country'].map((field) => (
                                <div key={field} className="flex flex-col">
                                    <label htmlFor={field} className="text-sm md:text-lg font-medium">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                                    </label>
                                    <input
                                        type="text"
                                        id={field}
                                        onChange={detailsForm.handleChange}
                                        value={detailsForm.values[field]}
                                        className="border border-gray-300 rounded-md py-2 px-3 w-full"
                                        placeholder={`Enter your ${field}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr />
                    {/* Business Details */}
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold mb-4">Business Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {['businessName', 'businessType', 'businessRegNo'].map((field) => (
                                <div key={field} className="flex flex-col">
                                    <label htmlFor={field} className="text-sm md:text-lg font-medium">
                                        {field.replace(/([A-Z])/g, ' $1')}:
                                    </label>
                                    <input
                                        type="text"
                                        id={field}
                                        onChange={detailsForm.handleChange}
                                        value={detailsForm.values[field]}
                                        className="border border-gray-300 rounded-md py-2 px-3 w-full"
                                        placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr />

                    {/* Project Requirements */}
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold mb-4">Project Requirements</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {['website', 'linkedin', 'annualRevenue', 'expansionCountry', 'investmentBudget'].map((field) => (
                                <div key={field} className="flex flex-col">
                                    <label htmlFor={field} className="text-sm md:text-lg font-medium">
                                        {field.replace(/([A-Z])/g, ' $1')}:
                                    </label>
                                    <input
                                        type="text"
                                        id={field}
                                        onChange={detailsForm.handleChange}
                                        value={detailsForm.values[field]}
                                        className="border border-gray-300 rounded-md py-2 px-3 w-full"
                                        placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr />

                    {/* File Upload Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg md:text-xl font-semibold mb-4">Business Plan Upload</h2>
                        <div className="flex flex-col space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <label htmlFor="upload" className="cursor-pointer">
                                    <div className="space-y-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <div className="text-gray-600">
                                            <span className="font-medium">Click to upload</span> or drag and drop
                                        </div>
                                        <p className="text-sm text-gray-500">PDF, DOC, DOCX (MAX. 10MB)</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        onChange={upload} 
                                        id="upload" 
                                        className="hidden" 
                                        accept=".pdf,.doc,.docx"
                                    />
                                </label>
                            </div>
                            
                            {detailsForm.values.businessPlan && (
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-700">File uploaded successfully</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => detailsForm.setFieldValue('businessPlan', '')}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Declaration & Submit Button */}
                    <div className="mt-5 flex flex-col items-center">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="w-5 h-5 accent-[#F7EDE8]" required />
                            <span className="text-sm md:text-base">I hereby declare that the above information is true.</span>
                        </label>
                        <button
                            type="submit"
                            className="bg-[#F7EDE8] hover:bg-[#f5dacf] text-black font-semibold px-5 py-2 w-48 mt-5 rounded-lg transition-all duration-200"
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
