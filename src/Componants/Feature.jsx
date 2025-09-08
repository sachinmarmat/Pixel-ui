import React from 'react'
import img from '../assets/img.jpg';
import { BsFilePerson } from "react-icons/bs";
import { MdEditDocument } from "react-icons/md";
import { PiHandshakeFill } from "react-icons/pi";
import { GrApple } from "react-icons/gr";
import { BsMicrosoft } from "react-icons/bs";





const Feature = () => {
    return (
        <div className='container m-auto'>
            <div className='flex flex-wrap justify-around '>
                <div className='flex flex-col gap-3 '>
                    <h1 className='text-3xl font-semibold '>Fetured Job</h1>
                    <div className=''>
                        <div className='flex justify-between border rounded border-black p-5 items-center gap-28'>
                            <div className=' '>
                                <div className='flex items-center gap-4 font-semibold text-xl mb-3'><img src={img} alt='logo img' className='w-12' />
                                    <h1>Product degine</h1></div>
                                <div> <p className='font-medium text-gray-800'>Luxman colony, jaipur, Raj-</p></div>
                            </div>
                            <div className='flex flex-col items-end gap-5'>
                                <button className='bg-red-600 text-white px-4 py-2 rounded  cursor-pointer hover:bg-red-700'>Apply Now</button>
                                <h2 className='font-semibold'>40k-50K/Monthly</h2>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex justify-between border rounded border-black p-5 items-center gap-28'>
                            <div className=' '>
                                <div className='flex items-center gap-4 font-semibold text-xl mb-3'><img src={img} alt='logo img' className='w-12' />
                                    <h1>Product degine</h1></div>
                                <div> <p className='font-medium text-gray-800'>Luxman colony, jaipur, Raj-</p></div>
                            </div>
                            <div className='flex flex-col items-end gap-5'>
                                <button className='bg-red-600 text-white px-4 py-2 rounded  cursor-pointer  hover:bg-red-700'>Apply Now</button>
                                <h2 className='font-semibold'>40k-50K/Monthly</h2>
                            </div>
                        </div>
                    </div>
                    <div className='inline-block'>
                        <div className='flex justify-between border rounded border-black p-5 items-center gap-28'>
                            <div className=' '>
                                <div className='flex items-center gap-4 font-semibold text-xl mb-3'><img src={img} alt='logo img' className='w-12' />
                                    <h1>Product degine</h1></div>
                                <div> <p className='font-medium text-gray-800'>Luxman colony, jaipur, Raj-</p></div>
                            </div>
                            <div className='flex flex-col items-end gap-5'>
                                <button className='bg-red-600 text-white px-4 py-2 rounded cursor-pointer  hover:bg-red-700  transform transition-transform duration-100  hover:scale-105'>Apply Now</button>
                                <h2 className='font-semibold'>40k-50K/Monthly</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <h1 className='text-3xl font-semibold '>Top companies</h1>
                    <div className='mt-7 flex flex-col gap-10'>
                        <div className='border border-b-gray-500  rounded gap-10 p-5 flex flex-wrap cursor-pointer '>
                            <img src='https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo-2014-present.jpg' alt='logo img' className='w-26 hover:scale-110' />
                            <img src='https://tse2.mm.bing.net/th/id/OIP.96OxWjEy7in-wy0k-f12ZgHaEK?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' alt='logo img' className='w-26 hover:scale-110' />
                            <img src='https://www.logo-designer.co/wp-content/uploads/2015/10/Apple-Google-Interbrand-6th-annual-Best-Global-Brands-report.png' alt='logo img' className='w-26 hover:scale-110' />
                            <img src='https://static.vecteezy.com/system/resources/previews/014/018/578/non_2x/microsoft-logo-on-transparent-background-free-vector.jpg' alt='logo img' className='w-26 hover:scale-110' />
                        </div>
                        <div className=''>
                            <h1 className='text-3xl font-semibold mb-8 '>How it Work</h1>
                            <div className='flex gap-15'>
                                <div className='flex flex-col gap-4 items-center '>
                                    <BsFilePerson className='text-6xl text-blue-500 cursor-pointer hover:text-blue-800 shadow-2xl hover:scale-110' />

                                    <h1 className='font-medium text-sx'> Ragistar</h1>
                                </div>
                                <div className='flex flex-col gap-4 items-center'>
                                    <MdEditDocument className='text-6xl text-blue-500 cursor-pointer hover:text-blue-800 shadow-2xl hover:scale-110 ' />
                                    <h1 className='font-medium text-sx'> Apply</h1>
                                </div>
                                <div className='flex flex-col gap-4 items-center'>
                                    <PiHandshakeFill className='text-6xl text-blue-500 cursor-pointer hover:text-blue-800 shadow-2xl hover:scale-110' />
                                    <h1 className='font-medium text-sx'> Get Hired</h1>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Feature
