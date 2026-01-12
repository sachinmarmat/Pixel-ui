import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaInstagram, FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

const Footer = () => {

  const [admindetails, setadmindetails] = useState({}) 

  const token = localStorage.getItem("accessToken");

  const fetchAdminProfile = async () => {
    try {
      const res = await axios.get(`https://pixel-job-portal-backend.onrender.com/api/admin/getAdmin`)
      
      const admin = res.data.admin || {};
      // console.log(user)
      setadmindetails(admin);

    } catch (error) {
      console.log("Error fetching admin:", error.response?.data || error.message);
      toast.error("Failed to fetch admin profile!", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);


  return (
    <footer className="bg-blue-600 text-white pt-12 pb-6">
      <div className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* --- Company Info --- */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Pixelgenix IT Solutions</h2>
          <p className="text-gray-100 leading-relaxed mb-4">
            Empowering innovation with smart digital solutions for web,
            mobile, and cloud. Let’s grow together with technology that works
            for you.
          </p>
          <p className="text-sm text-gray-200 italic">
            “Turning ideas into impactful digital experiences.”
          </p>
        </div>

        {/* --- Links --- */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-l-4 border-white pl-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-100">
            <li><a href="/" className="hover:text-yellow-300 transition">Jobs</a></li>
            <li><a href="/Companies" className="hover:text-yellow-300 transition">Companies</a></li>
            <li><a href="/Aboutus" className="hover:text-yellow-300 transition">About Us</a></li>
            <li><a href="/Contact" className="hover:text-yellow-300 transition">Contact</a></li>
            <li><a href="/" className="hover:text-yellow-300 transition">Privacy Policy</a></li> 
          </ul>
        </div>

        {/* --- Contact --- */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-l-4 border-white pl-2">
            Contact Us
          </h3>

          <ul className="space-y-3 text-gray-100">
            <li className="flex items-center gap-3">
              <MdPhone className="text-xl" /> <span>{admindetails.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <MdEmail className="text-xl" />
              <span>{admindetails.email}</span>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-xl" />
              <p>{admindetails.address}</p>
            </li>
          </ul>


        </div>

        {/* --- Newsletter --- */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-l-4 border-white pl-2">
            Stay Updated
          </h3>
          <p className="text-gray-100 mb-3">
            Subscribe for job updates and tech insights.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full sm:flex-1 px-4 py-2 bg-gray-100/40 rounded-md text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-black px-5 py-2 rounded-md font-semibold transition"
            >
             <a href="/PremiumPlans">Subscribe</a> 
            </button>
          </form>
        </div>   
      </div>

      {/* --- Social Media --- */}
      <div className="border-t border-blue-400 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center px-6 md:px-12">
        <div className="flex gap-4 text-white text-xl">
          <a href="#" className="hover:text-yellow-300 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-yellow-300 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-yellow-300 transition"><FaXTwitter /></a>
          <a href="#" className="hover:text-yellow-300 transition"><FaLinkedinIn /></a>
        </div>

        <p className="text-gray-100 text-sm text-center mt-4 sm:mt-0">
          © {new Date().getFullYear()} <span className="font-semibold">Pixelgenix IT Solutions</span>. All Rights Reserved.
        </p>
      </div>
            <ToastContainer position="top-right" />
      
    </footer>
  );
};

export default Footer;
