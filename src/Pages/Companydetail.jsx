import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBuilding, FaCalendarAlt, FaUsers, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { MdBusiness } from "react-icons/md";

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/admin/company/${id}`);
        setCompany(res.data.company);
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
        <div className="text-xl">Company not found</div>
      </div>
    );
  }

  return (  
    <div className="min-h-screen bg-gradient-to-br pt-30 from-blue-100 to-indigo-200 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft />
          Back to Companies
        </button>

        {/* Company Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-4">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <FaBuilding className="text-3xl text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{company.name}</h1>
              <p className="text-gray-600 mt-1">Company Profile</p>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <MdBusiness className="text-blue-600" />
              About Company
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {company.about || "No description available"}
            </p>
          </div>
        </div>

        {/* Company Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-600" />
                <span className="text-gray-700">{company.email}</span>
              </div>
              {company.phone && (
                <div className="flex items-center gap-3">
                  <FaPhone className="text-green-600" />
                  <span className="text-gray-700">{company.phone}</span>
                </div>
              )}
              {company.website && (
                <div className="flex items-center gap-3">
                  <FaGlobe className="text-purple-600" />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {company.website}
                  </a>
                </div>
              )}
              {company.address && (
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-red-600" />
                  <span className="text-gray-700">{company.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Company Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Details</h3>
            <div className="space-y-4">
              {company.founded && (
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-orange-600" />
                  <div>
                    <span className="text-sm text-gray-500 block">Founded</span>
                    <span className="text-gray-700">{company.founded}</span>
                  </div>
                </div>
              )}
              {company.companysize && (
                <div className="flex items-center gap-3">
                  <FaUsers className="text-cyan-600" />
                  <div>
                    <span className="text-sm text-gray-500 block">Company Size</span>
                    <span className="text-gray-700">{company.companysize} employees</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Services */}
        {company.service && company.service.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Services</h3>
            <div className="flex flex-wrap gap-2">
              {company.service.map((service, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Other Information */}
        {company.other && company.other.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h3>
            <div className="flex flex-wrap gap-2">
              {company.other.map((info, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {info}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;