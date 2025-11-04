import React, { useEffect, useState } from "react";
import img from "../assets/img.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";



const Feature = () => {
  const [index, setIndex] = useState(0);
  const [alljobs, setalljobs] = useState([])

  const navigate = useNavigate()

  const navigatpage = (job) => {
    const role = localStorage.getItem("role");

    if (!role) {
      // No role = not logged in
      navigate("/Login");
    } else if (role === "jobseeker") {
      // Only jobseeker can apply
      navigate("/JobApplyForm", { state: { job } });
    } else {
      // Other roles (admin/employ) not allowed
      alert("Only job seekers can apply for jobs.");
    }
  };


  const logos = [
    "https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo-2014-present.jpg",
    "https://tse2.mm.bing.net/th/id/OIP.96OxWjEy7in-wy0k-f12ZgHaEK?r=0&pid=ImgDetMain",
    "https://www.logo-designer.co/wp-content/uploads/2015/10/Apple-Google-Interbrand-6th-annual-Best-Global-Brands-report.png",
    "https://static.vecteezy.com/system/resources/previews/014/018/578/non_2x/microsoft-logo-on-transparent-background-free-vector.jpg",
    "https://th.bing.com/th/id/R.e479c6b4c67f974f7ceb4605f17332d9?rik=RGN0%2biDVLnpAXw&riu=http%3a%2f%2flofrev.net%2fwp-content%2fphotos%2f2016%2f05%2fAmazon-logo.png&ehk=xF4jh7u2oTUutljz77AHIyPxQVM26QYgt7y0za9cQTs%3d&risl=&pid=ImgRaw&r=0",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png",
    "https://logos-world.net/wp-content/uploads/2020/11/Shopify-Symbol.png",
    "https://tse3.mm.bing.net/th/id/OIP.cMhtTaiB-Dck7s34XHVMhwHaHa?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  ];

  // Auto slide every 3s
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Show 4 logos at a time
  const visible = [
    logos[index % logos.length],
    logos[(index + 1) % logos.length],
    logos[(index + 2) % logos.length],
  ];

  const token = localStorage.getItem('accessToken')
  const Jobdata = async () => {
    try {
      // console.log("Fetching jobs for id:", "token:", token);
      const res = await axios.get(`http://localhost:8080/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("Response:", res.data);
      setalljobs(res.data.jobs?.slice(0, 3) || []);

    }
    catch (error) {
      console.log("Error fetching jobs:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    Jobdata()
  }, [])

  return (
    <div className="px-4 sm:px-20 py-12">
      <div className="flex flex-col lg:flex-row gap-10 justify-between sm:items-center">
        <div className="flex flex-col gap-6 flex-1 ">
          <h1 className="text-2xl sm:text-3xl font-semibold">Featured Jobs</h1>

          {alljobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
              }}
              className="flex flex-col md:flex-row justify-between border shadow-sm hover:shadow-lg transition rounded-lg border-gray-400 p-5 gap-6 md:gap-10"
            >
              {/* Left Side */}
              <div>
                <div className="flex items-center gap-4 font-semibold text-lg md:text-xl mb-3">
                  <img src={img} alt="logo" className="w-12" />
                  <h1>{job.title}</h1>
                </div>
                <p className="font-medium text-gray-700 flex flex-row items-center gap-2  hover:underline"> <FaLocationDot className="text-blue-500 hover:scale-110 cursor-pointer" />
                  {job.location}</p>
              </div>

              {/* Right Side */}
              <div className="flex flex-col md:items-end gap-4">
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition cursor-pointer"
                  onClick={() => navigatpage(job)}  >
                  Apply Now
                </button>
                <h2 className="font-semibold">${job.salary}/Year</h2>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex-1 items-center ">
          <h1 className="text-2xl sm:text-3xl font-semibold ">Top Companies</h1>
          <div className="mt-6 border  rounded-lg border-gray-300 py-8  sm:py-22 overflow-hidden">
            <style>{`
        @keyframes slide {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
  
        .animate-slide {
          display: flex;
          width: max-content;
          animation: slide 10s linear infinite;
        }
      `}</style>
            <div className="flex  ml-2  gap-7 sm:pb-1 justify-center">
              {visible.map((logo, i) => (
                <img
                  key={`${index}-${i}`}
                  src={logo}
                  alt={`Company-${i}`}
                  className="w-35 h-25 object-contain hover:scale-115 transition"
                  style={{
                    animation: `slideFade 2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
                    animationDelay: `${i * 200}ms`, // stagger effect
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Feature;
