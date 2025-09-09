import React from 'react'
import bgimg from '../assets/bg-img.jpg'

const Navbar002 = () => {
  return (
    <div>
      <div className=" min-h-[33rem] sm:min-h-[44rem] relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-screen-xl px-4 pt-44 sm:pt-42 lg:pt-65">
          {/* Heading */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-white">
              Find the{" "}
              <span className="bg-blue-400 rounded-4xl ">job</span> you love
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mt-2 max-w-2xl">
              Search Through Thousands of Job Opportunities
            </p>
          </div>

          {/* Search Section */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:justify-center">
            <input
              type="text"
              placeholder="Job Title"
              className="border border-gray-400 bg-black/30 text-white placeholder:text-gray-300 p-3 rounded-2xl font-medium w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Location"
              className="border border-gray-400 bg-black/30 text-white placeholder:text-gray-300 p-3 rounded-2xl font-medium w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-500 p-3 rounded-2xl hover:bg-blue-700 cursor-pointer font-medium px-6 transform transition-transform duration-200 hover:scale-105 w-full sm:w-auto text-white">
              Find Job
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar002
