'use client';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsOpen(false);   
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={profileRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2"
            >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {user.name?.[0]?.toUpperCase()}
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    
                    <a
                        href={user.role === 'business' ? '/business-profile' : '/partner-profile'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        View Profile
                    </a>
                    
                    <a
                        href={user.role === 'business' ? '/business-dashboard' : '/partner-dashboard'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Dashboard
                    </a>
                    
                    <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;