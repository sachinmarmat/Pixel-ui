import React from 'react'
import { GiConfirmed } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";


const Aboutchose = () => {
    return (
        <div className='container m-auto flex flex-wrap justify-around mt-5'>
            <div className='flex flex-col gap-4 '>
                <h1 className='text-4xl font-bold '>Why choose Us</h1>
                <div className='flex text-2xl font-medium text-gray-500 items-center gap-2'><GiConfirmed className='text-orange-700' /><p>Wide network of Employers</p></div>
                <div className='flex text-2xl font-medium text-gray-500 items-center gap-2'><GiConfirmed className='text-orange-700' /><p>Verify Job Listing</p></div>
                <div className='flex text-2xl font-medium text-gray-500 items-center gap-2'><GiConfirmed className='text-orange-700' /><p>User Friendly Platform</p></div>
                <div className='flex text-2xl font-medium text-gray-500 items-center gap-2'><GiConfirmed className='text-orange-700' /><p>24/7 Support</p></div>
                <div className='flex text-2xl font-medium text-gray-500 items-center gap-2'><GiConfirmed className='text-orange-700' /><p>Career Resuorces & Guidance</p></div>
               <a href='/Jobsview'> <div className='mt-3'><button className='bg-orange-600 p-3 rounded hover:bg-orange-700 cursor-pointer font-medium pl-4 pr-4 transform transition-transform duration-200 hover:scale-110'>Explore Job</button></div></a>
            </div>
            <div className=' mt-15 flex flex-col gap-4'>
                <h1 className='text-4xl font-bold '>Why choose Us</h1>
                <div className=' flex gap-7 mt-5 '> 
                    <div className=''>
                        <div className='flex gap-4 items-center text-3xl transform transition-transform duration-200 hover:scale-110 cursor-pointer'> <BsPersonCircle className='text-blue-800' />
                            <h1 className='text-3xl font-bold'>50k+</h1></div>
                        <p className='text-gray-700 font-medium mt-1 '>Job Seekers connected</p>
                    </div>
                    <div className='cursor-pointer'>
                        <h1 className='text-3xl font-bold'>100k+</h1>
                        <p className='text-gray-700 font-medium mt-1 '>Verified Jobs List </p>
                    </div>
                </div>
                <div>
                    <div className='flex gap-4 items-center text-3xl transform transition-transform duration-200 hover:scale-110 cursor-pointer'> <FaBuilding className='text-blue-800' />
                        <h1 className='text-3xl font-bold'>10k+</h1></div>
                    <p className='text-gray-700 font-medium mt-1 '>Employers onborded</p></div>
            </div>
        </div > 
    )
}

export default Aboutchose 
