import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [showSignupDropdown, setShowSignupDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const signupRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "Jobs" },
    { path: "/Aboutus", label: "About" },
    { path: "/Contact", label: "Contact" },
    { path: "/Companies", label: "Companies" },
  ];

  const getDashboardLink = () => {
    if (role === "admin") return "/Admin";
    if (role === "employ") return "/Employedashboard";
    if (role === "jobseeker") return "/Dashboard";
    return "/";
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (signupRef.current && !signupRef.current.contains(e.target)) {
        setShowSignupDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full absolute top-0 left-0 bg-transparent z-50 sm:px-15">
      <div className="px-4 md:px-8">
        <div className="flex justify-between items-center py-6">
          {/* --- Logo --- */}
          <div className="flex gap-2 items-center">
            <a href="/">
              <img
                src={logo}
                alt="logo"
                className="w-12 sm:w-15 rounded-full cursor-pointer"
              />
            </a>
            <h1 className="font-medium flex flex-col items-center">
              PIXELGENIX{" "}
              <span className="text-gray-600 font-semibold">IT Solutions</span>
            </h1>
          </div>

          {/* --- Desktop Menu --- */}
          <div className="hidden lg:block">
            <ul className="flex gap-13 bg-gray-100/20 px-7 py-2 rounded-2xl font-medium text-white">
              {navLinks.map(({ path, label }) => (
                <li key={path} className="hover:text-black transition">
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive ? "font-bold text-black" : ""
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Right Side --- */}
          <div className="hidden lg:flex items-center gap-4 relative">
            {!role ? (
              <>
                <button className="hover:bg-[#F1511B] px-5 py-2 rounded-2xl text-white hover:text-black font-medium bg-gray-100/10 transition">
                  <a href="/Login">Log In</a>
                </button>

                {/* --- Signup Dropdown --- */}
                <div ref={signupRef} className="relative">
                  <button
                    onClick={() => setShowSignupDropdown(!showSignupDropdown)}
                    className="bg-blue-600 px-5 py-2 rounded-2xl hover:bg-blue-700 text-white font-medium transition"
                  >
                    Sign Up
                  </button>

                  {showSignupDropdown && (
                    <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden">
                      <button
                        onClick={() => {
                          navigate("/Signup");
                          setShowSignupDropdown(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-blue-100 transition"
                      >
                        Employer Signup
                      </button>
                      <button
                        onClick={() => {
                          navigate("/UserSignup");
                          setShowSignupDropdown(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-blue-100 transition"
                      >
                        User Signup
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* --- Profile Dropdown --- */}
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="bg-orange-500 p-2 rounded-full hover:bg-gray-200/40 transition"
                  >
                    <User className="text-white" size={33} />
                  </button>

                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden">
                      <button
                        onClick={() => {
                          navigate(getDashboardLink());
                          setShowProfileDropdown(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-blue-100 transition"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X size={28} className="text-white" />
              ) : (
                <Menu size={28} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* --- Mobile Menu --- */}
        {isOpen && (
          <div className="lg:hidden bg-gray-900/95 p-6 rounded-2xl mt-2">
            <ul className="flex flex-col gap-4 font-medium text-white">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "font-bold text-blue-400" : ""
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 mt-5">
              {!role ? (
                <>
                  <button className="hover:bg-red-300 px-5 py-3 rounded-2xl text-white hover:text-black font-medium bg-gray-100/10 transition">
                    <a href="/Login">Log In</a>
                  </button>
                  <button
                    onClick={() => setShowSignupDropdown(!showSignupDropdown)}
                    className="bg-blue-600 px-5 py-3 rounded-2xl hover:bg-blue-700 text-white font-medium transition"
                  >
                    Sign Up
                  </button>

                  {showSignupDropdown && (
                    <div className="mt-2 bg-white rounded-xl text-gray-800 shadow-lg">
                      <button
                        onClick={() => {
                          navigate("/Signup");
                          setIsOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-blue-100"
                      >
                        Employer Signup
                      </button>
                      <button
                        onClick={() => {
                          navigate("/UserSignup");
                          setIsOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-blue-100"
                      >
                        User Signup
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate(getDashboardLink());
                      setIsOpen(false);
                    }}
                    className="bg-blue-600 px-5 py-3 rounded-2xl text-white font-medium hover:bg-blue-700"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 px-5 py-3 rounded-2xl text-white font-medium hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
