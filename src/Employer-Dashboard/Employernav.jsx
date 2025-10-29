import React, { useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoLogOutSharp } from "react-icons/io5";
import { GrResources } from "react-icons/gr";
import { BsPersonCircle } from "react-icons/bs";
import { PiCirclesFour } from "react-icons/pi";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

const Employernav = () => {
    // const [role, setRole] = useState(true);

    const navigate=useNavigate()

  const linkstyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] 
     ${
       isActive
         ? "text-orange-700  bg-orange-100/30"
         : " text-white hover:bg-blue-400"
     }`;

 const handleLogout = () => { 
    localStorage.clear();
    // setRole(null);
    navigate('/');
  }; 

  return (
    <div>
      <div
        className="
            top-0 left-0 min-h-full bg-gradient-to-t from-[#FF6B00] to-[#195EFA]    sm:px- py-5 sm:py-10 
          transition-transform duration-300 items-center
           sm:w-78 "
      >
        <div className="text-4xl font-semibold text-center text-white mb-12">
          Employer Dashboard
        </div>
        <div className="border-b-2 sm:mb-9 border-orange-300/40"></div>

        <nav className="flex flex-col gap-5  p-3 rounded-2xl sm:px-8">
          <NavLink to="/Employedashboard" className={linkstyle} end>
            <TfiMenuAlt className="text-lg" />
            Post Jobs
          </NavLink>

          <NavLink to="/Employedashboard/Managejobs" className={linkstyle}>
            <BsBookmarkCheckFill className="text-lg" /> Manage Jobs
          </NavLink>

          <NavLink to="/Employedashboard/Application" className={linkstyle}>
            <PiCirclesFour className="text-lg" /> Application
          </NavLink>

          <NavLink to="/Employedashboard/Profile" className={linkstyle}>
            <BsPersonCircle className="text-lg" /> Profile
          </NavLink>

          <NavLink to="/Employedashboard/Settings" className={linkstyle}>
            <GrResources className="text-lg" /> Setting
          </NavLink>

          <NavLink to="/" className={linkstyle} onClick={handleLogout}>
            <IoLogOutSharp className="text-lg" /> Logout
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Employernav;
