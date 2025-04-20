'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaLinkedin, FaGlobe } from 'react-icons/fa'

const BrowserPartnersPage = () => {
    const [partners, setPartners] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedIndustry, setSelectedIndustry] = useState('all')

    const fetchPartners = async () => {
        try {
            const response = await axios.get('http://localhost:5000/partner/getall');
            if (response.data) {
                setPartners(response.data);
            }
        } catch (err) {
            console.error('Fetch Error:', err);
            toast.error('Failed to fetch partners');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPartners();
    }, []);   

    // Get unique industries
    const industries = ['all', ...new Set(partners.map(partner => partner.industry))];

    // Filter partners based on selected industry
    const filteredPartners = selectedIndustry === 'all' 
        ? partners
        : partners.filter(partner => partner.industry === selectedIndustry);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <>
            <div className='mt-28 px-4'>
                <div className='text-center'>
                    <h1 className='text-7xl font-semibold'>Partner Profiles</h1>
                    
                    {/* Industry Filter */}
                    <div className='mt-8'>
                        <select 
                            value={selectedIndustry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            className='px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500'
                        >
                            {industries.map((industry) => (
                                <option key={industry} value={industry}>
                                    {industry === 'all' ? 'All Industries' : industry}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mx-10'>
                    {filteredPartners.map((partner) => (
                        <div key={partner._id} className='shadow-xl bg-white rounded-lg p-6 hover:shadow-2xl transition-shadow'>
                            <div className='flex items-center gap-4'>
                                <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center'>
                                    <span className='text-2xl'>{partner.name?.[0]}</span>
                                </div>
                                <div>
                                    <h2 className='text-xl font-semibold'>{partner.name}</h2>
                                    <p className='text-gray-600'>{partner.companyName}</p>
                                </div>
                            </div>
                            
                            <div className='mt-4 space-y-2'>
                                <p className='text-gray-700'>
                                    <span className='font-medium'>Industry:</span> 
                                    <span className='ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
                                        {partner.industry}
                                    </span>
                                </p>
                                <p className='text-gray-700'><span className='font-medium'>Country:</span> {partner.country}</p>
                                <p className='text-gray-700'><span className='font-medium'>Experience:</span> {partner.experienceYears} years</p>
                                <p className='text-gray-700'><span className='font-medium'>Availability:</span> {partner.availability}</p>
                            </div>

                            <div className='mt-4 flex gap-2'>
                                {partner.website && (
                                    <a 
                                        href={partner.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='text-blue-500 hover:text-blue-600'
                                    >
                                        <FaGlobe size={20} />
                                    </a>
                                )}
                                {partner.linkedin && (
                                    <a 
                                        href={partner.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='text-blue-500 hover:text-blue-600'
                                    >
                                        <FaLinkedin size={20} />
                                    </a>
                                )}
                            </div>

                            <div className='mt-4'>
                                <button 
                                    className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full'
                                    onClick={() => window.location.href = `/profile/${partner._id}`}
                                >
                                    View Full Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPartners.length === 0 && !loading && (
                    <div className='text-center mt-10'>
                        <p className='text-gray-500 text-xl'>
                            {selectedIndustry === 'all' 
                                ? 'No partners found' 
                                : `No partners found in industry: ${selectedIndustry}`}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default BrowserPartnersPage