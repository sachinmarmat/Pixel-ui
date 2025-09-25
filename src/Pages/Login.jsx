import React from 'react'
import logo from '../assets/logo.png'
import contectimg from '../assets/contect-img.png'
import { FcGoogle } from "react-icons/fc";
import { BsLinkedin } from "react-icons/bs";
import bglogin from '../assets/bg-login.jpg'

const Login = () => {
    return (
        <> 
            <div
                className="min-h-screen w-full  bg-cover bg-center "
                style={{ backgroundImage: `url(${bglogin})` }}
            >
                <div className=" container m-auto  sm:px-22 relative z-10 ">
                    <div className=" flex pt-4 sm:pt-7 lg:pt-12 flex-col gap-5 px-5">
                        {/* Logo + Brand */}
                        <div className="flex items-center gap-2 sm:pl-2">
                            <a href="/">
                                <img src={logo} alt="logo-img" className="w-12 sm:w-16 rounded-4xl" />
                            </a>
                            <h1 className="text-2xl md:text-3xl font-medium text-white">PixelGenix</h1>
                        </div>

                        {/* Login Box */}
                        <div className="bg-gray-100/20  sm:p-5 rounded-3xl">
                            <div className="flex flex-col lg:flex-row justify-around p-5 sm:p-3 md:p-0  items-center ">
                                {/* Left Side */}
                                <div className="flex flex-col items-center gap-8 sm:gap-10 lg:w-1/2">
                                    <h1 className="text-3xl pt-2 sm:text-5xl  font-bold text-black md:text-white">
                                        Welcome <span className="text-orange-600">Back!</span>
                                    </h1>
                                    <img src={contectimg} alt="welcome" className="rounded-2xl max-w-xs sm:max-w-sm pb-4 sm:pb-2  lg:max-w-xl" />
                                </div> 

                                {/* Right Side - Login Form */}
                                <div className="flex flex-col gap-4  p-7 px-5 md:px-8 sm:p-8 rounded-2xl w-full lg:w-[60vh] shadow-md md:bg-gray-100/10 bg-gray-100/30 ">
                                    <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold text-center">
                                        Login to Your Account
                                    </h1>
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                                    />
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                                    />
                                    <p className="font-medium text-gray-500 text-end hover:text-gray-600 cursor-pointer">
                                        Forget password?
                                    </p>
                                    <button className="bg-blue-500 p-2 rounded-xl cursor-pointer  hover:bg-blue-700  text-white font-semibold">
                                        Login
                                    </button>

                                    {/* Divider */}
                                    <div className="flex items-center text-gray-600 font-medium">
                                        <div className="flex-grow border-t border-gray-400"></div>
                                        <span className="mx-2">or</span>
                                        <div className="flex-grow border-t border-gray-400"></div>
                                    </div>

                                    {/* Social Logins */}
                                    <button className="bg-blue-500 p-2 rounded-xl cursor-pointer  hover:bg-blue-700  font-semibold flex items-center justify-center gap-3 text-black">
                                        <FcGoogle className="bg-white rounded-full" /> Login with Google
                                    </button>
                                    <button className="bg-blue-500 p-2 rounded-xl cursor-pointer hover:bg-blue-700 font-semibold flex items-center justify-center gap-3 text-black">
                                        <BsLinkedin /> Login with LinkedIn
                                    </button>

                                    {/* Signup link */}
                                    <p className="text-gray-600 font-medium text-center">
                                        Don&apos;t have an account?
                                        <a href="/Signup" className="text-blue-600 hover:text-blue-800 pl-1">Sign-Up</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login
