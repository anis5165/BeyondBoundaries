'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold text-gray-200">
                            Beyond Boundaries
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md">
                            Home
                        </Link>
                        <Link href="/about" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md">
                            About
                        </Link>
                        <Link href="/services" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md">
                            Services
                        </Link>
                        <Link href="/browserProfile" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md">
                            BusinessProfile
                        </Link>
                        <Link href="/businessOwnerDetailsForm" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md">
                            BusinessOwner
                        </Link>
                        <Link href="/clientDetailsForm" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md">
                            Client
                        </Link>
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
                            <Link href="/" className="text-gray-200 hover:bg-gray-100 block px-3 py-2 rounded-md">
                                Home
                            </Link>
                            <Link href="/about" className="text-gray-200 hover:bg-gray-100 block px-3 py-2 rounded-md">
                                About
                            </Link>
                            <Link href="/services" className="text-gray-200 hover:bg-gray-100 block px-3 py-2 rounded-md">
                                Services
                            </Link>
                            <Link href="/contact" className="text-gray-200 hover:bg-gray-100 block px-3 py-2 rounded-md">
                                Contact
                            </Link>
                            <Link href="/businessOwnerDetailsForm" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md">
                                BusinessOwner
                            </Link>
                            <Link href="/clientDetailsForm" className="text-gray-200 hover:text-gray-400 px-3 py-2 rounded-md">
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