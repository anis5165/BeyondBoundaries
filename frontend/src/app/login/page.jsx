'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const Login = () => {
    const { setCurrentMember } = useAuth();
    const router = useRouter();

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:5000/user/login', values);
                const { member, token } = response.data;

                if (member && token) {
                    localStorage.setItem('member', JSON.stringify(member));
                    localStorage.setItem('token', token);
                    setCurrentMember(member);

                    toast.success('Login successful');

                    if (member.role === 'business') {
                        router.push('/businessOwnerDetailsForm');
                    } else {
                        router.push('/partnerDetailsForm');
                    }
                }
            } catch (error) {
                console.error('Login error:', error);
                toast.error(error.response?.data?.message || 'Login failed');
            }
        }
    });

    return (
        <>
            <div className="bg-[url('https://static.vecteezy.com/system/resources/previews/024/140/697/original/abstract-background-illustration-green-background-illustration-abstract-green-background-for-wallpaper-display-landing-page-banner-or-layout-simple-design-graphic-for-display-free-vector.jpg')] bg-cover">
                <div className='flex justify-center items-center h-screen bg-cover'>
                    <div className='border w-1/5 rounded-lg p-8 bg-white/90'>
                        <form className='w-full' onSubmit={loginForm.handleSubmit}>
                            <h2 className='text-2xl font-bold mb-10 text-center'>Login Here</h2>

                            <label htmlFor="email" className='text-lg'>Email</label>
                            <input
                                type="email"
                                id="email"
                                onChange={loginForm.handleChange}
                                onBlur={loginForm.handleBlur}
                                value={loginForm.values.email}
                                className='border rounded-lg mb-1 p-2 w-full'
                            />
                            {loginForm.touched.email && loginForm.errors.email && (
                                <div className="text-red-500 text-sm mb-2">{loginForm.errors.email}</div>
                            )}

                            <label htmlFor="password" className='text-lg'>Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={loginForm.handleChange}
                                onBlur={loginForm.handleBlur}
                                value={loginForm.values.password}
                                className='border rounded-lg mb-1 p-2 w-full'
                            />
                            {loginForm.touched.password && loginForm.errors.password && (
                                <div className="text-red-500 text-sm mb-2">{loginForm.errors.password}</div>
                            )}

                            <button type="submit" className='bg-blue-500 text-white rounded-lg py-2 px-4 mt-4 w-full'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;