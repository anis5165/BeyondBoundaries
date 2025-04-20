'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/utils/api';
import { getLocalStorage, setLocalStorage } from '@/utils/helpers';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentMember, setCurrentMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const member = getLocalStorage('member');
        const token = getLocalStorage('token');

        if (member && token) {
            setCurrentMember(member);
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authAPI.login(credentials);
            const { member, token } = response.data;

            setLocalStorage('member', member);
            setLocalStorage('token', token);
            setCurrentMember(member);

            toast.success('Login successful');

            // Redirect based on role and profile completion
            if (member.role === 'business') {
                router.push('/business-dashboard');
            } else {
                router.push('/partner-dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Login failed');
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            const { member, token } = response.data;

            setLocalStorage('member', member);
            setLocalStorage('token', token);
            setCurrentMember(member);

            toast.success('Registration successful');

            // Redirect to appropriate form based on role
            if (member.role === 'business') {
                router.push('/businessOwnerDetailsForm');
            } else {
                router.push('/partnerDetailsForm');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.response?.data?.message || 'Registration failed');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('member');
        localStorage.removeItem('token');
        setCurrentMember(null);
        router.push('/login');
        toast.success('Logged out successfully');
    };

    const updateProfile = (updatedMember) => {
        setCurrentMember(updatedMember);
        setLocalStorage('member', updatedMember);
    };

    const value = {
        currentMember,
        loading,
        login,
        register,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};