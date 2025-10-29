import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
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
    role: "jobseeker", //  fixed role
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setSignupForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit signup form
  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, role } = signupForm;

    // Validation
    // if (!name || !email || !password || !confirmPassword) {
    //   toast.error("Please fill all fields!", {
    //     position: "top-center",
    //     autoClose: 3000,
    //     transition: Bounce,
    //   });
    //   return;
    // }

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
      const res = await axios.post("http://localhost:8080/api/auth/user/register", {
        name,
        email,
        password,
        role,
      });

      toast.success(res.data.message || "Signup successful!", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });

      setTimeout(() => navigate("/Login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.msg || res.data.msg , {
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
        className="min-h-screen w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bglogin})` }}
      >
        {/*  Loader Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <p className="text-white font-semibold text-xl ml-4">Creating Account...</p>
          </div>
        )}

        <div className="container m-auto px-5 sm:px-12 relative z-10">
          <div className="flex flex-col items-center pt-10 lg:pt-16 gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <a href="/">
                <img src={logo} alt="logo" className="w-12 sm:w-16 rounded-4xl" />
              </a>
              <h1 className="text-3xl font-medium text-white">PixelGenix</h1>
            </div>

            {/* Signup Card */}
            <div className="bg-gray-100/20 sm:p-5 rounded-3xl shadow-lg flex flex-col lg:flex-row justify-around p-5 items-center gap-10">
              {/* Left Side */}
              <div className="flex flex-col items-center gap-6 lg:w-1/2">
                <h1 className="text-3xl sm:text-5xl font-bold text-black md:text-white">
                  Create <span className="text-orange-600">Account</span>
                </h1>
                <img
                  src={signupimg}
                  alt="signup"
                  className="rounded-2xl max-w-xs sm:max-w-sm lg:max-w-xl"
                />
              </div>

              {/* Right Side */}
              <form
                onSubmit={handleSignup}
                className="flex flex-col gap-4 p-7 sm:p-8 rounded-2xl w-full lg:w-[60vh] bg-gray-100/40 md:bg-gray-100/20"
              >
                <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold text-center">
                  Jobseeker Signup
                </h1>

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={signupForm.name}
                  onChange={handleChange}
                  className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={signupForm.email}
                  onChange={handleChange}
                  className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                />

                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  value={signupForm.password}
                  onChange={handleChange}
                  className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Confirm Password"
                  value={signupForm.confirmPassword}
                  onChange={handleChange}
                  className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  
                  className="bg-blue-500 p-2 rounded-xl cursor-pointer hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
             >
                  {loading ? "Please wait..." : "Signup"}
                </button>

                <p className="text-gray-700 text-center font-medium">
                  Already have an account?
                  <a href="/Login" className="text-blue-600 hover:text-blue-800 pl-1">
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer hideProgressBar />
    </>
  );
};

export default UserSignup;
