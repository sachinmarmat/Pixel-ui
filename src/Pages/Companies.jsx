import React, { useEffect, useState } from "react";
import { Star } from "lucide-react"; // Retained for the star icon
import { FaBuilding, FaCalendarAlt, FaUsers, FaEye, FaHandshake } from "react-icons/fa"; // Added FaHandshake for service section
import { useNavigate } from "react-router-dom";
import axios from "axios";

// --- Custom Colors for Attractive UI ---
// Primary: Deep Blue (for buttons, accents)
// Secondary: Vibrant Orange (for key info, highlights)
// Background: Light Grays/Blues (for comfort)
const UI_COLORS = {
  primary: "bg-blue-700 hover:bg-blue-800 text-white", // Deep Blue button
  secondaryText: "text-orange-600", // Vibrant Orange text
  iconPrimary: "text-blue-500", // Blue icon
  iconSecondary: "text-orange-500", // Orange icon
  tagBg: "bg-blue-50 text-blue-700", // Light Blue tag
  cardBorder: "border-blue-200", // Soft border
  cardBg: "bg-white",
};

const Companies = () => {
  const [allemployers, setallemployers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const employedata = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:8080/api/admin/getemploye`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Ensure the data structure is handled safely
      setallemployers(res.data.employe || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employers:", error.response?.data || error.message);
      setError("Failed to load companies. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    employedata();
  }, []);

  // --- UI Components and Structure ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="ml-4 text-blue-600 font-medium">Loading companies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-red-50">
        <p className="text-xl text-red-700 font-semibold">{error}</p>
        <button
          onClick={employedata}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (allemployers.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-blue-50">
        <h2 className="text-2xl font-bold text-gray-700">No Companies Found 🧐</h2>
        <p className="text-gray-500 mt-2">Check back later for new opportunities!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-r from-blue-100 to-blue-300  py-12 px-6">
      {/* Header with improved styling */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          <span className={UI_COLORS.secondaryText}>Top </span>Companies Hiring Now 
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Explore **verified employers** and their exciting, latest job openings.
        </p>
      </div>

      {/* Company List Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allemployers.map((company) => (
          <div
            key={company._id}
            className={`${UI_COLORS.cardBg} rounded-xl ${UI_COLORS.cardBorder} border-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-8 flex flex-col`}
          >
            {/* Company Header/Logo Section */}
            <div className="flex items-start gap-4 mb-4">
              {/* Unique Logo Placeholder */}
              <div className={`w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 shadow-md`}>
                <FaBuilding className={`${UI_COLORS.iconPrimary} text-2xl`} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-extrabold text-gray-900 truncate" title={company.name}>
                  {company.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="text-yellow-400 w-5 h-5 fill-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">Verified Partner</span>
                </div>
              </div>
            </div>

            {/* Company Info - Enhanced Styling */}
            <div className="space-y-3 mb-5 border-t border-b border-gray-100 py-3">
              {company.founded && (
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <FaCalendarAlt className={`${UI_COLORS.iconSecondary} w-5 h-5 shrink-0`} />
                  <span>Founded: <strong className={UI_COLORS.secondaryText}>{company.founded}</strong></span>
                </div>
              )}
              {company.companysize && (
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <FaUsers className={`${UI_COLORS.iconPrimary} w-5 h-5 shrink-0`} />
                  <span>Employees: <strong className="text-green-600">{company.companysize}</strong></span>
                </div>
              )}
            </div>

            {/* About - Cleaned up and stylish */}
            {company.about && (
              <div className="mb-5">
                <p className="text-gray-600 text-sm line-clamp-3">
                  {company.about.length > 120 ? `${company.about.substring(0, 120)}...` : company.about}
                </p>
              </div>
            )}

            {/* Services - Modern Pill/Tag Design */}
            {company.service && company.service.length > 0 && (
              <div className="mt-auto"> {/* Pushes services and button to the bottom */}
                <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-700">
                  <FaHandshake className={`${UI_COLORS.iconSecondary} w-4 h-4`} />
                  <span>Key Services:</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {company.service.slice(0, 3).map((service, index) => (
                    <span
                      key={index}
                      className={`${UI_COLORS.tagBg} text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200`}
                    >
                      {service}
                    </span>
                  ))}
                  {company.service.length > 3 && (
                    <span className="text-xs font-medium text-gray-500 self-center">
                      +{company.service.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}


            {/* View Details Button - Prominent and Deep Blue */}
            <button
              onClick={() => navigate(`/company/${company._id}`)}
              className={`w-full ${UI_COLORS.primary} py-3 rounded-lg text-base font-semibold flex items-center justify-center gap-2 transition-transform duration-200 transform hover:scale-[1.01] shadow-lg `}
            >
              <FaEye className="w-5 h-5" />
              View Company Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;