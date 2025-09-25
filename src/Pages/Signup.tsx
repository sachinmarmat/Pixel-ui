import React from 'react'
import bglogin from '../assets/bg-login.jpg'
import signup from '../assets/signup.jpg'

const Signup = () => {
    return (
        <div
            className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4"
            style={{ backgroundImage: `url(${bglogin})` }}
        >
            <div
                className=" flex flex-col lg:flex-row bg-gray-100/40 backdrop-blur-sm shadow-xl rounded-2xl w-full max-w-6xl "
            >
                {/* Left image section */}
                <div className="w-full lg:w-1/2 ">
                    <img
                        src={signup}
                        alt="signup-img"
                        className="w-full h-full object-cover rounded-t-2xl   lg:rounded-l-2xl"
                    />
                </div>

                {/* Right form section */}
                <div
                    className="flex flex-col  gap-6 p-5  sm:p-10 w-full  lg:w-1/2 "
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
                            className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                        />
                    </div>

                    {/* Work Email */}
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Work Email</label>
                        <input
                            placeholder="Company Email"
                            type="email"
                            className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                        />
                    </div>

                    {/* Passwords: stack on small, side-by-side on md+ */}
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="font-medium">Password</label>
                            <input
                                placeholder="Password"
                                type="password"
                                className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <label className="font-medium">Confirm Password</label>
                            <input
                                placeholder="Confirm Password"
                                type="password"
                                className="p-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a70a5]"
                            />
                        </div>
                    </div>

                    {/* Terms checkbox */}
                    <div className="flex gap-2 items-center mt-2">
                        <input type="checkbox" className="h-4 w-4 accent-blue-600 cursor-pointer" />
                        <p>
                            I agree to{" "}
                            <span className="font-semibold text-blue-700 cursor-pointer hover:underline">
                                Terms &amp; Conditions
                            </span>
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        className=" bg-blue-500 p-2 rounded-md text-white font-semibold  hover:bg-blue-700 transition-colors cursor-pointer "
                    >
                        Proceed
                    </button>

                    {/* Sign-in link */}
                    <p className="text-gray-600 font-medium text-center">
                        Don&apos;t have an account?
                        <a
                            href="/Login"
                            className="text-blue-600 hover:text-blue-800 pl-1"
                        >
                            Sign-in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
