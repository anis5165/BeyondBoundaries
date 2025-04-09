'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { FaLinkedin, FaGlobe, FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'

const BusinessProfile = () => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/businessOwner/getbyid/${id}`)
            if (response.data) {
                setProfile(response.data)
            }
        } catch (err) {
            console.error('Fetch Error:', err)
            toast.error('Failed to fetch business profile')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-500">Profile not found</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 mt-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-blue-600 text-white px-6 py-4">
                        <h1 className="text-3xl font-bold">{profile.businessName}</h1>
                        <p className="text-xl mt-2">{profile.fullName}</p>
                    </div>

                    {/* Main Content */}
                    <div className="p-6 space-y-6">
                        {/* Business Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Business Details</h2>
                                <div className="space-y-3">
                                    <p><span className="font-medium">Type:</span> {profile.businessType}</p>
                                    <p><span className="font-medium">Registration No:</span> {profile.businessRegNo}</p>
                                    <p><span className="font-medium">Country:</span> {profile.country}</p>
                                    <p><span className="font-medium">Annual Revenue:</span> {profile.annualRevenue}</p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Expansion Plans</h2>
                                <div className="space-y-3">
                                    <p><span className="font-medium">Target Market:</span> {profile.expansionCountry}</p>
                                    <p><span className="font-medium">Investment Budget:</span> {profile.investmentBudget}</p>
                                </div>
                            </div>
                        </div>

                        {/* Business Plan */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Business Plan</h2>
                            <Link href={profile.businessPlan} className="text-gray-700 whitespace-pre-wrap">{profile.businessPlan}</Link>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 pt-4">
                            {profile.website && (
                                <a
                                    href={profile.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    <FaGlobe className="mr-2" /> Website
                                </a>
                            )}
                            {profile.linkedin && (
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    <FaLinkedin className="mr-2" /> LinkedIn
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact Button */}
                <div className="mt-6 text-center">
                    <button
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => window.location.href = `/contact/${profile._id}`}
                    >
                        Contact Business Owner
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BusinessProfile