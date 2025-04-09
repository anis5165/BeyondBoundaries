'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaLinkedin, FaGlobe } from 'react-icons/fa'

const BrowserPage = () => {
    const [businessOwner, setBusinessOwner] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedBusinessType, setSelectedBusinessType] = useState('all')

    const fetchBrowser = async () => {
        try {
            console.log('Fetching data...');
            const response = await axios.get('http://localhost:5000/businessOwner/getall');
            console.log('Response:', response.data);
            
            if (response.data) {
                setBusinessOwner(response.data);
            }
        } catch (err) {
            console.error('Fetch Error:', err);
            toast.error('Failed to fetch business owners');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBrowser();
    }, []);

    // Get unique business types
    const businessTypes = ['all', ...new Set(businessOwner.map(owner => owner.businessType))];

    // Filter business owners based on selected type
    const filteredBusinessOwners = selectedBusinessType === 'all' 
        ? businessOwner
        : businessOwner.filter(owner => owner.businessType === selectedBusinessType);

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
                    <h1 className='text-7xl font-semibold'>Business Profiles</h1>
                    
                    {/* Business Type Filter */}
                    <div className='mt-8'>
                        <select 
                            value={selectedBusinessType}
                            onChange={(e) => setSelectedBusinessType(e.target.value)}
                            className='px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500'
                        >
                            {businessTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type === 'all' ? 'All Business Types' : type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mx-10'>
                    {filteredBusinessOwners.map((owner) => (
                        <div key={owner._id} className='shadow-xl bg-white rounded-lg p-6 hover:shadow-2xl transition-shadow'>
                            <div className='flex items-center gap-4'>
                                <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center'>
                                    <span className='text-2xl'>{owner.fullName?.[0]}</span>
                                </div>
                                <div>
                                    <h2 className='text-xl font-semibold'>{owner.fullName}</h2>
                                    <p className='text-gray-600'>{owner.businessName}</p>
                                </div>
                            </div>
                            
                            <div className='mt-4 space-y-2'>
                                <p className='text-gray-700'>
                                    <span className='font-medium'>Business Type:</span> 
                                    <span className='ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
                                        {owner.businessType}
                                    </span>
                                </p>
                                <p className='text-gray-700'><span className='font-medium'>Country:</span> {owner.country}</p>
                                <p className='text-gray-700'><span className='font-medium'>Target Expansion:</span> {owner.expansionCountry}</p>
                            </div>

                            <div className='mt-4 flex gap-2'>
                                {owner.website && (
                                    <a 
                                        href={owner.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='text-blue-500 hover:text-blue-600'
                                    >
                                        <FaGlobe size={20} />
                                    </a>
                                )}
                                {owner.linkedin && (
                                    <a 
                                        href={owner.linkedin}
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
                                    onClick={() => window.location.href = `/profile/${owner._id}`}
                                >
                                    View Full Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredBusinessOwners.length === 0 && !loading && (
                    <div className='text-center mt-10'>
                        <p className='text-gray-500 text-xl'>
                            {selectedBusinessType === 'all' 
                                ? 'No business owners found' 
                                : `No business owners found for type: ${selectedBusinessType}`}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default BrowserPage