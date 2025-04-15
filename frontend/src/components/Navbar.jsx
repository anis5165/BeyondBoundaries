'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Profile from './Profile';

const Navbar = () => {
    const { user, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    if (loading) {
        return (
            <nav className="fixed w-full top-0 z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="animate-pulse h-8 w-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="fixed w-full top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            BB
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                                Home
                            </Link>
                            <Link href="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                                About
                            </Link>
                            <Link href="/services" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                                Services
                            </Link>
                            <Link href="/browserProfile" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                                BusinessProfile
                            </Link>
                            <Link href="/businessOwnerDetailsForm" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                                BusinessOwner
                            </Link>
                            <Link href="/partnerDetailsForm" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                                PartnerForm
                            </Link>
                        </div>
                    </div>

                    {/* User Profile or Auth Links */}
                    <div className="flex items-center">
                        {user ? (
                            <Profile />
                        ) : (
                            <div className="flex space-x-4">
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="/" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md">
                                Home
                            </Link>
                            <Link href="/about" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md">
                                About
                            </Link>
                            <Link href="/services" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md">
                                Services
                            </Link>
                            <Link href="/contact" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md">
                                Contact
                            </Link>
                            <Link href="/browserProfile" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md">
                                BusinessProfile
                            </Link>
                            <Link href="/businessOwnerDetailsForm" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md">
                                BusinessOwner
                            </Link>
                            <Link href="/clientDetailsForm" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md">
                                Client
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;