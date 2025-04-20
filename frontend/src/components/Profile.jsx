'use client';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentMember, logout } = useAuth();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!currentMember) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2"
            >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {currentMember.name?.[0]?.toUpperCase()}
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{currentMember.name}</p>
                        <p className="text-sm text-gray-500">{currentMember.email}</p>
                    </div>
                    
                    {currentMember.role === 'business' ? (
                        <>
                            <Link 
                                href="/business-profile" 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Business Profile
                            </Link>
                            <Link 
                                href="/business-dashboard" 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link 
                                href="/partner-profile" 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Partner Profile
                            </Link>
                            <Link 
                                href="/partner-dashboard" 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        </>
                    )}

                    <Link 
                        href="/connections" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        My Connections
                    </Link>

                    <Link 
                        href="/messages" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        Messages
                    </Link>

                    <Link 
                        href="/settings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        Settings
                    </Link>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            logout();
                        }}
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