import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FaBell } from "react-icons/fa"
import { IoIosMailOpen } from "react-icons/io"
import { BiSearch } from "react-icons/bi"
import { HiMenu, HiX } from "react-icons/hi"

const Dashbordnav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const [searchonclick, setSearchonclick] = useState(false)


  const navLinks = [
    { path: '/', label: 'Jobs' },
    { path: '/Aboutus', label: 'About' },
    { path: '/Contact', label: 'Contact' },
    { path: '/Companies', label: 'Companies' },
  ]

  return (
    <nav className="w-full fixed top-0 sm:px-15 left-0 z-50 py-2 sm:py-4 bg-gradient-to-r from-blue-600 to-[#76e5ef]">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">

        {/* ---- Logo ---- */}
        <a href="/">
          <img 
            src={logo}
            alt="logo"
            className="w-11 sm:w-14 rounded-full cursor-pointer "
          />
        </a>

        {/* ---- Desktop nav links ---- */}
        <ul className="hidden md:flex gap-10 text-white text-lg font-medium">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `transition hover:text-black ${isActive ? 'font-bold text-black' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ---- Right side icons ---- */}
        <div className="flex items-center gap-3 sm:gap-7">

          {/* Search box: visible only on md+ */}
          <div className="relative hidden md:block">
            <input
              placeholder="Search job here"
              className="w-65 text-xm  border outline-none border-gray-400 pl-4 pr-10 py-2 rounded-3xl bg-white"
            />
            <BiSearch className="absolute top-2 right-1 -translate-y-1 text-3xl bg-blue-500 rounded-full p-1  text-white cursor-pointer hover:bg-blue-600" />
          </div>

          {/* Search icon on mobile */}
          <BiSearch className="md:hidden text-3xl text-white bg-blue-500 rounded-full p-1 cursor-pointer hover:bg-blue-600"
            onClick={() => setSearchonclick(!searchonclick)}
          />
 
          {searchonclick && (
            <div className="md:hidden">
              <input 
                placeholder="Search job here"
                className="w-30 text-sm border outline-none border-gray-400 pl-4 pr-10 py-2 rounded-3xl bg-white"
                autoFocus
              />
            </div>
          )}


          {/* Notification + mail: show always */}
          <FaBell className="text-2xl text-gray-400 hover:text-gray-500 cursor-pointer  hidden md:block " />
          <IoIosMailOpen className="text-2xl text-gray-400 hover:text-gray-500 cursor-pointer  hidden md:block " />

          {/* Profile image */}
          <img
            src="https://img.freepik.com/premium-photo/people-glasses-cartoon-logo_643934-2835.jpg"
            alt="profile"
            className="w-10 md:w-14 rounded-full object-cover cursor-pointer"
          />

          {/* Hamburger menu (mobile) */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* ---- Mobile dropdown menu ---- */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 text-white px-4 pb-4 space-y-5">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block transition hover:text-black ${isActive ? 'font-bold text-black' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Dashbordnav
