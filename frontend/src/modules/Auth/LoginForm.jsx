'use client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import * as Yup from 'yup';

const LoginForm = () => {
    const { login } = useAuth();
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
                await login(values);
            } catch (error) {
                console.error('Login error:', error);
            }
        }
    });

    return (
        <form onSubmit={loginForm.handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    {...loginForm.getFieldProps('email')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {loginForm.touched.email && loginForm.errors.email && (
                    <div className="text-red-500 text-sm mt-1">{loginForm.errors.email}</div>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    {...loginForm.getFieldProps('password')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {loginForm.touched.password && loginForm.errors.password && (
                    <div className="text-red-500 text-sm mt-1">{loginForm.errors.password}</div>
                )}
            </div>

            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Sign In
            </button>
        </form>
    );
};

export default LoginForm;