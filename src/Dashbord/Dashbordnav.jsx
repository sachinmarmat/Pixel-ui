import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FaBell } from "react-icons/fa";
import { IoIosMailOpen } from "react-icons/io";
import { BiSearch } from "react-icons/bi";


const Dashbordnav = () => {


  const navLinks = [
    { path: '/', label: 'Jobs' },
    { path: '/Aboutus', label: 'About' },
    { path: '/Contact', label: 'Contact' },
    { path: '/Companies', label: 'Companies' },
  ]
  return (
    <nav className="w-full absolute top-0  left-0 bg-gradient-to-r from-blue-600 to-[#76e5ef] z-50">
      <div className="flex justify-center gap-15 container m-auto items-center py-8">
        <div className='pr-55'>
          <a href='/'><img
            src={logo}
            alt="logo"
            className="w-14 rounded-full cursor-pointer"
          /></a>
        </div>

        <div className="">
          <ul className="flex gap-12 pl-6 py-2 rounded-2xl font-xl text-white">
            {navLinks.map(({ path, label }) => (
              <li key={path} className="hover:text-black transition">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-black' : ''
                  }
                > 
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex gap-9 items-center '>
          <div className='relative items-center '>
            <input placeholder='Search job here' className='text-xm border outline-none border-gray-400 p-2 rounded-3xl bg-white pl-5 w-66' />
            <BiSearch className='absolute top-1 right-1 text-3xl bg-blue-500 rounded-3xl  p-1 cursor-pointer hover:bg-blue-600' />

          </div>
          <FaBell className='text-2xl text-gray-400 cursor-pointer        hover:text-gray-500 ' />
          <IoIosMailOpen className='text-2xl text-gray-400 cursor-pointer hover:text-gray-500 ' />

          <img src='https://img.freepik.com/premium-photo/people-glasses-cartoon-logo_643934-2835.jpg' alt='' className='w-14 rotate-10 rounded-4xl cursor-pointer' />
        </div> 

      </div>
    </nav>
  )
}

export default Dashbordnav
