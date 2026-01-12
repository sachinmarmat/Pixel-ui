import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillBellFill, BsBuildingFillAdd } from "react-icons/bs";
import { IoPeopleSharp, IoEarthOutline, IoMail } from "react-icons/io5";
import { FaPhone, FaBuilding, FaCalendarAlt, FaUsers, FaCog } from "react-icons/fa";
import { FiStar, FiEdit3, FiSave } from "react-icons/fi";
import { MdBusiness } from "react-icons/md";
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
    address: "",
    about: "",
    founded: "",
    companysize: "",
    service: "",
    other: "",
  });

  const token = localStorage.getItem("accessToken");


  // Fetch User Profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("https://pixel-job-portal-backend.onrender.com/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = res.data.user || {};
      setProfile(user);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        website: user.website || "",
        address: user.address || "",
        about: user.about || "",
        founded: user.founded || "",
        companysize: user.companysize || "",
        service: Array.isArray(user.service) ? user.service.join(", ") : user.service || "",
        other: Array.isArray(user.other) ? user.other.join(", ") : user.other || "",
      });
    } catch (error) {
      console.log("Error fetching profile:", error.response?.data || error.message);
      toast.error("Failed to fetch profile!", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  //  Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //  Update Profile API
  const handleUpdate = async () => {

    try {
      const payload = {
        ...formData,
        service: formData.service
          ? formData.service.split(",").map((s) => s.trim())
          : [],
        other: formData.other
          ? formData.other.split(",").map((s) => s.trim())
          : [],
      };   

      const res = await axios.put("https://pixel-job-portal-backend.onrender.com/api/user/profile", payload, {
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
    <div className="bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen">
      <ToastContainer hideProgressBar />
      {/* Navbar */}
      <div className="flex justify-between text-3xl px-12 py-10 items-center">
        <h1 className="font-bold text-gray-800">PixelGenix</h1>
        <BsFillBellFill className="text-gray-500 cursor-pointer hover:text-gray-600 transition-colors" />
      </div>
      <div className="border-b-2 border-gray-300"></div>

      {/* Header */}
      <div className="px-8 pt-10 pb-8">
        <div className="justify-between flex items-center mb-6">
          <h1 className="text-3xl text-orange-600 font-bold flex gap-3 items-center">
            <IoPeopleSharp className="bg-white text-4xl rounded-full p-2 shadow-lg" />
            Company Profile
          </h1>
          <div
            className={`px-4 py-2 rounded-full cursor-pointer shadow-lg border transition-all hover:scale-105 ${profile?.isPremium
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-300"
              : "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-700 border-gray-300"
              }`}
          >
            {profile?.isPremium ? (
              <div className="flex gap-2 font-semibold">
                <span>Premium Active</span>
                <span className="text-sm font-normal opacity-90">
                  ({profile.premiumPlan})
                </span>
              </div>
            ) : (
              <a href="/PremiumPlans">
                <div className="flex items-center gap-2 text-white px-3 py-1 cursor-pointer hover:scale-105 transition">
                  <FiStar size={18} />
                  <span>Get Premium</span>
                </div>
              </a>
            )}
          </div>
        </div>

        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `url(${profilebg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="bg-gray-900/80 backdrop-blur-md">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-8 py-6">
              <div className="flex items-center gap-4">
                <img src={logo} alt="logo-img" className="w-14 h-14 rounded-full border-2 border-white/30" />
                <div>
                  <h1 className="text-3xl text-white font-bold">{formData.name || "Your Company Name"}</h1>
                  <p className="text-gray-300 text-sm">{formData.service || "Your Services"}</p>
                </div>
              </div>

              <button
                onClick={() => (editMode ? handleUpdate() : setEditMode(true))}
                className={`px-3 py-2 rounded-xl text-white font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${editMode
                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  }`}
              >
                {editMode ? (
                  <>
                    <FiSave className="text-lg" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <FiEdit3 className="text-lg" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* About Section */}
            <div className="px-8 py-6">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl text-white border border-white/10">
                <h2 className="text-2xl font-bold pb-4 flex items-center gap-3">
                  <MdBusiness className="text-blue-300" />
                  About Company
                </h2>
                {editMode ? (
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-gray-300 outline-none focus:border-blue-400 transition-colors resize-none"
                    placeholder="Tell us about your company..."
                    rows="4"
                  />
                ) : (
                  <p className="text-gray-200 leading-relaxed">
                    {formData.about ||
                      "Welcome to your profile! You can edit your details and keep your contact information up to date."}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="px-8 pb-6">
              <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl text-white border border-white/10">
                <h2 className="text-2xl font-bold pb-5 flex items-center gap-3">
                  <IoMail className="text-blue-300" />
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Website */}
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-colors">
                    <IoEarthOutline className="text-blue-400 text-2xl flex-shrink-0" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-300 block mb-2 font-medium">Website</label>
                      {editMode ? (
                        <input
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="bg-transparent border-b border-gray-400 w-full outline-none text-sm focus:border-blue-400 transition-colors pb-1"
                          placeholder="https://company.com"
                        />
                      ) : (
                        <p className="text-sm">{formData.website || "No website added"}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-colors">
                    <IoMail className="text-yellow-300 text-2xl flex-shrink-0" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-300 block mb-2 font-medium">Email</label>
                      {editMode ? (
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-transparent border-b border-gray-400 w-full outline-none text-sm focus:border-blue-400 transition-colors pb-1"
                          placeholder="company@email.com"
                        />
                      ) : (
                        <p className="text-sm">{formData.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-colors">
                    <FaPhone className="text-green-400 text-2xl flex-shrink-0" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-300 block mb-2 font-medium">Phone</label>
                      {editMode ? (
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-transparent border-b border-gray-400 w-full outline-none text-sm focus:border-blue-400 transition-colors pb-1"
                          placeholder="+1 (555) 123-4567"
                        />
                      ) : (
                        <p className="text-sm">{formData.phone || "No phone number"}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-colors">
                    <BsBuildingFillAdd className="text-purple-400 text-2xl flex-shrink-0" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-300 block mb-2 font-medium">Address</label>
                      {editMode ? (
                        <input
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="bg-transparent border-b border-gray-400 w-full outline-none text-sm focus:border-blue-400 transition-colors pb-1"
                          placeholder="Company address"
                        />
                      ) : (
                        <p className="text-sm">{formData.address || "No address added"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Details Section */}
            <div className="px-8 pb-6">
              <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl text-white border border-white/10">
                <h2 className="text-2xl font-bold pb-5 flex items-center gap-3">
                  <FaBuilding className="text-orange-300" />
                  Company Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Founded */}
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-colors">
                    <FaCalendarAlt className="text-pink-400 text-2xl flex-shrink-0" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-300 block mb-2 font-medium">Founded</label>
                      {editMode ? (
                        <input
                          name="founded"
                          value={formData.founded}
                          onChange={handleChange}
                          className="bg-transparent border-b border-gray-400 w-full outline-none text-sm focus:border-blue-400 transition-colors pb-1"
                          placeholder="2020"
                        />
                      ) : (
                        <p className="text-sm">{formData.founded || "Not specified"}</p>
                      )}
                    </div>
                  </div>

                  {/* Company Size */}
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-colors">
                    <FaUsers className="text-cyan-400 text-2xl flex-shrink-0" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-300 block mb-2 font-medium">Company Size</label>
                      {editMode ? (
                        <select
                          name="companysize"
                          value={formData.companysize}
                          onChange={handleChange}
                          className="bg-white/10 border border-gray-400 rounded w-full outline-none text-sm focus:border-blue-400 transition-colors p-2"
                        >
                          <option value="" className="bg-gray-800">Select size</option>
                          <option value="1-10" className="bg-gray-800">1-10 employees</option>
                          <option value="11-50" className="bg-gray-800">11-50 employees</option>
                          <option value="51-200" className="bg-gray-800">51-200 employees</option>
                          <option value="201-500" className="bg-gray-800">201-500 employees</option>
                          <option value="500+" className="bg-gray-800">500+ employees</option>
                        </select>
                      ) : (
                        <p className="text-sm">{formData.companysize || "Not specified"}</p>
                      )}
                    </div>
                  </div>

                  {/* Service */}
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-colors">
                    <FaCog className="text-indigo-400 text-2xl flex-shrink-0" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-300 block mb-2 font-medium">Services</label>
                      {editMode ? (
                        <input
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="bg-transparent border-b border-gray-400 w-full outline-none text-sm focus:border-blue-400 transition-colors pb-1"
                          placeholder="Software Development, Consulting"
                        />
                      ) : (
                        <p className="text-sm">{formData.service || "Not specified"}</p>
                      )}
                    </div>
                  </div>

                  {/* Other */}
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-colors">
                    <MdBusiness className="text-teal-400 text-2xl flex-shrink-0" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-300 block mb-2 font-medium">Other Info</label>
                      {editMode ? (
                        <input
                          name="other"
                          value={formData.other}
                          onChange={handleChange}
                          className="bg-transparent border-b border-gray-400 w-full outline-none text-sm focus:border-blue-400 transition-colors pb-1"
                          placeholder="Additional information"
                        />
                      ) : (
                        <p className="text-sm">{formData.other || "Not specified"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Plan Info */}
            <div className="px-8 pb-8">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md p-6 rounded-2xl text-white border border-purple-300/20">
                <h2 className="text-2xl font-bold pb-4 flex items-center gap-3">
                  <FiStar className="text-yellow-400" />
                  Premium Plan Status
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                    <div>
                      <p className="text-xs text-gray-300 mb-1">Current Plan</p>
                      <p className="font-bold text-lg">{profile.premiumPlan || "Free Plan"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                    <div>
                      <p className="text-xs text-gray-300 mb-1">Expires On</p>
                      <p className="font-bold text-lg">
                        {profile.premiumExpiry
                          ? new Date(profile.premiumExpiry).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
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