'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import NotificationPanel from '@/modules/Notification/NotificationPanel';
import Profile from './Profile';

const Header = () => {
    const { currentMember } = useAuth();

    return (
        <header className="fixed w-full top-0 z-50 bg-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and brand */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            Beyond<span className="text-gray-800">Boundaries</span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                                Home
                            </Link>
                            <Link href="/browserProfile" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                                Browse Profiles
                            </Link>
                            {!currentMember && (
                                <>
                                    <Link href="/businessOwnerDetailsForm" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                                        Register Business
                                    </Link>
                                    <Link href="/partnerDetailsForm" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                                        Become a Partner
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center space-x-4">
                        {currentMember ? (
                            <>
                                <NotificationPanel />
                                <Profile />
                            </>
                        ) : (
                            <div className="flex space-x-4">
                                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                                    Login
                                </Link>
                                <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;