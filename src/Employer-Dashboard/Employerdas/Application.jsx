import React from 'react'
import { BiSearch } from 'react-icons/bi';
import { BsFillBellFill } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";


const Application = () => {
  return (
    <div className='bg-blue-200 min-h-screen  '>
      <div className=' flex justify-between text-3xl  px-12 py-10 items-center'>
        <h1 className='font-bold'> 
          PixelGenix 
        </h1>
        <p>  
          <BsFillBellFill className='text-gray-500' />
        </p>
 
      </div>
      <div className='border-b-2 border-gray-400'></div>


      <div className='px-8 pt-15 pb-8'>
        <h1 className='text-2xl text-orange-600 font-medium flex gap-2 items-center'>
          <IoPeopleSharp className='bg-white text-3xl rounded-4xl p-0.5' />
          Application
        </h1>

        <div className='bg-white  p-4 mt-5 rounded-2xl'>
          <div className="relative hidden md:block text-right mt-3 ">
            <input
              placeholder="Search job here"
              className="w-65 text-xm  border outline-none  border-gray-400 pl-4 pr-10 py-2 rounded-3xl bg-gray-200"
            />
            <BiSearch className="absolute top-1/2 right-1 -translate-y-1/2 text-3xl bg-blue-500 rounded-full p-1 text-white cursor-pointer hover:bg-blue-600" />
          </div>
          <div className='mt-8 px-1'>
            <div className='flex justify-between mt-5  bg-blue-300 p-4 px-5 rounded-t-2xl'>
              <h1 className='text-xl font-medium'>Job Title</h1>
              <h1 className='text-xl font-medium'>Date Posted</h1>
              <h1 className='text-xl font-medium'>Status</h1>
            </div>

            <div className='px-3 pt-5 flex flex-col gap-5'>
              <div className='flex justify-between text-xm font-medium  py-2 items-center'>
                <h1 className='flex flex-col '>Raghav Sharma<span className='text-gray-500 text-xs'>Frontend Developer</span></h1>
                <h1 className=''>24 sep 2025</h1>
                <button className='bg-green-400 p-o.5 px-2 rounded-2xl w-25'>
                  <h1 className=''>Active</h1></button>
              </div>
              <div className='flex justify-between text-xm font-medium  py-2 items-center'>
                <h1 className='flex flex-col '>Deva joshwal<span className='text-gray-500 text-xs'>UI Developer</span></h1>
                <h1 className=''>24 sep 2025</h1>
                <button className='bg-red-400 p-o.5 px-2 rounded-2xl w-25'>
                  <h1 className=''>Shortlisted</h1></button>
              </div>
              <div className='flex justify-between text-xm font-medium  py-2 items-center'>
                <h1 className='flex flex-col '>Sachin Marmat<span className='text-gray-500 text-xs'>FullStack Developer</span></h1>
                <h1 className=''>24 sep 2025</h1>
                <button className='bg-blue-400 p-o.5 px-2 rounded-2xl w-25'>
                  <h1 className=''>Acepted</h1></button>
              </div>
              <div className='flex justify-between text-xm font-medium  py-2 items-center'>
                <h1 className='flex flex-col '>RAj Dushyant<span className='text-gray-500 text-xs'>Marketing</span></h1>
                <h1 className=''>2 sep 2025</h1>
                <button className='bg-yellow-500 p-o.5 px-2 rounded-2xl w-25'>
                  <h1 className=''>Rejected</h1></button>
              </div>
              <div className='flex justify-between text-xm font-medium  py-2 items-center'>
                <h1 className='flex flex-col '>Raghav chadda<span className='text-gray-500 text-xs'>Backend</span></h1>
                <h1 className=''>11 sep 2025</h1>
                <button className='bg-green-400 p-o.5 px-2 rounded-2xl w-25'>
                  <h1 className=''>Active</h1></button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Application
