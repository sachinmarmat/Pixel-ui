import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoCartOutline } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { HiMenu } from "react-icons/hi";       // 3-dot/hamburger icon
import { HiX } from "react-icons/hi";          // Close icon
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { IoLogOutSharp } from "react-icons/io5";
import { GrResources } from "react-icons/gr";
import { BsPersonCircle } from "react-icons/bs";
import { PiCirclesFour } from "react-icons/pi";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { GrDocumentUser } from "react-icons/gr";



const Homedashboard = () => {
  const [open, setOpen] = useState(true); 
  const [active, setActive] = useState("notifications");


  const linkstyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] 
     ${isActive ? 'bg-blue-100/50 text-orange-600' : 'text-blue-600 hover:bg-gray-100'}`;

  return (
    <>
      {/* Top bar visible only on mobile */}
      <div className="sm:hidden inline-block contain-inline-size justify-between  relative">
        <h1 className="font-bold text-xl text-blue-600 sm:hidden flex absolute top-0">  Dashboard</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <HiX className="text-2xl absolute top-2 left-40" /> : <HiMenu className="text-2xl absolute top-5 left-35 " />}
        </button>
      </div>

      {/* Sidebar: always visible on sm+, slide-in menu on mobile */}
      <div
        className={`
            top-0 left-0 max:h-full w-48  bg-[#f8f9fa] px-1 sm:px-6 py-5 sm:py-10 
          transition-transform duration-300 sm:pl-5
          ${open ? "translate-x-0" : "-translate-x-full "} 
          sm:translate-x-0 sm:relative sm:w-72  
        `}
      >
        <nav className="flex flex-col gap-3">
          <NavLink to="/Dashboard" end className={linkstyle}>
            <ImHome className="text-lg" /> Dashboard
          </NavLink>

          <NavLink to="/Dashboard/Profile" className={linkstyle}>
            <BsPersonCircle className="text-lg" /> Profile
          </NavLink>

          <NavLink to="/Dashboard/Jobs" className={linkstyle}>
            <TfiMenuAlt className="text-lg" /> Jobs
          </NavLink> 

          <NavLink to="/Dashboard/Application" className={linkstyle}>
            <PiCirclesFour className="text-lg" /> Application
          </NavLink>

          <NavLink to="/Dashboard/Savedjobs" className={linkstyle}>
            <BsBookmarkCheckFill className="text-lg" /> Saved Jobs
          </NavLink>

          <NavLink to="/Dashboard/Resumebuilder" className={linkstyle}>
            <GrDocumentUser className="text-lg" /> Resume Builder
          </NavLink>

          <NavLink to="/Dashboard/carrerresources" className={linkstyle}>
            <GrResources className="text-lg" /> Career Resources
          </NavLink> 

          <div className="w-full">
            {/* Top link that toggles the dropdown */}
            <NavLink
            to="/Dashboard/Satting" 
              onClick={() => setOpen(!open)} 
             className={linkstyle}  
            >
              <span className="flex items-center gap-2">
                <FiSettings className="text-lg" /> 
                Settings
              </span>
              <MdOutlineKeyboardArrowDown
                className={`text-xl transition-transform duration-300
                      ${open ? "rotate-180" : {}}`}
              />
            </NavLink>

            {/* Dropdown items */}
            {!open && (
              <div className="mt-1 ml-8 flex flex-col gap-1">
                <NavLink
                  to="/Dashboard/Changepassword"
                  onClick={() => setActive("password")}
                  className={`px-3 py-1 rounded
               ${active === "password"
                      ? "bg-blue-100/80 font-medium text-orange-600"
                      : "hover:bg-gray-100"}`}
                >
                  Change password
                </NavLink>

                <NavLink
                  to="/Dashboard/Satting"
                  onClick={() => setActive("notifications")}
                  className={`px-3 py-1 rounded
               ${active === "notifications"
                      ? "bg-blue-100/80 font-medium text-gray-600"
                      : "hover:bg-gray-100"}`}
                >
                  Notifications
                </NavLink>

                <NavLink
                  to="/Dashboard/Deleteacc"
                  onClick={() => setActive("delete")}
                  className={`px-3 py-1 rounded
               ${active === "delete"
                      ? "bg-blue-100/80 font-medium text-gray-600"
                      : "hover:bg-gray-100"}`}
                >
                  Delete Account
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/Dashboard/GetAheadWithPixel" className={linkstyle}>
            <IoLogOutSharp className="text-lg" /> Logout
          </NavLink>
        </nav>
      </div>

      {/* Optional overlay when menu is open on mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="sm:hidden  inset-0 bg-black/30"
        />
      )}
    </>
  );
};

export default Homedashboard;
