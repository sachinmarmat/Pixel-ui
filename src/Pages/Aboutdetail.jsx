import React from 'react'
import aboutimg from '../assets/about-img.jpg'
import { FaEye } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { GiSeaStar } from "react-icons/gi";
import { BiSolidPlusCircle } from "react-icons/bi";
import { RiPagesFill } from "react-icons/ri";

const Aboutdetail = () => {    
  return (
    <div className=" mx-auto flex flex-col sm:flex-row flex-wrap justify-around gap-10 px-4 lg:px-12 py-10">
      
      {/* Left Content */}
      <div className="flex-1 flex flex-col gap-10"> 
        {/* Our Company */} 
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold">Our Company</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat suscipit
            tenetur numquam maiores harum et, iste, at, repellendus quae tempora
            voluptate voluptates sunt quas saepe iusto. Natus porro libero consequuntur
            maxime at autem quidem modi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Nobis, est minima? Modi harum, animi molestiae obcaecati
            iusto ad rerum? Dolore.
          </p> 
        </div>

        {/* Mission & Vision */}
        <div className="flex flex-col  md:gap-10 gap-4"> 
          <h1 className="text-3xl md:text-4xl font-bold">Our Mission & Vision</h1>
          <div className="flex flex-wrap gap-8  items-center sm:w-100 text-xl  md:text-2xl md:m- font-medium">
            <div className="flex items-center gap-2 cursor-pointer">
              <MdStars className="text-blue-700 hover:text-blue-900 transition-transform duration-200 hover:scale-125" />
              <h3>Integrity</h3>
            </div>
            <div className="flex items-center sm:pl-22 gap-2 cursor-pointer">
              <BiSolidPlusCircle className="text-blue-700 transition-transform duration-200 hover:scale-125" />
              <h3>Innovation</h3>
            </div> 
            <div className="flex items-center gap-2 cursor-pointer">
              <RiPagesFill className="text-blue-700 transition-transform duration-200 hover:scale-125" />
              <h3>Transparency</h3>
            </div>
            <div className="flex items-center sm:pl-10 gap-2 cursor-pointer">
              <GiSeaStar className="text-blue-700 transition-transform duration-200 hover:scale-125" />
              <h3>Excellence</h3>
            </div>
          </div>
        </div> 
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col items-center gap-6">
        {/* Image */}
        <div className="w-full max-w-lg">
          <img src={aboutimg} alt="About" className="rounded-lg shadow-md w-full" />
        </div> 

        {/* Mission/Vision Cards */} 
        <div className="flex flex-col  sm:flex-row gap-4 sm:w-130 w-full  justify-center">
          <div className="border border-gray-300 p-3 flex  flex-col gap-3 text-center rounded-lg flex-1 shadow-sm bg-white">
            <FaEye className="text-blue-500 text-3xl rounded-full bg-blue-100 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] p-2 mx-auto cursor-pointer" />
            <h2 className="text-lg md:text-xl font-bold">Mission</h2>
            <p className="text-sm md:text-base text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, vitae non!
              Veritatis a sint quam officia ipsa ad dicta iusto?
            </p> 
          </div> 

          <div className="border border-gray-300 p-3 flex flex-col gap-3 text-center rounded-lg flex-1 shadow-sm bg-white">
            <FaEye className="text-blue-500 text-3xl rounded-full bg-blue-100 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] p-2 mx-auto cursor-pointer" />
            <h2 className="text-lg md:text-xl font-bold">Vision</h2>
            <p className="text-sm md:text-base text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, vitae non!
              Veritatis a sint quam officia ipsa ad dicta iusto?
            </p>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Aboutdetail
