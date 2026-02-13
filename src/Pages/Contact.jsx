import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Contact = () => {


    const [admindetails, setadmindetails] = useState({})
    const [massegedetail, setmassagedetail] = useState({
        name: "",
        email: "",
        message: "",
        userId: ""
    })

    const token = localStorage.getItem("accessToken");

    const hendlesubbmit = (e) => {
        setmassagedetail((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const fetchAdminProfile = async () => {
        try {
            const res = await axios.get(`https://pixel-job-portal-backend.onrender.com/api/admin/getAdmin`)

            const admin = res.data.admin || {};
            // console.log(user)
            setadmindetails(admin);

        } catch (error) {
            console.log("Error fetching admin:", error.response?.data || error.message);
             toast.error(error.response?.data?.msg || "Failed to  fetch contect email!", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light",
                  });
        }
    };

    useEffect(() => {
        fetchAdminProfile();
    }, []);


    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "https://pixel-job-portal-backend.onrender.com/api/inform/sendmassage",
                massegedetail, {
                headers: { Authorization: `Bearer ${token}` },
            }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                setmassagedetail({ name: "", email: "", message: "" });
            }
        } catch (error) {
            console.log("Error sending message:", error.response?.data || error.message);
             toast.info(error.response?.data?.message || "Login First!", {
                    position: "top-right",
                    autoClose: 1000,
                    theme: "light",
                  });
        }
    };



    return (
        <>
            <div className="relative z-20  bg-gradient-to-t from-[#CAEFEF] to-[#389DDA] min-h-[99vh] w-full">
                <div className=" sm:px-32 m-auto pt-20 sm:pt-35 flex flex-col gap-8 px-4">
                    {/* Heading */}
                    <div className='pt-9 sm:pt-11'>
                        <h1 className="text-3xl sm:text-5xl font-bold">Contact Us</h1>
                        <p className="text-lg sm:text-xl text-gray-600 mt-3">
                            We&apos;d love to hear from you. Get in touch today
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full justify-between">
                        {/* Contact Form */}
                        <form className="flex flex-col gap-5 bg-white p-6 sm:p-10  rounded-2xl w-full lg:w-[45%] text-gray-600 shadow-lg"
                            onSubmit={sendMessage}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={massegedetail.name}
                                name='name'
                                required
                                onChange={hendlesubbmit}
                                className="p-2 rounded border border-gray-600"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                required
                                value={massegedetail.email}
                                onChange={hendlesubbmit}
                                className="p-2 rounded border border-gray-600"
                            />
                            <textarea
                                placeholder="Message"
                                value={massegedetail.message}
                                name="message"
                                required
                                onChange={hendlesubbmit}
                                className="p-2 h-25 rounded border border-gray-600"
                            />
                            <button className="p-2 bg-blue-500 cursor-pointer text-white rounded-2xl hover:bg-blue-700 transition"
                                type='submit'   >
                                Send Message
                            </button>
                        </form>

                        {/* Contact Info + Map */}
                        <div className="flex flex-col gap-6 w-full lg:w-[50%] font-semibold">
                            <div className="flex flex-col gap-4 ">
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <FaLocationDot className="text-xl text-[#044b78]" />
                                    <p>{admindetails.address || "Address"}</p>
                                </div>
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <FaPhoneAlt className="text-xl text-[#03446c]" />
                                    <p>{admindetails.phone || "number"}</p>
                                </div>
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <TfiEmail className="text-xl text-[#042f49]" />
                                    <p>{admindetails.email || "Email"}</p>
                                </div>
                            </div>
                            {/* Google Map */}
                            <div className="  w-full">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.433839812462!2d75.75693107542894!3d26.88972321107823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4f57f20e9d1%3A0xb0f74eb4950ed848!2sLaxman%20Colony%2C%20Shyam%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302019!5e0!3m2!1sen!2sin!4v1757587874626!5m2!1sen!2sin"
                                    className='w-90 h-75 pb-5 lg:pb-1 sm:w-180 lg:w-140 sm:h-70 rounded-xl sm:rounded'
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
                <ToastContainer hideProgressBar />
        </>
    );
};

export default Contact;
