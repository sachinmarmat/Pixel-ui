import React from 'react'

const Adminlogin = () => {
    return (
        <div
            className=" h-[100vh]  bg-cover bg-center  bg-no-repeat"
            style={{
                backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20250728/pngtree-finger-touching-glowing-blue-digital-human-icon-on-futuristic-interface-image_17669105.webp')"
            }}
        >
                <div className="m-auto flex items-center py-35 justify-center">
            <div className="backdrop-blur-lg bg-white/10 p-10 rounded-2xl shadow-2xl w-120 border border-white/20">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
                    Admin Login
                </h2> 
                    <form className="flex flex-col space-y-5">
                        <div>
                            <label className="text-sm text-white/80">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full mt-1 p-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-white/80">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="w-full mt-1 p-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
          
                        <button
                            type="submit"
                            className="mt-4 bg-gradient-to-r from-blue-500 to-orange-400 text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
                        >
                            Login
                        </button>

                        <p className="text-sm text-white/70 text-center mt-2">
                            Forgot your password?{" "}
                            <a href="#" className="text-blue-400 hover:underline">
                                Reset here
                            </a>   
                        </p>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Adminlogin
