import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import signupimg from "../assets/contect-img.png";
import bglogin from "../assets/bg-login.jpg";

const UserSignup = () => {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "jobseeker",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSignupForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, role, address } = signupForm;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://pixel-job-portal-backend.onrender.com/api/auth/user/register", {
        name,
        email,
        password,
        role,
        address,
      }
);

      toast.success(res.data.message || "Signup successful!", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });

      setTimeout(() => navigate("/Login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${bglogin})` }}
      >
        {loading && (
          <div className="absolute inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              <p className="text-white font-semibold text-lg mt-3">
                Creating Account...
              </p>
            </div>
          </div>
        )}

        <div className="bg-white/15 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl w-[95%] sm:w-[85%] lg:w-[75%] flex flex-col lg:flex-row overflow-hidden relative z-10">
          {/* Left Section */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-600/70 to-indigo-800/60 text-white p-8 lg:w-1/2">
            <a href="/"><div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="logo" className="w-14 rounded-xl" />
              <h1 className="text-3xl font-semibold">PixelGenix</h1>
            </div></a>
            <h2 className="text-4xl font-bold mb-4 text-center leading-tight">
              Create Your <span className="text-orange-300">Account</span>
            </h2>
            <p className="text-gray-200 text-center max-w-md">
              Join PixelGenix and start your journey to your dream career today!
            </p>
            <img
              src={signupimg}
              alt="signup"
              className="rounded-2xl mt-8 w-72 sm:w-80"
            />
          </div>

          {/* Right Section - Form */}
          <div className="p-8 sm:p-10 lg:w-1/2 flex flex-col justify-center bg-white/90 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Jobseeker Signup
            </h2>
            <form onSubmit={handleSignup} className="flex flex-col gap-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={signupForm.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={signupForm.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={signupForm.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter password"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={signupForm.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={signupForm.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter your address"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Sign Up"}
              </button>

              <p className="text-center text-gray-700 font-medium mt-2">
                Already have an account?
                <a href="/Login" className="text-blue-600 hover:underline pl-1">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer hideProgressBar />
    </>
  );
};

export default UserSignup;
