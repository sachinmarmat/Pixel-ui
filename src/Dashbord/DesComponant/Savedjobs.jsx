import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Savedjobs = () => {
  const [alljobs, setAllJobs] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?._id;
  const token = localStorage.getItem("accessToken");

  //  Fetch Saved Jobs
  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(`https://pixel-job-portal-backend.onrender.com/api/jobs/${id}/getSaveJobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllJobs(res.data.jobs || []);
    } catch (error) {
      console.log("Error fetching saved jobs:", error.response?.data || error.message);
    }
  };

  // ✅ Remove Saved Job
  const removeSavedJob = async (jobId) => {
    try {
     const res= await axios.delete(`https://pixel-job-portal-backend.onrender.com/api/jobs/${jobId}/removesavejob`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res)
      // Update UI instantly
      setAllJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.log("Error removing job:", error.response?.data || error.message);
    }
  };

  const navigateToApplyPage = (job) => {
    navigate("/JobApplyForm", { state: { job } });
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);
  

  return (
    <div className="px-4 sm:px-10 py-6 flex flex-col items-center sm:items-start">
      {/* Header */}
      <div className="text-orange-600 font-bold flex items-center gap-3 mb-6">
        <span className="text-2xl sm:text-3xl">
          <FaBookmark />
        </span>
        <h1 className="text-2xl sm:text-3xl">Saved Jobs</h1>
      </div>

      {/* Jobs container */}
      <div className="bg-blue-200/40 rounded-2xl sm:px-11 p-5 sm:p-10 w-full min-w-[110vh] min-h-[70vh] flex flex-col gap-5">
        {alljobs.length > 0 ? (
          alljobs.map((job) => (
            <div
              key={job._id}
              className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-32 bg-white items-center shadow-2xl rounded-2xl p-4 sm:px-8"
            >
              {/* Job Info */}
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-semibold">{job.title}</h1>
                <div className="flex flex-col sm:flex-row sm:gap-6 gap-2 justify-center sm:justify-start">
                  <p className="flex gap-2 items-center font-medium text-gray-700 underline">
                    {job.company}
                  </p>
                  <p className="flex gap-1 items-center font-medium text-gray-700">
                    <FaLocationDot className="text-blue-500 hover:scale-110 cursor-pointer" />
                    {job.location}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  className="bg-blue-300 px-4 py-2 rounded-xl font-medium text-blue-700 cursor-pointer hover:bg-blue-500 hover:text-white"
                  onClick={() => navigateToApplyPage(job)}
                >
                  Apply
                </button>
                <button
                  className="border rounded-xl px-4 py-2 border-orange-500 text-orange-500 hover:text-blue-700 hover:bg-blue-300 hover:border-blue-300 cursor-pointer font-medium"
                  onClick={() => removeSavedJob(job._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <footer className="text-xl sm:text-2xl font-semibold text-center mt-20 text-gray-500">
            No Saved Job Yet!!
          </footer>
        )}
      </div>
    </div>
  );
};

export default Savedjobs;
