'use client';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentMember, logout } = useAuth();
    const profileRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleViewProfile = () => {
        localStorage.setItem('viewProfileType', currentMember.role);
        router.push(`/view-profile/${currentMember._id}`);
    };

    if (!currentMember) return null;

    return (
        <div className="relative" ref={profileRef}>
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
                            <button
                                onClick={handleViewProfile}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                View Profile
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/partner-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Partner Profile
                            </Link>
                        </>
                    )} 
                    
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