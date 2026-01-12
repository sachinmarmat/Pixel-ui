import React, { useEffect, useState } from "react";
import { BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaArrowTrendUp } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashbord02 = () => {
  const [alljobs, setAllJobs] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const Jobdata = async () => {
    try {
      const res = await axios.get(`https://pixel-job-portal-backend.onrender.com/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllJobs(res.data.jobs?.slice(0, 3) || []);
    } catch (error) {
      console.log("Error fetching jobs:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    Jobdata();
  }, []);

  const Navigatepage = (job) => {
    navigate("/JobApplyForm", { state: { job } });
  };

  // animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  const buttonPulse = {
    rest: { scale: 1 },
    hover: {
      scale: 1.07,
      backgroundColor: "rgb(234, 88, 12)",
      boxShadow: "0px 0px 10px rgba(255, 102, 0, 0.5)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around mt-10 gap-10 px-6">
      {/* ====================== LEFT SIDE ====================== */}
      <div className="flex-1">
        <motion.h1
          className="text-3xl font-bold pl-2 pb-8 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          Recommended Jobs
        </motion.h1>

        <div className="flex flex-col gap-6 items-center">
          {alljobs.map((job, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="flex flex-col md:flex-row justify-between items-start border bg-gradient-to-r from-gray-100 to-gray-50 shadow-md hover:shadow-2xl transition rounded-2xl w-full max-w-xl p-6 gap-6"
            >
              {/* Left Side */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-5 items-center">
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <BsFillFileEarmarkCodeFill className="text-5xl bg-orange-600 text-white p-2 rounded-xl" />
                  </motion.div>
                  <h1 className="font-bold text-lg md:text-xl">{job.title}</h1>
                </div>
                <p className="text-[16px] font-semibold text-gray-600">
                  {job.location}
                </p>
              </div>

              {/* Right Side */}
              <div className="flex flex-col md:items-end gap-6">
                <motion.button
                  variants={buttonPulse}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold transition cursor-pointer"
                  onClick={() => Navigatepage(job)}
                >
                  Apply Now
                </motion.button>
                <h2 className="font-semibold text-gray-700">{job.salary}</h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ====================== RIGHT SIDE ====================== */}
      <div className="flex-1 flex flex-col gap-12">
        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl font-bold pb-6">Recent Applications</h1>
          <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-8 rounded-2xl shadow-sm flex flex-col gap-10 w-full max-w-md">
            {[
              { title: "Product Designer", status: "Under Review" },
              { title: "Accepted", status: "VX Designer" },
              { title: "Interview Scheduled", status: "Pending" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col gap-2 items-start cursor-pointer"
              >
                <h1 className="text-[22px] font-bold text-gray-800">
                  {item.title}
                </h1>
                <p className="bg-blue-200 px-4 py-1 text-blue-600 font-medium rounded-2xl text-xs">
                  {item.status}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Career Resources */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold pb-5">Career Resources</h1>
          <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-8 rounded-2xl shadow-sm flex flex-col gap-5 w-full max-w-md">
            {[
              { icon: <FaAddressBook />, title: "Resume Writing Guide" },
              { icon: <MdEditDocument />, title: "Interview Preparation" },
              { icon: <HiCurrencyDollar />, title: "Salary Insights" },
              { icon: <FaArrowTrendUp />, title: "Job Market Trends" },
            ].map((item, i) => (
              <motion.h1
                key={i}
                whileHover={{ x: 8, color: "#1d4ed8" }}
                className="text-[20px] font-bold text-gray-700 flex items-center gap-4 cursor-pointer"
              >
                <span className="text-3xl text-blue-600">{item.icon}</span>
                {item.title}
              </motion.h1>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashbord02;
