import React from 'react'
import Navbar from '../Componants/Navbar'
import Aboutdetail from './Aboutdetail'
import Footer from '../Componants/Footer'
import Aboutchose from './Aboutchose'

const Aboutus = () => {
  return (
    <>
      <div className='mb-10'>
        <div className='bg-gradient-to-r  from-blue-200  to-blue-600 min-h-[55vh]  w-full'>
          <div className='px-4 py-22 md:px-16 lg:px-32 flex flex-col  items-start  w-full'>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold mb-5'>About Us</h1>
            <p className='font-medium text-lg md:text-2xl '>Connecting Talent with Opportunities</p>
            <p className='text-xl md:text-xl text-gray-700  mt-2'>Discover our missione, vison, value that Drives us forward </p>
          </div>
        </div>
        <div className='w-full'>
          <Aboutdetail />
          <Aboutchose />
        </div>
      </div>
    </>
  )
}

export default Aboutus
