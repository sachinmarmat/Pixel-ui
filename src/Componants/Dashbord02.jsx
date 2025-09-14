import React from 'react'
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaArrowTrendUp } from "react-icons/fa6";


const Dashbord02 = () => {
    return (
        <div className='flex justify-around mt-10 items-start'>
            <div className=''>
                <h1 className='text-3xl font-bold  pl-4 pb-9 py-2 '>
                    Recommended Jobs
                </h1>
                <div className='flex flex-col gap-3 items-center '>
                    <div className='flex flex-col gap-6 bg-gray-100/80 p-6 rounded-2xl w-120'>
                        <div className='flex flex-col gap-3 '><h1 className='text-xl font-bold text-gray-900 flex gap-3'><span className=''><BsFillFileEarmarkCodeFill className='text-5xl bg-orange-600 p-1 rounded' /></span>Frontend Developer<br /> Shyam Nagar </h1>
                            <h2 className='text-[16px] font-semibold text-gray-900 pl-13'>Jaipur, Raj.</h2></div>
                        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent"></div>

                        <div className='flex justify-between items-center'>
                            <h3 className='font-semibold text-xm '><span className='text-blue-500 pr-1'>to </span>  Pixel</h3>
                            <button className="bg-orange-600 font- px-4 py-2 rounded hover:bg-orange-700 transition cursor-pointer">
                                Apply now</button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 bg-gray-100/80 p-6 rounded-2xl w-120'>
                        <div className='flex flex-col gap-3 '><h1 className='text-xl font-bold text-gray-900 flex gap-3'><span className=''><BsFillFileEarmarkCodeFill className='text-5xl bg-orange-600 p-1 rounded' /></span>Frontend Developer<br /> Shyam Nagar </h1>
                            <h2 className='text-[16px] font-semibold text-gray-900 pl-13'>New-Delhi, Delhi.</h2></div>
                        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent"></div>

                        <div className='flex justify-between items-center'>
                            <h3 className='font-semibold text-xm '><span className='text-blue-500 pr-1'>to </span>  Pixel genix</h3>
                            <button className="bg-orange-600 font- px-4 py-2 rounded hover:bg-orange-700 transition cursor-pointer">
                                Apply now</button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 bg-gray-100/80 p-6 rounded-2xl w-120'>
                        <div className='flex flex-col gap-3 '><h1 className='text-xl font-bold text-gray-900 flex gap-3'><span className=''><BsFillFileEarmarkCodeFill className='text-5xl bg-orange-600 p-1 rounded' /></span>Frontend Developer<br /> Shyam Nagar </h1>
                            <h2 className='text-[16px] font-semibold text-gray-900 pl-13'>Udaypur, Raj.</h2></div>
                        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent"></div>

                        <div className='flex justify-between items-center'>
                            <h3 className='font-semibold text-xm '><span className='text-blue-500 pr-1'>to </span>  Genix</h3>
                            <button className="bg-orange-600 font- px-4 py-2 rounded hover:bg-orange-700 transition cursor-pointer">
                                Apply now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <h1 className='text-3xl font-bold  pl-4 pb-8 '>Recent Applicarion</h1>
                <div className='bg-gray-100/50 p-11 rounded-3xl flex flex-col gap-11 w-105 '>
                    <div className=' flex flex-col gap-3 items-start '>
                        <h1 className='text-[22px] font-bold text-gray-900 cursor-pointer  hover:scale-105'>
                            Product Designer
                        </h1>
                        <p className='bg-blue-200 p-1 px-4 text-blue-600 font-medium rounded-2xl items-center text-center text-xs'>Under Review</p>
                    </div>
                    <div className=' flex flex-col gap-3 items-start '>
                        <h1 className='text-[22px] font-bold text-gray-900 cursor-pointer hover:scale-105'>
                            Accepted
                        </h1>
                        <p className='bg-blue-200 p-1 px-4 text-blue-600 font-medium rounded-2xl items-center text-center text-xs'>VX Desiner</p>
                    </div>
                    <div className=' flex flex-col gap-3 items-start'>
                        <h1 className='text-[22px] font-bold text-gray-900 cursor-pointer  hover:scale-105'>
                            Intrview Schedued
                        </h1>
                        <p className='bg-blue-200 p-1 px-4 text-blue-600 font-medium rounded-2xl items-center text-center text-xs'>Under Review</p>
                    </div>
                </div>
                <h1 className='text-3xl font-bold  pl-4 pt-11  py-5 '>
                    Carrer Resources</h1>
                <div className='bg-gray-100/50 p-8 rounded-3xl flex flex-col gap-5 w-105 '>
                    <h1 className='text-[20px] font-bold text-gray-800 text-center flex gap-4 items-center cursor-pointer'>
                        <span> <FaAddressBook className='text-3xl text-blue-600' /></span>  Resume Writing Guide </h1>
                    <p className='border-gray-300  border-b max-w-70  '></p>
                    <h1 className='text-[20px] font-bold text-gray-800 text-center flex gap-4 items-center cursor-pointer'>
                        <span><MdEditDocument className='text-3xl text-blue-600' /> </span>  Interview Prepration  </h1>
                    <p className='border-gray-300  border-b max-w-70  '></p>

                    <h1 className='text-[20px] font-bold text-gray-800 text-center flex gap-4 items-center cursor-pointer'>
                        <span><HiCurrencyDollar className='text-3xl text-blue-600' /> </span>  Salary insights </h1>
                    <p className='border-gray-300  border-b max-w-70  '></p>

                    <h1 className='text-[20px] font-bold text-gray-800 text-center flex gap-4 items-center cursor-pointer'>
                        <span><FaArrowTrendUp className='text-3xl text-blue-600' /> </span> Job Market Trand </h1>
                </div>
            </div>



        </div>
    )
}

export default Dashbord02
