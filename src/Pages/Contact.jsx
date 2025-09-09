import React from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

const Contact = () => {
    const containerStyle = { width: "100%", height: "260px" };
    const center = { lat: 26.64859, lng: 74.03414 };

    return (
        <div className="relative z-20 bg-gradient-to-t from-[#CAEFEF] to-[#389DDA] min-h-[97vh] w-full">
            <div className="container m-auto pt-20 sm:pt-40 flex flex-col gap-10 px-4">
                {/* Heading */}
                <div>
                    <h1 className="text-3xl sm:text-5xl font-bold">Contact Us</h1>
                    <p className="text-lg sm:text-xl text-gray-600 mt-3">
                        We&apos;d love to hear from you. Get in touch today
                    </p>
                </div>

                {/* Contact Section */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full justify-between">
                    {/* Contact Form */}
                    <form className="flex flex-col gap-5 bg-white p-6 sm:p-10 rounded-2xl w-full lg:w-[45%] text-gray-600 shadow-lg">
                        <input
                            type="text"
                            placeholder="Name"
                            className="p-2 rounded border border-gray-600"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="p-2 rounded border border-gray-600"
                        />
                        <textarea
                            placeholder="Message"
                            className="p-4 rounded border border-gray-600"
                        />
                        <button className="p-2 bg-blue-500 cursor-pointer text-white rounded-2xl hover:bg-blue-700 transition">
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info + Map */}
                    <div className="flex flex-col gap-6 w-full lg:w-[50%] font-semibold">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 sm:gap-6">
                                <FaLocationDot className="text-xl text-[#044b78]" />
                                <p>Venue path, Jaipur, Raj, 302029</p>
                            </div>
                            <div className="flex items-center gap-4 sm:gap-6">
                                <FaPhoneAlt className="text-xl text-[#03446c]" />
                                <p>123-456-789-01</p>
                            </div>
                            <div className="flex items-center gap-4 sm:gap-6">
                                <TfiEmail className="text-xl text-[#042f49]" />
                                <p>pixel@gmail.com</p>
                            </div>
                        </div>

                        {/* Google Map */}
                        <div className="w-full rounded-2xl overflow-hidden">
                            <LoadScript googleMapsApiKey="YOUR_API_KEY">
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={12}
                                >
                                    <Marker position={center} />
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
