import React, { useState } from "react";
import bglogin from "../assets/bg-login.jpg";
import signup from "../assets/signup.jpg";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const backendUrl = "http://localhost:8080";

const Signup = () => {
  const navigate = useNavigate();

  const [ragistra, setragistra] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "employ",
  });

  const [loading, setLoading] = useState(false); //  loading state

  // Handle input change
  const handleform = (e) => {
    setragistra((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle signup submit
  const signupform = async (e) => {
    e.preventDefault();
    setLoading(true); //  Start loading

    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/employer/register`,
        ragistra
      );

      toast.success(res.data.msg, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => navigate("/Login"), 1500);
    } catch (error) {
      console.error(" Signup error:", error.response?.data || error.message);

      const errorMsg = error.response?.data?.msg || "Signup failed!";
      if (errorMsg.toLowerCase().includes("email")) {
        toast.error("Email already registered! Please login instead.", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error(errorMsg, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    } finally {
      setLoading(false); // ✅ Stop loading after request done
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${bglogin})` }}
    >
      <div className="flex flex-col lg:flex-row bg-gray-100/40 backdrop-blur-sm shadow-xl rounded-2xl w-full max-w-6xl">
        {/* Left image */}
        <div className="w-full lg:w-1/2">
          <img
            src={signup}
            alt="signup-img"
            className="w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl"
          />
        </div>

        {/* Right form */}
        <form
          onSubmit={signupform}
          className="flex flex-col gap-6 p-5 sm:p-10 w-full lg:w-1/2"
        >
          <h1 className="text-gray-900 text-2xl sm:pt-1 pt-3 sm:text-3xl font-bold text-center">
            Create Employer Account
          </h1>

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Company Name</label>
            <input
              placeholder="Company Name"
              type="text"
              name="name"
              required
              value={ragistra.name}
              onChange={handleform}
              className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
            />
          </div>

          {/* Work Email */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Work Email</label>
            <input
              placeholder="Company Email"
              type="email"
              name="email"
              required
              value={ragistra.email}
              onChange={handleform}
              className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
            />
          </div>

          {/* Passwords */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-medium">Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                required
                value={ragistra.password}
                onChange={handleform}
                className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="font-medium">Confirm Password</label>
              <input
                placeholder="Confirm Password"
                type="password"
                required
                name="confirmpassword"
                className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Address</label>
            <input
              placeholder="Company Address"
              type="text"
              name="address"
              required
              value={ragistra.address}
              onChange={handleform}
              className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
            />
          </div>
          {/* Terms checkbox */}
          <div className="flex gap-2 items-center mt-2">
            <input
              type="checkbox"
              className="h-4 w-4 accent-blue-600 cursor-pointer"
              required
            />
            <p>
              I agree to{" "}
              <span className="font-semibold text-blue-700 cursor-pointer hover:underline">
                Terms &amp; Conditions
              </span>
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`p-2 rounded-md text-white font-semibold transition-colors cursor-pointer ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Please wait...
              </div>
            ) : (
              "Proceed"
            )}
          </button>

          {/* Sign-in link */}
          <p className="text-gray-600 font-medium text-center">
            Already have an account?
            <a href="/Login" className="text-blue-600 hover:text-blue-800 pl-1">
              Sign-in
            </a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
