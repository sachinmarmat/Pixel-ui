import React from 'react'
import img from '../assets/img.jpg'
import { BsFilePerson } from "react-icons/bs"
import { MdEditDocument } from "react-icons/md"
import { PiHandshakeFill } from "react-icons/pi"

const Feature = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-10 justify-between">
        
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold">Featured Jobs</h1>

          {[1, 2, 3].map((job, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row justify-between border rounded-lg border-gray-400 p-5 gap-6 md:gap-10"
            >
              <div>
                <div className="flex items-center gap-4 font-semibold text-lg md:text-xl mb-3">
                  <img src={img} alt="logo" className="w-12" />
                  <h1>Product Designer</h1>
                </div>
                <p className="font-medium text-gray-700">
                  Luxman Colony, Jaipur, Raj
                </p>
              </div>

              <div className="flex flex-col md:items-end gap-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer">
                  Apply Now
                </button>
                <h2 className="font-semibold">40k–50k / Monthly</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold">Top Companies</h1>
          <div className="mt-6 border rounded-lg p-5 flex flex-wrap gap-6 justify-center sm:justify-start">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo-2014-present.jpg"
              alt="Netflix"
              className="w-28 hover:scale-110 transition"
            />
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.96OxWjEy7in-wy0k-f12ZgHaEK?r=0&pid=ImgDetMain"
              alt="Company"
              className="w-28 hover:scale-110 transition"
            />
            <img
              src="https://www.logo-designer.co/wp-content/uploads/2015/10/Apple-Google-Interbrand-6th-annual-Best-Global-Brands-report.png"
              alt="Apple Google"
              className="w-28 hover:scale-110 transition"
            />
            <img
              src="https://static.vecteezy.com/system/resources/previews/014/018/578/non_2x/microsoft-logo-on-transparent-background-free-vector.jpg"
              alt="Microsoft"
              className="w-28 hover:scale-110 transition"
            />
          </div>

          <div className="mt-12">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-8">
              How it Works
            </h1>
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 items-center justify-center">
              <div className="flex flex-col gap-3 items-center text-center">
                <BsFilePerson className="text-5xl sm:text-6xl text-blue-500 hover:text-blue-800 transition transform hover:scale-110" />
                <h1 className="font-medium text-sm sm:text-base">Register</h1>
              </div>
              <div className="flex flex-col gap-3 items-center text-center">
                <MdEditDocument className="text-5xl sm:text-6xl text-blue-500 hover:text-blue-800 transition transform hover:scale-110" />
                <h1 className="font-medium text-sm sm:text-base">Apply</h1>
              </div>
              <div className="flex flex-col gap-3 items-center text-center">
                <PiHandshakeFill className="text-5xl sm:text-6xl text-blue-500 hover:text-blue-800 transition transform hover:scale-110" />
                <h1 className="font-medium text-sm sm:text-base">Get Hired</h1>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Feature
