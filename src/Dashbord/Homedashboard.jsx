import React from 'react';
import { NavLink } from 'react-router-dom';
// import minilogo from '../assets/minilogo.png';
import { IoHomeOutline, IoCartOutline } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { BsPeople } from "react-icons/bs";
import { PiStarThin } from "react-icons/pi";
import { HiArrowTurnLeftDown } from "react-icons/hi2";

const Homedashboard = () => {
  return (
    <div className='w-75 bg-[#f8f9fa] px-6 py-10 flex flex-col '>

      <nav className='flex flex-col gap-3'>
        <NavLink
          to='/Dashboard'
          end 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] ${isActive ? 'bg-blue-100/50 text-orange-600' : 'text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <IoHomeOutline className="text-lg" />
          Dashboard
        </NavLink>

        <NavLink
          to='/Dashboard/Profile'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] ${isActive ? 'bg-blue-100/50 text-orange-600' : 'text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <IoCartOutline className="text-lg" />
          Profile
        </NavLink>

        <NavLink
          to='/Dashboard/Jobs'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] ${isActive ? 'bg-blue-100/50 text-orange-600' : 'text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <TfiMenuAlt className="text-lg" />
          Jobs
        </NavLink>

        <NavLink
          to='/Dashboard/Application'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] ${isActive ? 'bg-blue-100/50 text-orange-600' : 'text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <IoCartOutline className="text-lg" />
          Application
        </NavLink>

        <NavLink
          to='/Dashboard/Savedjobs'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] ${isActive ? 'bg-blue-100/50 text-orange-600' : 'text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <IoHomeOutline className="text-lg" />
          Saved Jobs
        </NavLink>

        <NavLink
          to='/Dashboard/Resumebuilder'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] ${isActive ? 'bg-blue-100/50 text-orange-600' : 'text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <BsPeople className="text-lg" />
          Resume Builder
        </NavLink>

        <NavLink
          to='/Dashboard/carrerresources'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] ${isActive ? 'bg-blue-100/50 text-orange-600' : 'text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <PiStarThin className="text-lg" />
          Career Resources
        </NavLink>

        <NavLink
          to='/Dashboard/Satting'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] ${isActive ? 'bg-blue-100/50 text-orange-600' : 'text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <HiArrowTurnLeftDown className="text-lg" />
          Satting
        </NavLink>

        <NavLink
          to='/'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] ${isActive ? 'bg-blue-100/50 text-orange-600' : 'text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <HiArrowTurnLeftDown className="text-lg" />
          Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Homedashboard;