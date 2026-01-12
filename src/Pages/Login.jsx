import React, { useState } from 'react';
import logo from '../assets/logo.png';
import contectimg from '../assets/contect-img.png';
import { FcGoogle } from "react-icons/fc";
import { BsLinkedin } from "react-icons/bs";
import bglogin from '../assets/bg-login.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loginform, setloginform] = useState({ email: "", password: "" });
  const [forgotMode, setForgotMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handlelogin = (e) => {
    setloginform((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Reverify Email
  const handleReverify = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://pixel-job-portal-backend.onrender.com/api/auth/resend-verification", {
        email: loginform.email,
      });
      toast.success(res.data.msg || "Verification email sent!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to send verification email!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Normal Login Function
  const logindata = async (e) => {
    e.preventDefault();

    if (!loginform.email || !loginform.password) {
      toast.error("Please fill in both email and password!", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`https://pixel-job-portal-backend.onrender.com/api/auth/user/login`, loginform);
      const user = res.data.user;

      if (user.status && user.status.toLowerCase() === "suspended") {
        toast.error(res.data.msg);
        setLoading(false);
        return;
      }

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(res.data.msg, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        if (user.role === "admin") navigate("/Admin");
        else if (user.role === "employ") navigate("/Employedashboard");
        else if (user.role === "jobseeker") navigate("/");
      }, 500);
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Login failed!";
      if (errorMsg.toLowerCase().includes("verify")) {
        toast(
          ({ closeToast }) => (
            <div className="p-5 items-center flex flex-col text-center">
              <h3 className="text-2xl font-semibold text-red-500 mb-2 mt-2">
                Email Not Verified
              </h3>
              <p className="text-gray-800 mb-4 mt-2">{errorMsg}</p>
              <button
                onClick={() => {
                  closeToast();
                  handleReverify();
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl"
              >
                Reverify Email
              </button>
            </div>
          ),
          {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            theme: "light",
            transition: Zoom,
          }
        );
      } else {
        toast.error(errorMsg, {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
          transition: Bounce
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Forgot Password Handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!loginform.email || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields!", { position: "top-center" });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(`https://pixel-job-portal-backend.onrender.com/api/user/profile`, {
        email: loginform.email,
        newPassword,
      });

      toast.success(res.data.msg || "Password updated successfully!", {
        position: "top-center",
        autoClose: 2500,
        theme: "light",
        transition: Bounce,
      });

      setForgotMode(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to reset password!", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
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
        {loading && (
          <div className="absolute inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <p className="text-white font-semibold text-xl ml-4">
              {forgotMode ? "Updating..." : "Logging in..."}
            </p>
          </div>
        )}

        <div className="container m-auto lg:px-22 sm:px-12 relative z-10">
          <div className="flex pt-4 sm:pt-7 lg:pt-12 flex-col gap-5 px-5">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:pl-2">
              <a href="/">
                <img src={logo} alt="logo-img" className="w-12 sm:w-16 rounded-4xl" />
              </a>
              <h1 className="text-2xl md:text-3xl font-medium text-white">PixelGenix</h1>
            </div>

            {/* Login Box */}
            <div className="bg-gray-100/20 sm:p-5 rounded-3xl">
              <div className="flex flex-col lg:flex-row justify-around p-5 gap-23 sm:gap-2 items-center">

                {/* Left Side */}
                <div className="flex flex-col items-center gap-8 sm:gap-10 lg:w-1/2">
                  <h1 className="text-3xl pt-2 sm:text-5xl font-bold text-black md:text-white">
                    Welcome <span className="text-orange-600">Back!</span>
                  </h1>
                  <img
                    src={contectimg}
                    alt="welcome"
                    className="rounded-2xl max-w-xs sm:max-w-sm pb-4 sm:pb-2 lg:max-w-xl"
                  />
                </div>

                {/* Right Side */}
                <form
                  onSubmit={forgotMode ? handleForgotPassword : logindata}
                  className="flex flex-col gap-4 p-7 px-5 md:px-8 sm:p-8 rounded-2xl w-full lg:w-[60vh] shadow-md md:bg-gray-100/10 bg-gray-100/30"
                >
                  <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold text-center">
                    {forgotMode ? "Reset Password" : "Login to Your Account"}
                  </h1>

                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                    value={loginform.email}
                    onChange={handlelogin}
                    className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                  />

                  {/* Password fields */}
                  {!forgotMode && (
                    <input
                      placeholder="Password"
                      type="password"
                      required
                      name="password"
                      value={loginform.password}
                      onChange={handlelogin}
                      className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                    />
                  )}

                  {forgotMode && (
                    <>
                      <input
                        placeholder="New Password"
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                      />
                      <input
                        placeholder="Confirm Password"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                      />
                    </>
                  )}

                  {!forgotMode && (
                    <p
                      className="font-medium text-gray-500 text-end hover:text-gray-600 cursor-pointer"
                      onClick={() => setForgotMode(true)}
                    >
                      Forget password?
                    </p>
                  )}

                  <button
                    className="bg-blue-500 p-2 rounded-xl cursor-pointer hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Please wait..." : forgotMode ? "Update Password" : "Login"}
                  </button>

                  {/* 🔹 Google & LinkedIn always visible */}
                  {!forgotMode && (
                    <>
                   
                  <button className="bg-blue-500 p-2 rounded-xl cursor-pointer hover:bg-blue-700 font-semibold flex items-center justify-center gap-3 text-black">
                    <FcGoogle className="bg-white rounded-full" /> Login with Google
                  </button>
                  <button className="bg-blue-500 p-2 rounded-xl cursor-pointer hover:bg-blue-700 font-semibold flex items-center justify-center gap-3 text-black">
                    <BsLinkedin /> Login with LinkedIn
                  </button>

                  <p className="text-gray-600 font-medium text-center">
                    Don&apos;t have an account?
                    <a href="/Signup" className="text-blue-600 hover:text-blue-800 pl-1">Sign-Up</a>
                  </p>
                  </> )}

                  {forgotMode && (
                    <p
                      onClick={() => setForgotMode(false)}
                      className="text-blue-700 font-medium cursor-pointer text-center"
                    >
                      Back to Login
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer hideProgressBar />
    </>
  );
};

export default Login;
