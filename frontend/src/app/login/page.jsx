'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';

const Login = () => {

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('http://localhost:5000/user/authenticate', values);
                console.log(response.status);
                resetForm();
                toast.success('Login Successful');
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || 'Login Failed');
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
    )
}

export default Login