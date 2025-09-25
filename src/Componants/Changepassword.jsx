import React from 'react'
import { FiSettings } from "react-icons/fi";



export const Changepassword = () => {
    return (
        <div>
            <div className='flex gap-3 text-orange-600 text-3xl items-center font-semibold m-7'>
                <FiSettings />
                <h1 className=''>Setting</h1>
            </div>
            <div className=' bg-gradient-to-t from-blue-600 to-[#5bf0fe] py-25 p-5 rounded-2xl contain-content w-100 ml-20 flex justify-center'>
                <div className='flex flex-col gap-6 justify-center'>
                    <div className=''>
                        {/* <h2 className='text-xm text-gray-300/60 font-medium absolute pt-8 pl-3'>pixel@gmail.com</h2> */}
                        <input type="email" placeholder='Email Address ' className='border outline-none shadow-xm relative max-w-60 border-black/20 p-4   px-3 font-medium rounded' />
                        <p className='text-xs text-white/40 font-medium pl-2 pt-1'>Change email</p>
                    </div>
                    <div className=''>
                        <h2 className='text-xm text-gray-300/60 font-medium absolute pt-8 pl-3'>+ 123-456-789-0</h2>
                        <input type="email" placeholder='Mobile Number ' className='border outline-none shadow-xm relative max-w-60 border-black/20  p-1  pb-8 px-3 font-medium rounded ' />
                    </div>
                    <div className=''>
                        {/* <h2 className='text-xm text-gray-300/60 font-medium absolute pt-8 pl-3'>Password</h2> */}
                        <input type="password" placeholder='Password' className='border outline-none shadow-xm relative max-w-60 border-black/20  p-4 px-3 font-medium rounded' />
                        <p className='text-xs text-white/40 font-medium pl-2 pt-1'>Change password</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
