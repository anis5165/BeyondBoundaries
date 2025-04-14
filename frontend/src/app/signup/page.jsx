'use client'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import * as Yup from 'yup'

const Signup = () => {
    const router = useRouter()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        role: Yup.string().oneOf(['business', 'partner'], 'Please select a role').required('Role is required'),
        password: Yup.s////////tring().min(6, 'Password must be at least 6 characters').required('Password is required')
    });

    const SignupForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            role: "",
            password: ""
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('http://localhost:5000/user/add', values);
                
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(response.data));
                
                resetForm();
                toast.success('Registration Successful');

                // Redirect based on role
                if (values.role === 'business') {
                    router.push('/businessOwnerDetailsForm');
                } else if (values.role === 'partner') {
                    router.push('/partnerDetailsForm');
                }
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || 'Registration Failed');
            }
        }
    });

    return (
        <>
            <div className="bg-[url('https://static.vecteezy.com/system/resources/previews/024/140/697/original/abstract-background-illustration-green-background-illustration-abstract-green-background-for-wallpaper-display-landing-page-banner-or-layout-simple-design-graphic-for-display-free-vector.jpg')] bg-cover">
                <div className='flex justify-center items-center h-screen bg-cover'>
                    <div className='border w-1/5 rounded-lg p-8 bg-white/90'>
                        <form className='w-full' onSubmit={SignupForm.handleSubmit}>
                            <h2 className='text-2xl font-bold mb-10 text-center'>Register Here</h2>

                            <label htmlFor="name" className='text-lg'>Name</label>
                            <input
                                type="text"
                                id="name"
                                onChange={SignupForm.handleChange}
                                onBlur={SignupForm.handleBlur}
                                value={SignupForm.values.name}
                                className='border rounded-lg mb-1 p-2 w-full'
                            />
                            {SignupForm.touched.name && SignupForm.errors.name && (
                                <div className="text-red-500 text-sm mb-2">{SignupForm.errors.name}</div>
                            )}

                            <label htmlFor="email" className='text-lg'>Email</label>
                            <input
                                type="email"
                                id="email"
                                onChange={SignupForm.handleChange}
                                onBlur={SignupForm.handleBlur}
                                value={SignupForm.values.email}
                                className='border rounded-lg mb-1 p-2 w-full'
                            />
                            {SignupForm.touched.email && SignupForm.errors.email && (
                                <div className="text-red-500 text-sm mb-2">{SignupForm.errors.email}</div>
                            )}

                            <label htmlFor="role" className='text-lg'>Role</label>
                            <select
                                id="role"
                                onChange={SignupForm.handleChange}
                                onBlur={SignupForm.handleBlur}
                                value={SignupForm.values.role}
                                className='border rounded-lg mb-1 p-2 w-full'
                            >
                                <option value="">Select Role</option>
                                <option value="business">Business Owner</option>
                                <option value="partner">Local Partner</option>
                            </select>
                            {SignupForm.touched.role && SignupForm.errors.role && (
                                <div className="text-red-500 text-sm mb-2">{SignupForm.errors.role}</div>
                            )}

                            <label htmlFor="password" className='text-lg'>Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={SignupForm.handleChange}
                                onBlur={SignupForm.handleBlur}
                                value={SignupForm.values.password}
                                className='border rounded-lg mb-1 p-2 w-full'
                            />
                            {SignupForm.touched.password && SignupForm.errors.password && (
                                <div className="text-red-500 text-sm mb-2">{SignupForm.errors.password}</div>
                            )}

                            <button 
                                type="submit"
                                className='bg-violet-600 hover:bg-violet-800 mt-5 w-full px-4 py-2 text-white rounded-xl transition-colors'
                                disabled={SignupForm.isSubmitting}
                            >
                                {SignupForm.isSubmitting ? 'Registering...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup