import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit3, FiSave } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    company: "",
  });

  const [adminProfile, setAdminProfile] = useState({});
  const token = localStorage.getItem("accessToken");

  // 🟢 Fetch Admin / User Profile
  const fetchAdminProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = res.data.user || {};
      setAdminProfile(user);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        website: user.website || "",
        company: user.companyName || "",
      });
    } catch (error) {
      console.log("Error fetching profile:", error.response?.data || error.message);
      toast.error("Failed to fetch profile!", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  // 🟠 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟢 Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:8080/api/user/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminProfile(res.data.user);
      setEditMode(false);
      toast.success("Profile updated successfully!", { position: "top-right" });
    } catch (error) {
      console.log("Error updating profile:", error.response?.data || error.message);
      toast.error("Update failed! Try again.", { position: "top-right" });
    }
  };

  return (
    <div className="flex justify-center h-[70vh] sm:ml-24 p-6">
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="h-17 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <img
              src="https://www.shutterstock.com/image-illustration/thinking-person-lightbulb-idea-brain-260nw-378526894.jpg"
              alt="Profile"
              className="w-18 h-18 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 px-8 pb-10 text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-1">
            {formData.name || "Your Name"}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            {formData.company || "Pixel Genix"}
          </p>

          {/* Edit / Save Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={editMode ? handleUpdate : () => setEditMode(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-200 ${
                editMode
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {editMode ? (
                <>
                  <FiSave /> Save Changes
                </>
              ) : (
                <>
                  <FiEdit3 /> Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                disabled={!editMode}
                onChange={handleChange}
                className={`w-full border px-4 py-2 rounded-lg focus:outline-none ${
                  editMode
                    ? "border-blue-400 bg-white"
                    : "border-gray-200 bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled={!editMode}
                onChange={handleChange}
                className={`w-full border px-4 py-2 rounded-lg focus:outline-none ${
                  editMode
                    ? "border-blue-400 bg-white"
                    : "border-gray-200 bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className=" text-gray-600 font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                disabled={!editMode}
                onChange={handleChange}
                className={`w-full border px-4 py-2 rounded-lg focus:outline-none ${
                  editMode
                    ? "border-blue-400 bg-white"
                    : "border-gray-200 bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

                      
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
