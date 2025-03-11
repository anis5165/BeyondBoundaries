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
            location: '',
            companyName: '',
            industry: '',
            businessRegNo: '',
            services: '',
            projectScope: '',
            budget: '',
            startDate: '',
            skills: '',
            expertise: '',
            pastExperience: ''
        },
        onSubmit: (values, {resetForm}) => {
            console.log(valuse)
            axios.post('http://localhost:4000/client/details', values)
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
                                    <label htmlFor="location" className='text-lg mr-3'>Location: </label>
                                    <input
                                        type="text"
                                        id='location'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.location}
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
                                    <label htmlFor="services" className='text-lg mr-3'>Services Needed: </label>
                                    <input
                                        type="text"
                                        id='services'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.services}
                                        className='border-2 w-full md:w-1/2 border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter services needed'
                                    />
                                </span>
                                <span>
                                    <label htmlFor="projectScope" className='text-lg mr-3'>Project Scope & Objective: </label>
                                    <input
                                        type="projectScope"
                                        id='projectScope'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.projectScope}
                                        className='border-2 w-full md:w-1/3 border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter project scope and objectives'
                                    />
                                </span>
                                <span>
                                    <label htmlFor="budget" className='text-lg mr-3'>Budget Range: </label>
                                    <input
                                        type="text"
                                        id='budget'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.budget}
                                        className='border-2 w-full md:w-1/2 border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter budget range'
                                    />
                                </span>
                                <span>
                                    <label htmlFor="startDate" className='text-lg mr-3'>Preferred Start Dates: </label>
                                    <input
                                        type="Date"
                                        id='startDate'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.startDate}
                                        className='border-2 w-full md:w-auto border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter preferred start and end dates'
                                    />
                                </span>
                                <span>
                                    <label htmlFor="skills" className='text-lg mr-3'>Specific Skills: </label>
                                    <input
                                        type="text"
                                        id='skills'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.skills}
                                        className='border-2 w-full md:w-auto border-[#F8F8F9] rounded-md py-1 px-2'
                                        placeholder='Enter specific skills'
                                    />
                                </span>
                                <span>
                                    <label htmlFor="expertise" className='text-lg mr-3'>Expertise Required: </label>
                                    <input
                                        type="text"
                                        id='expertise'
                                        onChange={detailsForm.handleChange}
                                        values={detailsForm.values.expertise}
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
                    </form>

                    <div className='flex flex-col mt-10 '>
                        <span><input type="checkbox" accent="bg-[#F7EDE8]"  className='mr-3' />i hereby declare that the above mentioned information is true to the best of my knowledge.</span>
                        <button className='bg-[#F7EDE8] hover:bg-[#f5dacf] text-black px-5 py-2 w-56 mt-5 rounded-lg'>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientDetailsForm