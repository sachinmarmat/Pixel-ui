import React from 'react'
import { FaBookmark } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Savedjobs = () => {
  const jobs = [
    "UI Designer",
    "Video Editing",
    "Web Designer",
    "Marketing Management Designer"
  ];

  return (
    <div className="px-4 sm:px-10 py-6 flex flex-col items-center sm:items-start">
      {/* Header */}
      <div className="text-orange-600 font-bold flex items-center gap-3 mb-6">
        <span className="text-2xl sm:text-3xl"><FaBookmark /></span>
        <h1 className="text-2xl sm:text-3xl">Saved Jobs</h1>
      </div>

      {/* Jobs container */}
      <div className="bg-blue-200/40 rounded-2xl sm:px-11 p-5 sm:p-10 w-full max-w-[230] min-h-[99vh] flex flex-col gap-5">
        {jobs.map((title, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-32 bg-white items-center shadow-2xl rounded-2xl p-4 sm:px-10">
            {/* Job Info */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
              <div className="flex flex-col sm:flex-row sm:gap-5 gap-2 justify-center sm:justify-start">
                <p className="flex gap-2 items-center font-medium text-gray-700">
                  <FaLocationDot className="text-blue-500 hover:scale-110 cursor-pointer" />
                  Shyam Nagar
                </p>
                <p className="flex gap-2 items-center font-medium text-gray-700">
                  <FaLocationDot className="text-blue-500 hover:scale-110 cursor-pointer" />
                  Jaipur, Raj.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="bg-blue-300 px-4 py-2 rounded-xl font-medium text-blue-700 cursor-pointer hover:bg-blue-500 hover:text-white">
                Apply
              </button>
              <button className="border rounded-xl px-4 py-2 border-orange-500 text-orange-500 hover:text-blue-700 hover:bg-blue-300 hover:border-blue-300 cursor-pointer font-medium">
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Footer */}
        <footer className="text-xl sm:text-2xl font-semibold text-center mt-53">
          No Saved Job Yet!!
        </footer>
      </div>
    </div>
  );
};

export default Savedjobs;
