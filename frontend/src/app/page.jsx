'use client'
import React, { useState } from 'react';
import { Globe, Users, CheckCircle, MessageCircle } from 'lucide-react';
import ChatApp from '@/components/ChatApp';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Placeholder for email submission logic
    alert(`Thank you for your interest! We'll contact you at ${email}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="pt-24 pb-16 bg-gradient-to-b mt-10 from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Expand Globally, Connect Locally
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Bridge the gap between global ambitions and local expertise. Find trusted partners who understand regional markets and help your business thrive internationally.
          </p>

          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your business email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </form>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-12 h-12 text-blue-600" />,
                title: "Global Reach",
                description: "Connect with local experts in any market, reducing entry barriers and cultural misunderstandings."
              },
              {
                icon: <Users className="w-12 h-12 text-blue-600" />,
                title: "Perfect Matchmaking",
                description: "Advanced matching algorithm connects you with ideal local partners and influencers."
              },
              {
                icon: <CheckCircle className="w-12 h-12 text-blue-600" />,
                title: "Comprehensive Support",
                description: "From market insights to contract management, we support every stage of international expansion."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-blue-50 rounded-lg hover:shadow-lg transition">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How BeyondBoundaries Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Create Your Profile",
              "Define Market Goals",
              "Find Local Partners",
              "Launch & Succeed"
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
          <div className="max-w-2xl mx-auto bg-blue-50 p-8 rounded-lg">
            <MessageCircle className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <blockquote className="text-xl italic text-gray-800 mb-4">
              "BeyondBoundaries transformed our international expansion strategy. We found the perfect local partners who truly understood our market."
            </blockquote>
            <p className="font-semibold text-gray-700">- Sarah Martinez, Tech Startup CEO</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Go Global?</h2>
          <p className="text-xl mb-8">Start your international journey with confidence</p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition">
            Book a Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">BeyondBoundaries</div>
          <p className="text-gray-400 mb-6">Connecting Businesses Across Borders</p>
          <div className="space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white">Contact</a>
          </div>
          <p className="mt-8 text-gray-500">&copy; 2024 BeyondBoundaries. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;