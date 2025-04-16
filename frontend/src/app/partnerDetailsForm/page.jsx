'use client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const PartnerDetailsForm = () => {
    const router = useRouter();

    const detailsForm = useFormik({
        initialValues: {
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
            helpDescription: '',
            pastExperience: ''
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(
                    'http://localhost:5000/partner/add',
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

    return (
        <div className="my-16 mt-28 flex flex-col items-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center">Partner Profile</h2>
            <h5 className="bg-[#F7EDE8] py-3 mt-2 px-10 md:px-24 rounded text-center text-sm md:text-base">
                Please Fill Correct Details
            </h5>

            <div className="max-w-4xl w-full mt-10 mx-auto p-6 md:p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
                <form onSubmit={detailsForm.handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {['name', 'email', 'country'].map((field) => (
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
                            {['companyName', 'industry', 'businessRegNo'].map((field) => (
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
                            {['website', 'linkedin', 'experienceYears','availability', 'helpDescription'].map((field) => (
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

                    {/* Additional Notes */}
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-4">Additional Notes</h3>
                        <div className="flex flex-col">
                            <label htmlFor="pastExperience" className="text-sm md:text-lg font-medium">
                                Past Experiences with Similar Projects:
                            </label>
                            <textarea
                                id="pastExperience"
                                onChange={detailsForm.handleChange}
                                value={detailsForm.values.pastExperience}
                                rows={3}
                                className="border border-gray-300 rounded-md py-2 px-3 w-full"
                                placeholder="Describe any relevant past experiences..."
                            />
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

export default PartnerDetailsForm;
