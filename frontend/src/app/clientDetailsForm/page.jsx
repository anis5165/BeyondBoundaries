'use client';
import { useFormik } from 'formik';
import React from 'react'
import toast from "react-hot-toast";
import axios from 'axios';
const ClientDetailsForm = () => {


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
            helpDescription: ''
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            axios.post('http://localhost:5000/clientdetails/add', values)
                .then((result) => {
                    console.log(result.status)
                    resetForm();
                    toast.success('Details Submitted Successfully')
                }).catch((err) => {
                    console.log(err);
                    toast.error('Error Submitting Details')
                });
        }
    }

    )

    return (
        <>
            <div className='my-16 flex flex-col justify-center items-center'>
                <h2 className='text-5xl font-bold '>Client Profile</h2>
                <h5 className='bg-[#F7EDE8] py-3 mt-2 px-24 rounded'>Please Fill Correct Details</h5>
                <div className='max-w-[80%] mt-10 mx-auto p-8 border border-[black] rounded'>
                    <form action="" onSubmit={detailsForm.handleSubmit}>
                        <div className='mb-5'>
                            <h2 className='text-xl font-semibold'>Personal Information</h2>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                                <span>
                                    <label htmlFor="name" className='text-lg mr-3'>Name: </label>
                                    <input
                                        type="text"
                                        id='name'
                                        onChange={detailsForm.handleChange}
                                        value={detailsForm.values.name}
                                        className='border-2 w-full md:w-2/3 border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter your name'
                                    />
                                </span>

                                <span>
                                    <label htmlFor="email" className='text-lg mr-3'>Email: </label>
                                    <input
                                        type="email"
                                        id='email'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.email}
                                        className='border-2 w-full md:w-2/3 border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter your email'
                                    />
                                </span>

                                <span>
                                    <label htmlFor="country" className='text-lg mr-3'>Country: </label>
                                    <input
                                        type="text"
                                        id='country'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.country}
                                        className='border-2 w-full md:w-2/3 border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter your location'

                                    />
                                </span>
                            </div>
                        </div>
                        <hr />

                        <div className='my-5'>
                            <h2 className='text-xl font-semibold'>Business Details</h2>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                                <span className='col-span-1'>
                                    <label htmlFor="companyName" className='text-lg mr-3'>Company Name:</label>
                                    <input
                                        type="text"
                                        id='companyName'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.companyName}
                                        className='border-2 w-full md:w-auto border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter your company name'
                                    />
                                </span>

                                <span className='col-span-1'>
                                    <label htmlFor="industry" className='text-lg mr-3'>Industry/Sector:</label>
                                    <input
                                        type="text"
                                        id='industry'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.industry}
                                        className='border-2 w-full md:w-auto border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter your industry/sector'
                                    />
                                </span>

                                <span className='col-span-1'>
                                    <label htmlFor="businessRegNo" className='text-lg mr-3'>Business Registration No.:</label>
                                    <input
                                        type="text"
                                        id='businessRegNo'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.businessRegNo}
                                        className='border-2 w-full md:w-2/5 border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter your business registration number'

                                    />
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className='my-5'>
                            <h2 className='text-xl font-semibold'>Project Requirements</h2>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                                <span>
                                    <label htmlFor="website" className='text-lg mr-3'>website: </label>
                                    <input
                                        type="text"
                                        id='website'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.website}
                                        className='border-2 w-full md:w-1/2 border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter services needed'
                                    />
                                </span>
                                <span>
                                    <label htmlFor="linkedin" className='text-lg mr-3'>linkedin: </label>
                                    <input
                                        type="text"
                                        id='linkedin'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.linkedin}
                                        className='border-2 w-full md:w-1/3 border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter project scope and objectives'
                                    />
                                </span>
                                <span>
                                    <label htmlFor="experienceYears" className='text-lg mr-3'>experienceYears: </label>
                                    <input
                                        type="text"
                                        id='experienceYears'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.experienceYears}
                                        className='border-2 w-full md:w-1/2 border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter budget range'
                                    />
                                </span>
                                <span>
                                    <label htmlFor="investmentCapacity" className='text-lg mr-3'>investmentCapacity: </label>
                                    <input
                                        type="text"
                                        id='investmentCapacity'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.investmentCapacity}
                                        className='border-2 w-full md:w-auto border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter preferred start and end dates'
                                    />
                                </span>
                                <span>
                                    <label htmlFor="availability" className='text-lg mr-3'>availability: </label>
                                    <input
                                        type="text"
                                        id='availability'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.availability}
                                        className='border-2 w-full md:w-auto border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter specific skills'
                                    />
                                </span>
                                <span>
                                    <label htmlFor="helpDescription" className='text-lg mr-3'>helpDescription: </label>
                                    <input
                                        type="text"
                                        id='helpDescription'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.helpDescription}
                                        className='border-2 w-full md:w-1/2 border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter expertise required'
                                    />
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className='mt-5 '>
                            <h3 className='text-xl font-semibold mb-8'>Additional Notes</h3>
                            <span className='grid '>
                                <label htmlFor="pastExperience" className='text-lg mr-3'>Past Experiences with Similar Projects: </label>
                                <textarea
                                    name=""
                                    id="pastExperience"
                                    onChange={detailsForm.handleChange}
                                    values={detailsForm.values.pastExperience}
                                    rows={3}
                                    cols={5}
                                    className='border-2 w-full md:w-1/2 border-[#F8F8F9] rounded-md py-1 px-2'

                                ></textarea>
                            </span>

                        </div>
                        <div className='flex flex-col mt-10 '>
                            <span><input type="checkbox" accent="bg-[#F7EDE8]" className='mr-3' />i hereby declare that the above mentioned information is true to the best of my knowledge.</span>
                            <button className='bg-[#F7EDE8] hover:bg-[#f5dacf] text-black px-5 py-2 w-56 mt-5 rounded-lg'>Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default ClientDetailsForm