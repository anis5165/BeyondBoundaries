import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='m-5'>
      <Link href="/businessOwnerDetailsForm" className="bg-gray-900 text-white px-4 py-2 rounded-lg mr-10">Business Owner</Link>
      <Link href="/clientDetailsForm" className="bg-gray-900 text-white px-4 py-2 rounded-lg">Client Form</Link>
    </div>
  )
}

export default page