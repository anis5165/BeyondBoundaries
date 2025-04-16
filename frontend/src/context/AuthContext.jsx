'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode'; // Updated import

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentMember, setCurrentMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            const memberData = localStorage.getItem('member');

            if (token && memberData) {
                // Check token expiration
                const decodedToken = jwtDecode(token); // Updated function call
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp > currentTime) {
                    setCurrentMember(JSON.parse(memberData));
                } else {
                    // Token expired
                    localStorage.removeItem('token');
                    localStorage.removeItem('member');
                    router.push('/login');
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('member');
        } finally {
            setLoading(false);
        }
    }, [router]); // Added router to dependency array

    const value = {
        currentMember,
        setCurrentMember,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);