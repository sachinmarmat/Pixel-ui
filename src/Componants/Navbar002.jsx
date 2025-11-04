import React, { useEffect } from "react";
import { motion } from "framer-motion";
import bgimg from "../assets/bg-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters, updateTemporary } from "../redux/slice/jobslice";
import { useNavigate } from "react-router-dom";

const Navbar002 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { temporary } = useSelector((state) => state.job);

  const handleChange = (field, value) => {
    dispatch(updateTemporary({ field, value }));
  };

  const handleFindJob = () => {
    dispatch(applyFilters());
    navigate("/Jobsview");
  };

  useEffect(() => {
    const userData = localStorage.getItem("role");
    if (userData) {
      if (userData === "admin") {
        navigate("/Admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <div className="relative min-h-[40rem] sm:min-h-[45rem] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgimg})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>

      {/* Animated Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 pt-48 sm:pt-60 lg:pt-72 text-center sm:text-left">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg"
        >
          Find the{" "}
          <span className="bg-blue-600 rounded-4xl">
            job
          </span>{" "}
          you love
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-gray-200 mt-4 max-w-2xl"
        >
          Explore thousands of career opportunities from top companies.
        </motion.p>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4"
        >
          <input
            type="text"
            name="jobtitle"
            value={temporary.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Job Title"
            className="border outline-none border-gray-400 bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm p-3 pl-5 rounded-xl font-medium w-full sm:w-80 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
          />

          <input
            type="text"
            name="location"
            value={temporary.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Location"
            className="border outline-none border-gray-400 bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm p-3 pl-5 rounded-xl font-medium w-full sm:w-64 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 cursor-pointer px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition duration-200"
            onClick={handleFindJob}
          >
            Find Job
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Gradient Circle Animation (Decorative) */}
      <motion.div
        className="absolute top-10 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-16 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default Navbar002;
