import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsFillBellFill } from 'react-icons/bs'
import { IoPeopleSharp } from 'react-icons/io5'


const Postjobs = () => {
  return (
  <>
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
        <h1 className='text-2xl text-orange-600 font-medium flex gap-3 items-center'>
          <IoPeopleSharp className='bg-white text-3xl rounded-4xl p-0.5' />
          Post Job
        </h1>

        <div className='bg-white  p-4 mt-5 rounded-2xl'>
          <div className="relative hidden md:block text-right mt-3 ">
            <input
              placeholder="Search job here"
              className="w-65 text-xm  border outline-none  border-gray-400 pl-4 pr-10 py-2 rounded-3xl bg-gray-200"
            />
            <BiSearch className="absolute top-1/2 right-1 -translate-y-1/2 text-3xl bg-blue-500 rounded-full p-1 text-white cursor-pointer hover:bg-blue-600" />
          </div>
         
        </div>
      </div>
    </div>  
  </>
  )
}

export default Postjobs
