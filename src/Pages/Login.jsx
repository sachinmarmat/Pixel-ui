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
  const [loginform, setloginform] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  Handle Input Change
  const handlelogin = (e) => {
    setloginform((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //  Reverify Email Function
  const handleReverify = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/auth/resend-verification", {
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

  //  Submit Login 
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
      const res = await axios.post(`http://localhost:8080/api/auth/user/login`, loginform);

      console.log(" login success:", res.data);

      // Store token and role in localStorage
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.msg, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce
      });

      //  Role-based redirect
      setTimeout(() => {
        const role = res.data.user.role;

        if (role === "admin") {
          navigate("/Admin");
        } else if (role === "employ") {
          navigate("/Employedashboard");
        } else if (role === "jobseeker") {
          navigate("/");
        } 
      }, 500); 

    } catch (error) {
      console.error("Login error:", error.response?.data || error.msg);
      const errorMsg = error.response?.data?.msg || "Login failed!";

      //  Detect “verify email” case
      if (errorMsg.toLowerCase().includes("verify")) {
        toast(
          ({ closeToast }) => (
            <div className="p-5 items-center sm:h-50 flex flex-col text-center">
              <h3 className="text-2xl font-semibold text-red-500 mb-2 mt-2">
                Email Not Verified
              </h3>
              <p className="text-gray-800 mb-4 mt-2">{errorMsg}</p>
              <button
                onClick={() => {
                  closeToast();
                  handleReverify();
                }}
                className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-medium px-4 py-2 absolute bottom-8 rounded-xl"
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
            className: "min-w-[320px] sm:min-w-[400px]",
          }
        );
      }

      //  Handle common errors
      else if (errorMsg.toLowerCase().includes("email")) {
        toast.error(errorMsg, {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
          transition: Bounce
        });
      } else if (errorMsg.toLowerCase().includes("password")) {
        toast.error(errorMsg, {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
          transition: Bounce
        });
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
            <p className="text-white font-semibold text-xl ml-4">Logging in...</p>
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

                {/* Right Side - Login Form */}
                <form onSubmit={logindata} className="flex flex-col gap-4 p-7 px-5 md:px-8 sm:p-8 rounded-2xl w-full lg:w-[60vh] shadow-md md:bg-gray-100/10 bg-gray-100/30">
                  <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold text-center">
                    Login to Your Account
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

                  <input
                    placeholder="Password"
                    type="password"
                    required
                    name="password"
                    value={loginform.password}
                    onChange={handlelogin}
                    className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                  />

                  <p className="font-medium text-gray-500 text-end hover:text-gray-600 cursor-pointer">
                    Forget password?
                  </p>

                  <button
                    className="bg-blue-500 p-2 rounded-xl cursor-pointer hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Please wait..." : "Login"}
                  </button>

                  <div className="flex items-center text-gray-600 font-medium">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="mx-2">or</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                  </div>

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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toastify Container */}
      <ToastContainer hideProgressBar />
    </>
  );
};

export default Login;
