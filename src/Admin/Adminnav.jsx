import React, { useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoLogOutSharp } from "react-icons/io5";
import { GrResources } from "react-icons/gr";
import { BsPersonCircle } from "react-icons/bs";
import { PiCirclesFour } from "react-icons/pi";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

const Adminnav = () => {
    const [open, setOpen] = useState(false);

    const linkstyle = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md font-semibold text-[18px] 
     ${isActive
            ? "text-white bg-[#FF7200]"
            : " text-white hover:bg-blue-400/50"
        }`;

    return (
        <div>
            <div
                className="
            top-0 left-0 min-h-full sm:h-200 bg-gradient-to-t from-[#FF6B00] to-[#1053ee]    sm:px- py-5 sm:py-10 
          transition-transform duration-300 items-center
           sm:w-78 "
            >
                <div className="text-4xl font-semibold px-5 text-center text-white mb-9">
                    Admin Dashboard
                </div>
                <div className="border-b-2 sm:mb-5 border-orange-300/40"></div>
                <div className="flex justify-between mb-8 px-6 items-center text-center">
                    <div className="flex gap-4"> <img src="https://img.lovepik.com/png/20231125/man-avatar-image-for-profile-child-diverse-guy_693690_wh860.png" alt="" className="w-10 rounded-4xl" />
                        <h1 className="flex flex-col font-medium ">Admin <span className="text-gray-800 text-xs">HR Manager</span></h1></div>
                    <TfiMenuAlt className="text-lg" />

                </div>
                <nav className="flex flex-col gap-5  p-3 rounded-2xl sm:px-8">
                    <NavLink to="/Admin" className={linkstyle} end>
                        <TfiMenuAlt className="text-lg" />
                        Dashboard
                    </NavLink>

                    <NavLink to="/Admin/Manageuser" className={linkstyle}>
                        <PiCirclesFour className="text-lg" /> Manage User
                    </NavLink>

                    <NavLink to="/Admin/Managejob" className={linkstyle}>
                        <BsBookmarkCheckFill className="text-lg" /> Manage Jobs
                    </NavLink>

                    <NavLink to="/Admin/AdminProfile" className={linkstyle}>
                        <BsPersonCircle className="text-lg" /> Profile
                    </NavLink>

                    <NavLink to="/Admin/Revenue" className={linkstyle}>
                        <IoLogOutSharp className="text-lg" /> Revenue
                    </NavLink>

                    <div className="relative ">
                        <h1
                            className={linkstyle + " cursor-pointer flex items-center text-center"}
                            onClick={() => setOpen(!open)}
                        >
                                         <FiSettings className="text-lg" /> 
                            Setting
                            <MdOutlineKeyboardArrowDown
                                className={`text-xl transition-transform  duration-300
                                              ${open ? "rotate-180" : {}}`}
                            /></h1>
                        {open && (
                            <div className="absolute left-0 mt-1 flex flex-col gap-2  shadow rounded">


                                <NavLink
                                    to="/Admin/Setting/Privatepolicy"
                                    className={linkstyle}
                                >
                                    Private Policy
                                </NavLink>
                                <NavLink
                                    to="/Admin/Setting/Termscondition"
                                    className={linkstyle}
                                >
                                    Terms &amp; Condition
                                </NavLink>
                            </div>
                        )}
                    </div>


                    {/* <NavLink to="/Admin/Setting" className={linkstyle}>
                        <GrResources className="text-lg" /> Setting
                    </NavLink> */}

                </nav>
            </div>
        </div>
    );
};

export default Adminnav;
