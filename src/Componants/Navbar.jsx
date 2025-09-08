import React from 'react'
import img from '../assets/img.jpg'

const Navbar = () => {
    return (
        <>


            <div className="container mx-auto relative z-10 text-white items-center ">
                <div className=''>
                    <div className='flex justify-between items-center '>
                        <div className='mt-10'>
                            <img src={img} alt='logo' className='w-12 rounded-3xl cursor-pointer' />
                        </div>
                        <div className='mt-10'>
                            <ul className='flex justify-between gap-9 bg-gray-100/20 p-2 rounded-2xl pl-8 pr-8 font-medium'>
                                <li className='text-black cursor-pointer'><a href='/'>Jobs </a> </li>
                                <li className='hover:text-black cursor-pointer'> <a href='/Aboutus'>About </a>  </li>
                                <li className='hover:text-black cursor-pointer'><a href=''>Contact </a></li>
                                <li className='hover:text-black cursor-pointer'><a href=''>Companies </a></li>
                            </ul></div>
                        <div className='flex gap-5 mt-10'>
                            <button className='hover:bg-red-300 p-3 rounded-2xl text-white hover:text-black font-medium  cursor-pointer bg-gray-100/10'>Log In</button>
                            <button className='bg-blue-500 p-3 rounded-2xl hover:bg-blue-900 text-white font-medium cursor-pointer'>Sign Up</button>
                        </div>
                    </div>


                </div>
            </div>


        </>
    )
}

export default Navbar
