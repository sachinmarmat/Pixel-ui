import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoCartOutline } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { BsPeople } from "react-icons/bs";
import { PiStarThin } from "react-icons/pi";
import { HiArrowTurnLeftDown } from "react-icons/hi2";
import { HiMenu } from "react-icons/hi";       // 3-dot/hamburger icon
import { HiX } from "react-icons/hi";          // Close icon

const Homedashboard = () => {
  const [open, setOpen] = useState(false);

  const linkstyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px]
     ${isActive ? 'bg-blue-100/50 text-orange-600' : 'text-blue-600 hover:bg-gray-100'}`;
  return ( 
    <>
      {/* Top bar visible only on mobile */}
      <div className="sm:hidden flex items-center justify-between p-4 bg-[#f8f9fa] shadow">
        <h1 className="font-bold text-xl text-blue-600">Dashboard</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button> 
      </div>

      {/* Sidebar: always visible on sm+, slide-in menu on mobile */}
      <div
        className={`
          fixed top-0 left-0 h-full w-66 bg-[#f8f9fa] px-6 py-10 flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 sm:relative sm:w-72 
        `} 
      >
        <nav className="flex flex-col gap-3">
          <NavLink to="/Dashboard" end className={linkstyle}>
            <IoHomeOutline className="text-lg" /> Dashboard
          </NavLink>

          <NavLink to="/Dashboard/Profile" className={linkstyle}>
            <IoCartOutline className="text-lg" /> Profile
          </NavLink>

          <NavLink to="/Dashboard/Jobs" className={linkstyle}>
            <TfiMenuAlt className="text-lg" /> Jobs
          </NavLink>

          <NavLink to="/Dashboard/Application" className={linkstyle}>
            <IoCartOutline className="text-lg" /> Application
          </NavLink>

          <NavLink to="/Dashboard/Savedjobs" className={linkstyle}>
            <IoHomeOutline className="text-lg" /> Saved Jobs
          </NavLink>

          <NavLink to="/Dashboard/Resumebuilder" className={linkstyle}>
            <BsPeople className="text-lg" /> Resume Builder
          </NavLink>

          <NavLink to="/Dashboard/carrerresources" className={linkstyle}>
            <PiStarThin className="text-lg" /> Career Resources
          </NavLink>

          <NavLink to="/Dashboard/Satting" className={linkstyle}>
            <HiArrowTurnLeftDown className="text-lg" /> Satting
          </NavLink>

          <NavLink to="/" className={linkstyle}>
            <HiArrowTurnLeftDown className="text-lg" /> Logout
          </NavLink>
        </nav>
      </div>

      {/* Optional overlay when menu is open on mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="sm:hidden fixed inset-0 bg-black/30"
        />
      )}
    </>
  );
};

export default Homedashboard;
