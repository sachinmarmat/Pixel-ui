import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProfile = () => {
  const [adminProfile, setAdminProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
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
    <div className="flex justify-center items-center ">
      <ToastContainer theme="colored" hideProgressBar />

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[400px] transform transition-all duration-300 hover:scale-[1.01]">
        {/* Profile Header */}
        <div className="flex flex-col items-center border-b pb-6 mb-6">
          <div className="relative">
            <img
              src="https://img.lovepik.com/png/20231125/man-avatar-image-for-profile-child-diverse-guy_693690_wh860.png"
              alt="Admin Avatar"
              className="w-24 h-24 rounded-full border-4 border-indigo-200 object-cover shadow-md"
            />
            <div className="absolute bottom-1 right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            {adminProfile.name || "Admin"}
          </h1>
          <p className="text-gray-500 text-sm">
            {adminProfile.role || "HR Manager"}
          </p>
        </div>

        {/* Profile Details */}
        {!editMode ? (
          <div className="flex flex-col gap-3 text-gray-700">
            <div>
              <p className="font-semibold text-gray-900">Email:</p>
              <p>{adminProfile.email || "admin@gmail.com"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Phone:</p>
              <p>{adminProfile.phone || "+91 123 4567 890"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Website:</p>
              <p>{adminProfile.website || "Pixelgenix.com"}</p>
            </div>

            <button
              onClick={() => setEditMode(true)}
              className="mt-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-700 transition-all duration-200"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-4 mt-2 text-gray-700"
          >
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

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition-all duration-200"
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
