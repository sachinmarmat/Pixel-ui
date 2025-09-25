import React from 'react'
import { PiCirclesFour } from "react-icons/pi";

const Applications = [
  { Jobs: "UI/UX", Company: "Pixel Genix", Location: "Shyam Nagar, Jaipur, Raj.", Applied: "22 Sep 2025", Status: "Applied" },
  { Jobs: "Full Stack", Company: "Genix", Location: "Dev Nagar", Applied: "2 Sep 2025", Status: "Hired" },
  { Jobs: "UI", Company: "Pixel", Location: "nagar jaipur", Applied: "11 Sep 2025", Status: "Rejected" },
  { Jobs: "Web Deginer", Company: "Pixel Genix", Location: "Shyam nagar", Applied: "06 march 2025", Status: "Rejected" },
  { Jobs: "Mern Stack", Company: "Pixel genix", Location: "Shyam Nagar", Applied: "02 jun 2025", Status: "Salected" },
];

const Application = () => {
  return (
    <div className="p-4 sm:p-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <PiCirclesFour className="text-3xl bg-orange-600 text-white rounded-full p-1" />
        <h1 className="text-2xl sm:text-3xl text-orange-600 font-bold">Application</h1>
      </div>

      {/* ✅ Desktop/Tablet Table */}
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
            {Applications.map((item, i) => (
              <tr key={i} className="hover:bg-gray-100 font-medium">
                <td className="py-5 px-4 sm:px-10">{item.Jobs}</td>
                <td className="py-5 px-4 sm:px-10">{item.Company}</td>
                <td className="py-5 px-4 sm:px-10 hover:underline sm:w-55  hover:text-orange-600 cursor-pointer">
                  {item.Location}
                </td>
                <td className="py-5 px-4 sm:px-10">{item.Applied}</td>
                <td className="py-5 px-4 sm:px-10">
                  <button className="bg-blue-500 text-white sm:px-5 px:3 py-2 rounded-xl hover:bg-orange-600 sm:w-30 hover:text-black cursor-pointer">
                    {item.Status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* ✅ Mobile Cards */}
      <div className="md:hidden space-y-4">
        {Applications.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 space-y-2 border border-gray-200">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Jobs:</span>
              <span>{item.Jobs}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Company:</span>
              <span>{item.Company}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Location:</span>
              <span className="hover:underline hover:text-orange-600 cursor-pointer">
                {item.Location}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Applied:</span>
              <span>{item.Applied}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Status:</span>
              <button className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-orange-600 hover:text-black cursor-pointer">
                {item.Status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Application;
