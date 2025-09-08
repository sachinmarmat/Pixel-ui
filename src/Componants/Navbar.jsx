import React, { useState } from 'react'
import img from '../assets/img.jpg'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="container mx-auto relative z-10 text-white">
        <div className="flex justify-around gap-69 items-center py-5">
          <div>
            <img
              src={img}
              alt="logo"
              className="w-12 rounded-3xl cursor-pointer"
            /> 
          </div>

          <div className="hidden md:block">
            <ul className="flex gap-9 bg-gray-100/20 p-2 rounded-2xl pl-8 pr-8 font-medium">
              <li className="hover:text-black cursor-pointer">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-black' : ''
                  }
                >
                  Jobs
                </NavLink>
              </li>
              <li className="hover:text-black cursor-pointer">
                <NavLink
                  to="/Aboutus"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-black' : ''
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="hover:text-black cursor-pointer">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-black' : ''
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li className="hover:text-black cursor-pointer">
                <NavLink
                  to="/companies"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-black' : ''
                  }
                >
                  Companies
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex gap-5">
            <button className="hover:bg-red-300 p-3 rounded-2xl text-white hover:text-black font-medium bg-gray-100/10">
              Log In
            </button>
            <button className="bg-blue-700 p-3 rounded-2xl hover:bg-blue-900 text-white font-medium">
              Sign Up
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-gray-900/90 p-5 rounded-2xl mt-2">
            <ul className="flex flex-col gap-4 font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-blue-400' : ''
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Aboutus"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-blue-400' : ''
                  }
                  onClick={() => setIsOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-blue-400' : ''
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/companies"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-blue-400' : ''
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Companies
                </NavLink>
              </li>
            </ul>

            <div className="flex flex-col gap-3 mt-4">
              <button className="hover:bg-red-300 p-3 rounded-2xl text-white hover:text-black font-medium bg-gray-100/10">
                Log In
              </button>
              <button className="bg-blue-700 p-3 rounded-2xl hover:bg-blue-900 text-white font-medium">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
