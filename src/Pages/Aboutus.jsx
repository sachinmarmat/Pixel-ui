import React from 'react'
import Navbar from '../Componants/Navbar'
import Aboutdetail from './Aboutdetail'
import Footer from '../Componants/Footer'
import Aboutchose from './Aboutchose'

const Aboutus = () => {
  return (
    <>
      <div className="mb-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-200 to-blue-600 min-h-[51vh] sm:min-h-[60vh] w-full flex items-center">
          <div className="px-4 py-20 md:py-16 md:px-16 lg:px-32 flex flex-col items-start text-left max-w-5xl">
            <h1 className="text-4xl pt-12 sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-900">
              About Us
            </h1>
            <p className="font-medium text-xl sm:text-lg md:text-2xl text-gray-800">
              Connecting Talent with Opportunities
            </p>
            <p className="text-sl sm:text-base md:text-lg lg:text-xl text-gray-700 mt-3">
              Discover our mission, vision, and values that drive us forward
            </p>
          </div>
        </div>

        {/* About Details Section */}
        <div className="w-full  sm:px-5 md:px-5 lg:px-20 ">
          <Aboutdetail />
          <div className="mt-5">
            <Aboutchose />
          </div>
        </div>

      </div>
    </>
  )
}

export default Aboutus
