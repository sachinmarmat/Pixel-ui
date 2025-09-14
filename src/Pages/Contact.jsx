import React from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

const Contact = () => {

    return (
        <div className="relative z-20 bg-gradient-to-t from-[#CAEFEF] to-[#389DDA] min-h-[99vh] w-full">
            <div className="container m-auto pt-20 sm:pt-35 flex flex-col gap-10 px-4">
                {/* Heading */}
                <div className='pt-7'>
                    <h1 className="text-3xl sm:text-5xl font-bold">Contact Us</h1>
                    <p className="text-lg sm:text-xl text-gray-600 mt-3">
                        We&apos;d love to hear from you. Get in touch today
                    </p>
                </div>

                {/* Contact Section */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full justify-between">
                    {/* Contact Form */}
                    <form className="flex flex-col gap-5 bg-white p-6 sm:p-10  rounded-2xl w-full lg:w-[45%] text-gray-600 shadow-lg">
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
                        <div className="w-full rounded-2xl "> 
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.433839812462!2d75.75693107542894!3d26.88972321107823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4f57f20e9d1%3A0xb0f74eb4950ed848!2sLaxman%20Colony%2C%20Shyam%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302019!5e0!3m2!1sen!2sin!4v1757587874626!5m2!1sen!2sin"
                                width={600}
                                height={300}
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
