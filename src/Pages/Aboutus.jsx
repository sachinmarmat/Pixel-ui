import React from 'react'
import Navbar from '../Componants/Navbar'
import Aboutdetail from './Aboutdetail'
import Footer from '../Componants/Footer'
import Aboutchose from './Aboutchose'

const Aboutus = () => {
  return (
    <>
      <div className='bg-gradient-to-r  from-blue-200  to-blue-600 h-120'>
        <Navbar />
        <div>
          <div className='mt-28 justify-center ml-25 place-items-baseline '>
            <h1 className='text-7xl font-bold mb-5'>About Us</h1>
            <p className='font-medium text-2xl '>Connecting Talent with Opportunities</p>
            <p className='text-xl text-gray-700  mt-2'>Discover our missione, vison, value that Drives us forward </p>
          </div>
        </div>
      </div>
      <Aboutdetail />
      <Aboutchose/>
      <Footer/>
    </>
  )
}

export default Aboutus
