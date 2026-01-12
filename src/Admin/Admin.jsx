import React, { useEffect, useState } from "react";
import Adminnav from "./Adminnav";
import { Outlet, useLocation } from "react-router-dom";
import { BsFillBellFill } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineDeleteOutline, MdOutlineFolderDelete } from "react-icons/md";

const Admindashboard = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const mainpath = path[2];
  const subpath = path[3];

  const [messages, setMessages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const token = localStorage.getItem("accessToken");

  const fetchMessages = async () => {
    try {
      const res = await axios.get("https://pixel-job-portal-backend.onrender.com/api/inform/getmassage", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setMessages(res.data.messages);
      } else {
        toast.info("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.info("Server error while fetching messages");
    }
  };
  const handleDeleteMessage = async (id) => {
    try {
      const res = await axios.delete(`https://pixel-job-portal-backend.onrender.com/api/inform/${id}/deletemassage`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        // toast.success("Message deleted successfully");
        // Remove from state without reloading
        setMessages(messages.filter((msg) => msg._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete message");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <div className="flex">
      <Adminnav />

      <div className="flex-1 relative">
        <div className="bg-blue-200 min-h-screen h-full">
          {/* --- Header --- */}
          <div className="flex justify-between text-3xl px-12 py-10 items-center relative">
            <h1 className="font-bold">PixelGenix</h1>

            {/* Bell Icon with Badge */}
            <div className="relative">
              <BsFillBellFill
                className="text-gray-700 cursor-pointer hover:text-blue-600 transition"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {messages.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                  {messages.length}
                </span>
              )}

              {/* Dropdown for Messages */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-lg border border-gray-200 z-50">
                  <div className="p-2 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-blue-700">
                      New Messages
                    </h3>
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  <div className=" overflow-y-auto">
                    {messages.length === 0 ? (
                      <p className="p-4 text-xl text-gray-500 text-center">
                        No messages
                      </p>
                    ) : (
                      messages.slice(0, 6).map((msg) => (
                        <div
                          key={msg._id}
                          className="p-2 border-b border-gray-100 hover:bg-blue-50 transition"
                        >
                          <div className="flex justify-between"> <p className="font-semibold text-lg text-gray-800">
                            {msg.name || "Unknown User"}
                          </p>
                            <MdOutlineFolderDelete className="text-[22px] text-red-400 cursor-pointer "
                              onClick={() => handleDeleteMessage(msg._id)}
                            />
                          </div>
                          <p className="text-sm underline text-gray-900 line-clamp-1">
                            {msg.email}
                          </p>
                          <p className="text-sm text-gray-600">
                            {msg.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(msg.createdAt)}
                          </p>
                        </div>
                      ))
                    )}
                  </div>


                </div>
              )}
            </div>
          </div>

          <div className="border-b-2 border-gray-400"></div>

          {/* --- Path Heading --- */}
          <div className="px-10 pt-12 pb-1">
            <h1 className="text-2xl text-orange-600 font-medium flex gap-2 items-center">
              {mainpath || "Dashboard"}
              {subpath && (
                <span className="text-orange-500"> / {subpath}</span>
              )}
            </h1>
          </div>

          {/* --- Outlet (content area) --- */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
