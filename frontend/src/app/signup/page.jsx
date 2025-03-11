import React from 'react'

const Signup = () => {

    

    return (
        <>
            <div className="bg-[url('https://backiee.com/static/wpdb/wallpapers/v2/560x315/326162.jpg')] bg-cover text-white">
            <div className='flex justify-center items-center h-screen  bg-cover'>
                <div className='border w-1/5 rounded-lg p-8'>
                    <form action="" className='w-full '>
                        <h2 className='text-2xl font-bold mb-10 text-center'>Register Here</h2>

                        <label htmlFor="name" className='text-lg'>Name</label>
                        <input 
                            type="text" 
                            id="name"
                            className='border rounded-lg mb-3 p-2 w-full'   
                        />
                        <label htmlFor="email" className='text-lg'>Email</label>
                        <input 
                            type="email" 
                            id="email"
                            className='border rounded-lg mb-3 p-2 w-full'   
                        />
                        <label htmlFor="password" className='text-lg'>Password</label>
                        <input 
                            type="password" 
                            id="password"
                            className='border rounded-lg mb-3 p-2 w-full'   
                        />

                        <button className='bg-violet-600 hover:bg-violet-800 mt-5 w-full px-4 py-2 text-white rounded-xl '>Submit</button>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}

export default Signup