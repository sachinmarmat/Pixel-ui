import React, { useState } from 'react'
import bgimg from '../assets/bg-img.jpg'
import { MapPin, Briefcase, IndianRupee } from "lucide-react"; // optional icons (npm i lucide-react)

const Navbar002 = () => {

  const [findjob, setfindjob] = useState();
  const [showjob, setshowjob] = useState(false)

  const jobfind = (e) => {
    setfindjob((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(findjob)
  }


  const Jobs = [
    {
      title: "Web Development",
      company: "pixel",
      description: "welcome to pixelgenix",
      location: "Jaipur",
      salary: "40-50k",
      creactedBy: "User",
      createdAt: "24 sep 2025"

    },
    {
      title: "Frontend developer",
      company: "pixel",
      description: "welcome to pixelgenix",
      location: "Jaipur",
      salary: "40-50k",
      creactedBy: "User",
      createdAt: "24 sep 2025"
    },
    {
      title: "Backend Development",
      company: "pixel",
      description: "welcome to pixelgenix",
      location: "Jaipur",
      salary: "40-50k",
      creactedBy: "User",
      createdAt: "24 sep 2025"
    },
  ]



  const find = () => {

    setshowjob(true)
    console.log(findjob)
  }


  return (
    <div>
      <div className=" min-h-[35rem] sm:min-h-[44rem] relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>

        {/* Content */}
        <div className="relative  z-10  max-w-screen-xl px-6 pt-44 sm:pt-68 sm:pl-40 items-center sm:items-start text-center sm:text-left lg:pt-65">
          {/* Heading */}
          <div className="flex flex-col  ">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-white">
              Find the{" "}
              <span className="bg-blue-500 rounded-3xl ">job</span> you love
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mt-2 max-w-2xl">
              Search Through Thousands of Job Opportunities
            </p>
          </div>

          {/* Search Section */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full ">


            <input
              type="text"
              name='jobtitle'
              onChange={jobfind}
              placeholder="Job Title"
              className="border border-gray-400 bg-black/30 text-white placeholder:text-gray-300 p-3 pl-4 rounded-xl font-medium w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              name='location'
              onChange={jobfind}
              placeholder="Location"
              className="border border-gray-400 bg-black/30 text-white placeholder:text-gray-300 p-3 pl-4 rounded-xl font-medium w-full sm:w-65 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-500 p-3 rounded hover:bg-blue-700 cursor-pointer font-medium px-6 transform transition-transform duration-200 hover:scale-105 w-full sm:w-auto text-white"
              onClick={find}  >

              Find Job
            </button>

          </div>
        </div>
      </div>

      <div className='flex flex-row gap-5 justify-center mt-5'>
        {showjob && (

          Jobs.map((items) => (
            <div className="w-full max-w-[50vh] bg-gray-200 rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  {items.title}
                </h2>
                <span className="text-sm text-gray-500">{items.company}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {items.description}
              </p>

              {/* Footer info */}
              <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {items.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={16} /> {items.experience}
                </span>
                <span className="flex items-center gap-1">
                  <IndianRupee size={16} /> {items.salary}
                </span>
              </div>

              {/* View Details Button */}
              <div className="mt-4">
                <button className="border border-red-400 text-red-500 px-4 py-2 rounded-full hover:bg-red-50 transition">
                  View Details
                </button>
              </div>
            </div>

          ))

        )}
      </div>

    </div>
  )
}

export default Navbar002
