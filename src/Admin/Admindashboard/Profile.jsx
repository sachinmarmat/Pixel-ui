import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaUserEdit } from "react-icons/fa";

const AdminProfile = () => {
  const [adminProfile, setAdminProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
  });

  const token = localStorage.getItem("accessToken");

  // 🟢 Fetch Admin Profile
  const fetchAdminProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = res.data.user || {};
      setAdminProfile(user);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        website: user.website || "",
        address: user.address || "",
      });
    } catch (error) {
      console.log("Error fetching admin:", error.response?.data || error.message);
      toast.error("Failed to fetch admin profile!", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  //  Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Update Admin Profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/user/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAdminProfile(res.data.user);
      setEditMode(false);
      toast.success("Profile updated successfully!", { position: "top-right" });
    } catch (error) {
      console.log("Error updating admin:", error.response?.data || error.message);
      toast.error("Update failed! Try again.", { position: "top-right" });
    }
  };

  return (
    <div className="flex justify-center items-center  p-5">
      <ToastContainer theme="colored" hideProgressBar />

      <div className="relative  bg-gradient-to-br from-gray-900/90 via-indigo-900/90 to-blue-900/90 rounded-3xl shadow-2xl p-8 w-[400px] text-white transform transition-all duration-500 hover:scale-[1.02]">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/30 to-blue-500/20 blur-2xl -z-10"></div>

        {/* Profile Header */}
        <div className="flex flex-col items-center border-b  border-white/20 pb-6 mb-6">
          <div className="relative group">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              alt="Admin Avatar"
              className="w-28 h-28 rounded-full border-4 border-indigo-400 object-cover shadow-lg transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-1 right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-white">
            {adminProfile.name || "Admin User"}
          </h1>
          <p className="text-indigo-200 font-medium">
            {adminProfile.role || "Administrator"}
          </p>
        </div>

        {/* Profile Details */}
        {!editMode ? (
          <div className="flex flex-col gap-4 text-indigo-100">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-indigo-400" />
              <p>{adminProfile.email || "admin@gmail.com"}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-indigo-400" />
              <p>{adminProfile.phone || "+91 98765 43210"}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaGlobe className="text-indigo-400" />
              <p>{adminProfile.website || "www.pixelgenix.com"}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-400" />
              <p>{adminProfile.address || "Indore, India"}</p>
            </div>

            <button
              onClick={() => setEditMode(true)}
              className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
            >
              <FaUserEdit /> Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-2 text-white">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
              className="border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="flex-1 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
