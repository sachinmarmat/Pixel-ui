import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOutSharp } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { HiMenu, HiX } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { GrResources, GrDocumentUser } from "react-icons/gr";
import { BsPersonCircle, BsBookmarkCheckFill } from "react-icons/bs";
import { PiCirclesFour } from "react-icons/pi";
import { ImHome } from "react-icons/im";
import Jobfilter from './DesComponant/Jobfilter';

const Homedashboard = () => {
  const [open, setOpen] = useState(true);          // sidebar open/close
  const [settingOpen, setSettingOpen] = useState(false); // dropdown open/close
  const [jobs, setJobs] = useState(false);

  const location = useLocation();
  const navigate = useNavigate()

  //  Close dropdown only when going outside Dashboardsetting
  useEffect(() => {
    if (!location.pathname.startsWith("/Dashboard/Dashboardsetting")) {
      setSettingOpen(false);
    }
  }, [location.pathname]);
  useEffect(() => {
    if (!location.pathname.startsWith("/Dashboard/Jobs")) {
      setJobs(false);
    }
  }, [location.pathname]);

  const linkstyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] 
     ${isActive ? 'bg-blue-100 text-orange-600' : 'text-blue-600 hover:bg-gray-100'}`;

  const handleLogout = () => {
    localStorage.clear();
    // setRole(null);
    navigate('/');
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="sm:hidden inline-block contain-inline-size justify-between relative">
        <h1 className="font-bold text-xl text-blue-600 sm:hidden flex absolute top-0">Dashboard</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? (
            <HiX className="text-2xl absolute top-2 left-40" />
          ) : (
            <HiMenu className="text-2xl absolute top-5 left-35 " />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          top-0 left-0 min-h-screen h-full shadow-lg w-48 bg-[#f2fbff] px-1 sm:px-6 py-5 sm:py-10 
          transition-transform duration-300 sm:pl-7
          ${open ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 sm:relative sm:w-73  
        `}
      >
        <nav className="flex flex-col gap-3">
          <NavLink to="/Dashboard" end className={linkstyle}>
            <ImHome className="text-lg" /> Dashboard
          </NavLink>

          <NavLink to="/Dashboard/Profile" className={linkstyle}>
            <BsPersonCircle className="text-lg" /> Profile
          </NavLink>

          {/* Jobs with sublinks */}
          <div>
            <NavLink
              to="/Dashboard/Jobs"

              onClick={() => setJobs(!jobs)}
              className={linkstyle}            >
              <TfiMenuAlt className="text-lg" /> Jobs
            </NavLink>
            {jobs && <Jobfilter />}
          </div>

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

          {/* Settings dropdown */}
          <div className="w-full">
            <div
              onClick={() => setSettingOpen(!settingOpen)}
              className="cursor-pointer flex items-center justify-between px-4 py-2 rounded-md font-semibold text-[18px] text-blue-600 hover:bg-gray-100"
            >
              <span className="flex items-center gap-2">
                <FiSettings className="text-lg" />
                Settings
              </span>
              <MdOutlineKeyboardArrowDown
                className={`text-xl transition-transform duration-300 ${settingOpen ? "rotate-180" : ""}`}
              />
            </div>

            {settingOpen && (
              <div className="mt-1 ml-8 flex flex-col gap-1">
                <NavLink
                  to="/Dashboard/Dashboardsetting/Changepassword"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded ${isActive
                      ? "bg-blue-100/80 font-medium text-orange-600"
                      : "hover:bg-gray-100"
                    }`
                  }
                >
                  Change password
                </NavLink>

                <NavLink
                  to="/Dashboard/Dashboardsetting/Notification"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded ${isActive
                      ? "bg-blue-100/80 font-medium text-orange-600"
                      : "hover:bg-gray-100"
                    }`
                  }
                >
                  Notifications
                </NavLink>

                <NavLink
                  to="/Dashboard/Dashboardsetting/Deleteacc"
                  className={({ isActive }) =>
                    `px-3 py-1 rounded ${isActive
                      ? "bg-blue-100/80 font-medium text-orange-600"
                      : "hover:bg-gray-100"
                    }`
                  }
                >
                  Delete Account
                </NavLink>
              </div>
            )}
          </div>


          <NavLink to="/" className={linkstyle} onClick={handleLogout}>
            <IoLogOutSharp className="text-lg" /> Logout
          </NavLink>
        </nav >
      </div >

      {/* Mobile overlay */}
      {
        open && (
          <div
            onClick={() => setOpen(false)}
            className="sm:hidden fixed inset-0 bg-black/30"
          />
        )
      }
    </>
  );
};

export default Homedashboard;
