import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import { IoPeopleSharp, IoEarthOutline, IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { BsBuildingFillAdd } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profilebg from "../../assets/profilebg.jpg";
import logo from "../../assets/logo.png";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const token = localStorage.getItem("accessToken");

  // Fetch User Profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = res.data.user || {};
      setProfile(user);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        website: user.website || "",
      });
    } catch (error) {
      console.log("Error fetching profile:", error.response?.data || error.message);
      toast.error("Failed to fetch profile!", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchProfile();
    // handleUpdate()
  }, []);

  //  Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Update Profile API
  const handleUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:8080/api/user/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res)
      toast.success("Profile updated successfully!", { position: "top-right" });
      setProfile(res.data.user);
      setEditMode(false);
    } catch (error) {
      console.log("Error updating profile:", error.response?.data || error.message);
      toast.error("Failed to update profile!", { position: "top-right" });
    }
  };
  

  return (
    <div className="bg-blue-200 min-h-screen">
      <ToastContainer hideProgressBar />
      {/* Navbar */}
      <div className="flex justify-between text-3xl px-12 py-10 items-center">
        <h1 className="font-bold text-gray-800">PixelGenix</h1>
        <BsFillBellFill className="text-gray-500 cursor-pointer hover:text-gray-600" />
      </div>
      <div className="border-b-2 border-gray-400"></div>

      {/* Header */}
      <div className="px-8 pt-10 pb-8">
        <h1 className="text-2xl text-orange-600 font-medium flex gap-2 items-center">
          <IoPeopleSharp className="bg-white text-3xl rounded-4xl p-0.5 " />
          Profile
        </h1>

        {/* Profile Section */}
        <div
          className="rounded-2xl mt-5 overflow-hidden shadow-lg"
          style={{
            backgroundImage: `url(${profilebg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="bg-gray-900/70 backdrop-blur-md">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <img src={logo} alt="logo-img" className="w-10 sm:w-12 rounded-full" />
                <h1 className="text-2xl text-white font-semibold">{formData.name || "Your Name"}</h1>
              </div>

              <button
                onClick={() => (editMode ? handleUpdate() : setEditMode(true))}
                className={`px-4 py-2 rounded-xl text-white font-medium transition ${
                  editMode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {editMode ? "Save" : "Edit"}
              </button>
            </div>

            {/* About Section */}
            <div className="px-6 py-4">
              <div className="bg-white/20 p-4 rounded-xl text-white">
                <h2 className="text-xl font-semibold pb-2">About</h2>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {profile.about ||
                    "Welcome to your profile! You can edit your details and keep your contact information up to date."}
                </p>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="px-6 pb-10">
              <div className="bg-white/30 backdrop-blur-md p-4 rounded-xl text-white">
                <h2 className="text-xl font-bold pb-3">Contact Information</h2>

                <div className="flex flex-col gap-3">
                  {/* Website */}
                  <div className="flex items-center gap-2">
                    <IoEarthOutline className="text-blue-400 text-2xl" />
                    {editMode ? (
                      <input
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="bg-transparent border-b border-gray-300 w-full outline-none"
                        placeholder="Enter website"
                      />
                    ) : (
                      <p>{formData.website || "No website added"}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-2">
                    <IoMail className="text-yellow-300 text-2xl" />
                    {editMode ? (
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-transparent border-b border-gray-300 w-full outline-none"
                        placeholder="Enter email"
                      />
                    ) : (
                      <p>{formData.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-green-400 text-2xl" />
                    {editMode ? (
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-transparent border-b border-gray-300 w-full outline-none"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <p>{formData.phone}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-2">
                    <BsBuildingFillAdd className="text-gray-300 text-2xl" />
                    <p>{profile.address || "New Sanganer, Jaipur, Raj. (302019)"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Profile;
