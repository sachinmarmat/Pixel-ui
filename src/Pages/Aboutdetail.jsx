import React from 'react'
import aboutimg from '../assets/about-img.jpg'
import { FaEye } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { GiSeaStar } from "react-icons/gi";
import { BiSolidPlusCircle } from "react-icons/bi";
import { RiPagesFill } from "react-icons/ri";



const Aboutdetail = () => {
    return (
        <div>
            <div className='container m-auto flex justify-between w-[100%]'>
                <div className='w-[50%] mt-10'>
                    <div className='flex flex-col gap-7 w-150 mt-5'>
                        <h1 className='text-4xl font-bold '>Our Company</h1>
                        <p className='flex flex-wrap text-start text-2xl text-gray-500 font-semibold'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat suscipit tenetur numquam maiores harum et,
                            iste, at, repellendus quae tempora voluptate voluptates sunt quas saepe iusto. Natus porro libero consequuntur maxime at autem quidem modi.
                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, est minima? Modi harum, animi molestiae obcaecati iusto ad rerum? Dolore.</p>
                    </div> 
                    <div className='flex flex-col gap-10 mt-15 '>
                        <h1 className='text-4xl font-bold '> Our Mission & Visionv</h1>
                        <div className='flex flex-wrap gap-13 text-xl font-medium'>
                            <div className='flex items-center gap-1 cursor-pointer'>
                                <MdStars className='text-blue-700 hover:text-blue-900 transition-transform duration-200 hover:scale-125' />
                                <h3>integrity</h3>
                            </div>
                            <div className='flex items-center gap-1 cursor-pointer'>
                                <BiSolidPlusCircle className='text-blue-700 transition-transform duration-200 hover:scale-125' />
                                <h3>integrity</h3>
                            </div>
                            <div className='flex items-center gap-1 cursor-pointer'>
                                <RiPagesFill className='text-blue-700 transition-transform duration-200 hover:scale-125' />
                                <h3>integrity</h3>
                            </div>
                            <div className='flex items-center gap-1 cursor-pointer'>
                                <GiSeaStar className='text-blue-700 transition-transform duration-200 hover:scale-125' />
                                <h3>integrity</h3>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='w-[50%] items-center flex flex-col '>
                    <div className='w-110 '>
                        <img src={aboutimg} alt='' className='' />
                    </div>
                    <div className='flex gap-3'>
                        <div className='border border-gray-500 p-1 flex flex-col gap-2 flex-wrap text-center w-45 rounded items-center'>
                            <FaEye className='text-blue-500 text-2xl rounded-full bg-blue-100 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] p-1 cursor-pointer' />
                            <h2 className='text-xl font-bold'>Mission</h2>
                            <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, vitae non!
                                Veritatis a sint quam officia ipsa ad dicta iusto? lorem20</p>
                        </div>
                        <div className='border border-gray-500 p-1 flex flex-col gap-3 flex-wrap text-center w-45 rounded items-center'>
                            <FaEye className='text-blue-500 text-2xl rounded-full bg-blue-100 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] p-1 cursor-pointer' />
                            <h2 className='text-xl font-bold'>Mission</h2>
                            <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, vitae non!
                                Veritatis a sint quam officia ipsa ad dicta iusto?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Aboutdetail
