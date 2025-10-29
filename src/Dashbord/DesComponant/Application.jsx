import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { PiCirclesFour } from "react-icons/pi";

const Application = ({ setTotalApplications }) => { // ✅ clearer prop name

  const token = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;

  const [allapplication, setallapplication] = useState([]);

  const application = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/jobs/${id}/getapplyjobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setallapplication(res.data.job || []);
    } catch (error) {
      console.log("Error fetching application:", error.response?.data || error.msg);
    }
  };

  useEffect(() => {
    application();
  }, []);

  // ✅ Send total application count to parent every time data changes
  useEffect(() => {
    if (setTotalApplications) {
      setTotalApplications(allapplication.length);
    }
  }, [allapplication]);

  return (
    <div className="p-4 sm:p-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <PiCirclesFour className="text-3xl bg-orange-600 text-white rounded-full p-1" />
        <h1 className="text-2xl sm:text-3xl text-orange-600 font-bold">Application</h1>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow">
        <table className="table-auto w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="py-4 px-4 sm:px-10">Jobs</th>
              <th className="py-4 px-4 sm:px-10">Company</th>
              <th className="py-4 px-4 sm:px-10">Location</th>
              <th className="py-4 px-4 sm:px-10">Applied</th>
              <th className="py-4 px-4 sm:px-10">Status</th>
            </tr>
          </thead>
          <tbody>
            {allapplication.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100 font-medium">
                <td className="py-5 px-4 sm:px-10">{item.job?.title}</td>
                <td className="py-5 px-4 sm:px-10">{item.job?.company}</td>
                <td className="py-5 px-4 sm:px-10 hover:underline hover:text-orange-600 cursor-pointer">
                  {item.job?.location}
                </td>
                <td className="py-5 px-4 sm:px-10">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="py-5 px-4 sm:px-10">
                  <button className="bg-blue-500 text-white sm:px-5 px-3 py-2 rounded-xl hover:bg-orange-600 hover:text-black cursor-pointer">
                    {item.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {allapplication.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow p-4 border border-gray-200">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Job:</span>
              <span>{item.job?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Company:</span>
              <span>{item.job?.company}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Location:</span>
              <span className="hover:underline hover:text-orange-600 cursor-pointer">
                {item.job?.location}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Applied:</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Status:</span>
              <button className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-orange-600 hover:text-black cursor-pointer">
                {item.status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Application;
