import React, { useEffect, useState } from "react";
import img from "../assets/img.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

const Feature = () => {
  const [index, setIndex] = useState(0);
  const [alljobs, setAllJobs] = useState([]);
  const navigate = useNavigate();

  const navigatpage = (job) => {
    const role = localStorage.getItem("role");
    if (!role) {
      navigate("/Login");
    } else if (role === "jobseeker") {
      navigate("/JobApplyForm", { state: { job } });
    } else {
      alert("Only job seekers can apply for jobs.");
    }
  };

  // Logos data
  const companies = [
    {
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo-2014-present.jpg",
      name: "Netflix",
      desc: "Streaming entertainment worldwide",
    },
    {
      logo: "https://tse2.mm.bing.net/th/id/OIP.96OxWjEy7in-wy0k-f12ZgHaEK?r=0&pid=ImgDetMain",
      name: "Google",
      desc: "Empowering AI & technology innovation",
    },
    {
      logo: "https://www.logo-designer.co/wp-content/uploads/2015/10/Apple-Google-Interbrand-6th-annual-Best-Global-Brands-report.png",
      name: "Apple",
      desc: "Leading design and innovation",
    },
    {
      logo: "https://static.vecteezy.com/system/resources/previews/014/018/578/non_2x/microsoft-logo-on-transparent-background-free-vector.jpg",
      name: "Microsoft",
      desc: "Software and cloud solutions",
    },
    {
      logo: "https://th.bing.com/th/id/R.e479c6b4c67f974f7ceb4605f17332d9?rik=RGN0%2biDVLnpAXw&riu=http%3a%2f%2flofrev.net%2fwp-content%2fphotos%2f2016%2f05%2fAmazon-logo.png&ehk=xF4jh7u2oTUutljz77AHIyPxQVM26QYgt7y0za9cQTs%3d&risl=&pid=ImgRaw&r=0",
      name: "Amazon",
      desc: "E-commerce & AWS technology",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png",
      name: "Meta",
      desc: "Building the social metaverse",
    },
    {
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Shopify-Symbol.png",
      name: "Shopify",
      desc: "E-commerce platform for all",
    },
    {
      logo: "https://tse3.mm.bing.net/th/id/OIP.cMhtTaiB-Dck7s34XHVMhwHaHa?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      name: "Adobe",
      desc: "Creative and digital media tools",
    },
  ];

  // Fetch jobs
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

  return (
    <div className="px-4 sm:px-20 py-12">
      <div className="flex flex-col lg:flex-row gap-10 justify-between sm:items-center">

        {/* ========== FEATURED JOBS SECTION ========== */}
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold">Featured Jobs</h1>

          {alljobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between border shadow-sm hover:shadow-lg transition rounded-lg border-gray-400 p-5 gap-6 md:gap-10"
            >
              {/* Left */}
              <div>
                <div className="flex items-center gap-4 font-semibold text-lg md:text-xl mb-3">
                  <img src={img} alt="logo" className="w-12" />
                  <h1>{job.title}</h1>
                </div>
                <p className="font-medium text-gray-700 flex flex-row items-center gap-2 hover:underline">
                  <FaLocationDot className="text-blue-500 hover:scale-110 cursor-pointer" />
                  {job.location}
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col md:items-end gap-4">
                <button
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition cursor-pointer"
                  onClick={() => navigatpage(job)}
                >
                  Apply Now
                </button>
                <h2 className="font-semibold">${job.salary}/Year</h2>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ========== TOP COMPANIES SLIDER ========== */} 
      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
  <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mb-6">
    Top Companies
  </h1>

  <div className="relative w-full bg-gradient-to-br from-orange-50 via-white to-blue-50 
                  border border-gray-200 shadow-lg rounded-3xl py-20 px-8 flex items-center justify-center overflow-hidden">

    {/* Glows */}
    <div className="absolute -top-8 -left-8 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

    {/* Continuous smooth loop */}
    <div className="relative w-full h-[230px]">
      <motion.div
        className="absolute flex gap-10 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
      >
        {/* Duplicate array to create endless flow */} 
        {[...companies, ...companies, ...companies].map((company, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-6 
                       shadow-md hover:shadow-2xl flex flex-col items-center justify-center 
                       text-center min-w-[220px] h-[210px] hover:bg-white transition-all"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="w-20 h-20 object-contain mb-3 drop-shadow-md"
            />
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              {company.name}
            </h2>
            <p className="text-gray-600 text-xs mt-1 leading-snug max-w-[180px]">
              {company.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* Keyframes for smooth loop */}
    <style>{`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </div>
</div>

      </div>
    </div>
  );
};

export default Feature;
