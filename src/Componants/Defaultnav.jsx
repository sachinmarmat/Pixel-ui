import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'


const Defaultnav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [role, setRole] = useState(null)


  useEffect(() => {
    const storerole = localStorage.getItem('role')
    setRole(storerole)
  })

  const navLinks = [ 
    { path: '/', label: 'Jobs' },
    { path: '/Aboutus', label: 'About' },
    { path: '/Contact', label: 'Contact' },
    { path: '/Companies', label: 'Companies' },
  ]

  return (
    <nav className="w-full absolute bg-gradient-to-r from-blue-600 to-[#76e5ef]  sm:px-15 top-0 left-0 bg-transparent z-50">
      <div className=" px-4 md:px-8">
        <div className="flex justify-between items-center py-5">
          <div className='flex gap-2 items-center'>
            <a href='/'><img
              src={logo}
              alt="logo"
              className="w-12 sm:w-15 rounded-full cursor-pointer"
            /></a>
            <h1 className="font-medium flex flex-col  items-center">PIXELGENIX <span className="text-gray-600 font-semibold ">IT Solutions</span></h1>
          </div>

          <div className="hidden lg:block">

            <ul className="flex gap-13 bg-gray-100/20 px-7 py-2 rounded-2xl font-medium text-white">
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

          <div className="hidden lg:flex gap-4">
            {!role ? (
              <>
                <button className="hover:bg-[#F1511B] px-5 py-2 rounded-2xl text-white hover:text-black font-medium bg-gray-100/10 transition cursor-pointer">
                  <a href='/Login'> Log In</a>
                </button>
                <button className="bg-blue-600 px-5 py-2 rounded-2xl hover:bg-blue-700 text-white font-medium transition cursor-pointer">
                  <a href='/Signup'> Sign Up</a>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4 text-white">
                <NavLink
                  // to={getDashboardLink()}
                  className="hover:text-black font-medium"
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-gray-900/95 p-6 rounded-2xl mt-2">
            <ul className="flex flex-col gap-4 font-medium text-white">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-blue-400' : ''
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile Buttons */}
            <div className="flex flex-col gap-3 mt-5">
              <button className="hover:bg-red-300 px-5 py-3 rounded-2xl text-white hover:text-black font-medium bg-gray-100/10 transition">
                <a href='/Login'> Log In</a>
              </button>
              <button className="bg-blue-600 px-5 py-3 rounded-2xl hover:bg-blue-700 text-white font-medium transition">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Defaultnav
