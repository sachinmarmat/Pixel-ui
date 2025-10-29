import React, { useEffect, useState } from 'react'
import bgimg from '../assets/bg-img.jpg'
import { MapPin, Briefcase, IndianRupee } from "lucide-react"; // optional icons (npm i lucide-react)
import { useDispatch, useSelector } from 'react-redux';
import { applyFilters, updateTemporary } from '../redux/slice/jobslice';
import { useNavigate } from 'react-router-dom';

const Navbar002 = () => {
  const navigate = useNavigate()

  // const [findjob, setfindjob] = useState();

  // const jobfind = (e) => {
  //   setfindjob((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  //   console.log(findjob)
  // }
  const dispatch = useDispatch();
  const { temporary } = useSelector((state) => state.job);

  const handleChange = (field, value) => {
    dispatch(updateTemporary({ field, value }));

  };


  const handleFindJob = () => {
    dispatch(applyFilters());
    navigate("/Jobsview");
  };

  useEffect(() => {
    const userData = localStorage.getItem('role')
    if (userData) {

      if (userData === 'admin') { 
        navigate('/Admin');
      } else {
        navigate('/');
      }
    }
  }, [navigate]);

  return (
    <div>
      <div className=" min-h-[35rem] sm:min-h-[45rem] relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>

        {/* Content */}
        <div className="relative  z-10 max-w-screen-xl px-6 pt-44 sm:pt-65 sm:pl-40 items-center sm:items-start text-center sm:text-left lg:pt-67">
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
              value={temporary.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Job Title"
              className="border border-gray-400 bg-black/30 text-white placeholder:text-gray-300 p-3 pl-4 rounded-xl font-medium w-full sm:w-80 focus:outline-none focus:ring-1 focus:ring-blue-400 outline-hidden"
            />

            <input
              type="text"
              name='location'
              value={temporary.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Location"
              className="border border-gray-400 bg-black/30 text-white placeholder:text-gray-300 p-3 pl-4 rounded-xl font-medium w-full sm:w-65 focus:outline-none focus:ring-1 focus:ring-blue-400 outline-hidden"
            />
            <button className="bg-blue-600 p-3 rounded hover:bg-blue-700 cursor-pointer sm:mb-0 mb-8 font-medium px-6 transform transition-transform duration-200 hover:scale-101 w-full sm:w-auto text-white"
              onClick={handleFindJob}
            >

              Find Job
            </button>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar002
