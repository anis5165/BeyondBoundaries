'use client';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">BeyondBoundaries</h3>
                        <p className="text-gray-400">
                            Connecting businesses with global partners for sustainable growth and expansion.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/browserProfile" className="text-gray-400 hover:text-white">
                                    Browse Profiles
                                </Link>
                            </li>
                            <li>
                                <Link href="/businessOwnerDetailsForm" className="text-gray-400 hover:text-white">
                                    Register Business
                                </Link>
                            </li>
                            <li>
                                <Link href="/partnerDetailsForm" className="text-gray-400 hover:text-white">
                                    Become a Partner
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="text-gray-400 hover:text-white">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-400 hover:text-white">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-400 hover:text-white">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Email: contact@beyondboundaries.com</li>
                            <li>Phone: +1 (555) 123-4567</li>
                            <li>Location: Global Reach</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} BeyondBoundaries. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;