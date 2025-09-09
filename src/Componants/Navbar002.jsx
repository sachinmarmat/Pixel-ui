import React from 'react'
import bgimg from '../assets/bg-img.jpg'

const Navbar002 = () => {
  return (
    <div>
      <div className="min-h-[40rem] relative">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>

        <div className="relative z-10 container mx-auto max-w-screen-xl  pt-55">
          {/* Heading */}
          <div className="mt-10 flex flex-col items-start ml-19 text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-white">
              Find the{" "}
              <span className="bg-blue-400 rounded-4xl px-2">job</span> you love
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 ml-4 mt-2 max-w-2xl">
              Search Through Thousands of Job Opportunities
            </p>
          </div>

          {/* Search Section */}
          <div className="gap-4 mt-11 flex flex-col sm:flex-row items-center ml-5 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Job Title"
              className="border border-gray-600 p-3 rounded-2xl placeholder:text-gray-200 font-medium w-full sm:w-72"
            />
            <input
              type="text"
              placeholder="Location"
              className="border border-gray-600 p-3 rounded-2xl placeholder:text-gray-200 font-medium w-full sm:w-60"
            />
            <button className="bg-blue-500 p-3 rounded-2xl hover:bg-blue-800 cursor-pointer font-medium px-6 transform transition-transform duration-200 hover:scale-105 w-full sm:w-auto text-white">
              Find Job
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar002
