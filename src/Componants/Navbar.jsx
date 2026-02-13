import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, LogIn, UserPlus, Zap } from "lucide-react"; // Added Zap for premium icon
import { FiStar } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";

// --- Custom Tailwind Classes for Consistent UI ---
const UI_CLASSES = {
    NAV_BG: "bg-gray-200/20 backdrop-blur-xl", // Light, blurry background
    DROPDOWN_BG: "bg-white border border-gray-100",
    PRIMARY_BUTTON: "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/50",
    SECONDARY_BUTTON: "bg-gray-100/20 hover:bg-white/30 text-white",
    ACTIVE_LINK: "text-blue-400 font-bold",
    INACTIVE_LINK: "text-black hover:text-white",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [showSignupDropdown, setShowSignupDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [premiumStatus, setPremiumStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const signupRef = useRef(null);
  const profileRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false); // New state for scroll effect

  // Function to close all dropdowns/menus
  const closeAllMenus = () => {
    setIsOpen(false);
    setShowSignupDropdown(false);
    setShowProfileDropdown(false);
  };

  // --- Utility Functions (Functionality Preserved) ---
  const getDashboardLink = () => {
    if (role === "admin") return "/Admin";
    if (role === "employ") return "/Employedashboard";
    if (role === "jobseeker") return "/Dashboard";
    return "/";
  };

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    closeAllMenus();
    navigate("/");
    toast.info("Logged out successfully!");
  };
  
  // API Call to fetch Premium Status
  const handleBuy = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await axios.get(
        `https://pixel-job-portal-backend.onrender.com/api/premium/status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status) {
        setPremiumStatus({
          isPremium: res.data.isPremium,
          premiumPlan: res.data.premiumPlan,
          premiumExpiry: res.data.premiumExpiry,
        });
      }
    } catch (error) {
      console.error("Error fetching premium status:", error.response?.data?.msg || error.message);
      setPremiumStatus({ isPremium: false }); 
    }
  };

  // --- Effects ---

  // 1. Role and Premium Status Check on path change
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    if (storedRole === "jobseeker" || storedRole === "employ") {
      handleBuy();
    } else {
      setPremiumStatus(null);
    }
  }, [location.pathname]);

  // 2. Close dropdowns when clicking outside
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

  // 3. Handle scroll effect for a cleaner look
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define the navigation links
  const navLinks = [
    { path: "/", label: "Jobs" },
    { path: "/Aboutus", label: "About" },
    { path: "/Contact", label: "Contact" },
    { path: "/Companies", label: "Companies" },
  ];


  // --- Render Component (Attractive and Full Screen UI) ---
  return (
    <nav 
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? UI_CLASSES.NAV_BG : "bg-transparent"} ${isScrolled ? "shadow-xl  shadow-gray-900/10" : ""}`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-12">
        {/* Main Header Row */}
        <div className="flex justify-between items-center py-4 md:py-5">
          
          {/* --- Logo & Title --- */}
          <div className="flex gap-3 items-center shrink-0">
            <a href="/" onClick={closeAllMenus}>
              <img
                src={logo}
                alt="PIXELGENIX Logo"
                className="w-11 sm:w-16 rounded-full cursor-pointer shadow-lg"
              />
            </a>
            <h1 className="text-xl md:text-2xl font-extrabold text-black leading-tight tracking-wide">
              PIXELGENIX
              <span className="block text-xs font-semibold text-gray-400 opacity-90 -mt-1">
                IT Solutions
              </span>
            </h1>
          </div>

          {/* --- Desktop Menu Bar (Separated for prominence) --- */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="flex gap-10 font-semibold py-3 px-8 rounded-full bg-white/20 backdrop-blur-sm shadow-inner shadow-black/10">
              {navLinks.map(({ path, label }) => (
                <li key={path} className="relative group">
                  <NavLink
                    to={path}
                    onClick={closeAllMenus}
                    className={({ isActive }) =>
                      `relative p-1 transition duration-300 ${UI_CLASSES.INACTIVE_LINK} hover:text-blue-300 ${
                        isActive
                          ? `${UI_CLASSES.ACTIVE_LINK} before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-blue-400 before:rounded-full`
                          : ""
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Right Side (Login/Profile & Premium) --- */}
          <div className="hidden lg:flex items-center gap-4 relative shrink-0">
            {!role ? (
              <>
                <a href="/Login">
                  <button className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 ${UI_CLASSES.SECONDARY_BUTTON}`}>
                    <LogIn size={18} />
                    Log In
                  </button>
                </a>

                {/* --- Signup Dropdown --- */}
                <div ref={signupRef} className="relative z-50">
                  <button
                    onClick={() => setShowSignupDropdown(!showSignupDropdown)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all duration-300 ${UI_CLASSES.PRIMARY_BUTTON}`}
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </button>

                  {showSignupDropdown && (
                    <div className={`absolute right-0 mt-3 w-48 text-gray-800 rounded-xl shadow-2xl overflow-hidden animate-fadeInUp ${UI_CLASSES.DROPDOWN_BG}`}>
                      <button
                        onClick={() => {
                          navigate("/Signup");
                          closeAllMenus();
                        }}
                        className="block w-full px-4 py-3 text-left font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        Employer Signup
                      </button>
                      <button
                        onClick={() => {
                          navigate("/UserSignup");
                          closeAllMenus();
                        }}
                        className="block w-full px-4 py-3 text-left font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        Job Seeker Signup
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* --- Premium Status Pill --- */}
                <div className="group">
                    {premiumStatus?.isPremium ? (
                        <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-green-500/50 transition duration-300 hover:scale-105 cursor-default">
                          <Zap size={16} className="text-yellow-300 fill-yellow-300" />
                          <span>{premiumStatus.premiumPlan.toUpperCase()} Elite</span>
                        </div>
                    ) : (
                        <a href="/PremiumPlans" onClick={closeAllMenus}>
                          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/50 cursor-pointer transition duration-300 hover:scale-105">
                            <FiStar size={16} />
                            <span>Go Premium</span>
                          </div>
                        </a>
                    )}
                </div>
                
                {/* --- Profile Dropdown Button --- */}
                <div ref={profileRef} className="relative z-50">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer transition-all duration-300 ring-2 ring-white/70"
                  >
                    <User className="text-white" size={35} />
                  </button>

                  {showProfileDropdown && (
                    <div className={`absolute right-0 mt-3 w-44 text-gray-800 rounded-xl shadow-2xl overflow-hidden animate-fadeInUp ${UI_CLASSES.DROPDOWN_BG}`}>
                      <button
                        onClick={() => {
                          navigate(getDashboardLink());
                          closeAllMenus();
                        }}
                        className="block w-full px-4 py-3 text-left font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-3 text-left font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition"
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
          <div className="lg:hidden z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 transition-transform duration-300">
              {isOpen ? (
                <X size={30} className="text-blue-400 transform rotate-90" />
              ) : (
                <Menu size={30} className="text-blue-700" />
              )}
            </button>
          </div>
        </div>

        {/* --- Mobile Menu (Full Overlay) --- */}
        {isOpen && (
          <div className="lg:hidden absolute top-[70px] left-0 w-full px-4">
            <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl shadow-2xl transition duration-300 animate-slideDown border border-gray-700">
              <ul className="flex flex-col gap-4 font-medium text-gray-200 border-b border-gray-700 pb-4">
                {navLinks.map(({ path, label }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      onClick={closeAllMenus}
                      className={({ isActive }) =>
                        `block py-2 text-lg hover:text-blue-400 transition ${
                          isActive ? UI_CLASSES.ACTIVE_LINK : ""
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 mt-4 pt-4">
                {!role ? (
                  <>
                    <a href="/Login" onClick={closeAllMenus}>
                      <button className={`w-full px-5 py-3 rounded-xl font-medium transition-colors ${UI_CLASSES.SECONDARY_BUTTON.replace("text-white", "text-gray-200").replace("bg-gray-100/20", "bg-gray-700/50")}`}>
                        Log In
                      </button>
                    </a>

                    {/* Mobile Signup Dropdown */}
                    <button
                      onClick={() => setShowSignupDropdown(!showSignupDropdown)}
                      className={`w-full px-5 py-3 rounded-xl font-medium transition-colors ${UI_CLASSES.PRIMARY_BUTTON}`}
                    >
                      Sign Up
                    </button>

                    {showSignupDropdown && (
                      <div className={`mt-2 rounded-lg text-gray-800 shadow-xl ${UI_CLASSES.DROPDOWN_BG}`}>
                        <button
                          onClick={() => {
                            navigate("/Signup");
                            closeAllMenus();
                          }}
                          className="block w-full px-4 py-3 text-left font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          Employer Signup
                        </button>
                        <button
                          onClick={() => {
                            navigate("/UserSignup");
                            closeAllMenus();
                          }}
                          className="block w-full px-4 py-3 text-left font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          Job Seeker Signup
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate(getDashboardLink());
                        closeAllMenus();
                      }}
                      className={`w-full px-5 py-3 rounded-xl font-medium transition-colors ${UI_CLASSES.PRIMARY_BUTTON}`}
                    >
                      Dashboard
                    </button>
                    {premiumStatus && (
                      <a href="/PremiumPlans" onClick={closeAllMenus}>
                        <div className={`w-full text-center px-5 py-3 rounded-xl text-white font-bold transition-colors ${
                            premiumStatus.isPremium 
                            ? "bg-green-600 hover:bg-green-700" 
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}>
                          {premiumStatus.isPremium ? `${premiumStatus.premiumPlan.toUpperCase()} Elite` : "Go Premium"}
                        </div>
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600 px-5 py-3 rounded-xl text-white font-medium hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;