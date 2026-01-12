import React, { useEffect, useState } from "react";
import { PiCirclesFour } from "react-icons/pi";
import logo from "../../assets/logo.png";
import { IoLocationSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const Jobs = () => {
  const [alljobs, setAllJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]); // store saved job IDs

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?._id;

  // ✅ Fetch all jobs
  const fetchAllJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllJobs(res.data.jobs || []);
    } catch (error) {
      console.log("Error fetching jobs:", error.response?.data || error.message);
    }
  };

  // ✅ Fetch saved jobs (for bookmark persistence)
  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/jobs/${id}/getSaveJobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // extract job IDs from response and store them
      const savedJobIds = res.data.jobs?.map((job) => job._id) || [];
      setSavedJobs(savedJobIds);
    } catch (error) {
      console.log("Error fetching saved jobs:", error.response?.data || error.message);
    }
  };

  // ✅ Toggle Save/Unsave job
  const toggleBookmark = async (jobId) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/jobs/${jobId}/savejob`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local UI state immediately
      setSavedJobs((prev) =>
        prev.includes(jobId)
          ? prev.filter((id) => id !== jobId) // remove if already saved
          : [...prev, jobId] // add if new
      );

      console.log(res.data.msg);
    } catch (error) {
      console.error("Error bookmarking job:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchAllJobs();
    fetchSavedJobs(); // ✅ check saved jobs on load
  }, []);

  // Redux filters
  const { applied } = useSelector((state) => state.job);
  const getMinSalary = (salaryStr) => {
    if (!salaryStr || typeof salaryStr !== "string") return 0;
    const match = salaryStr.match(/₹(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const filteredJobs = alljobs.filter((job) => {
    return (
      (applied.title === "" ||
        job.title.toLowerCase().includes(applied.title.toLowerCase())) &&
      (applied.location === "" ||
        job.location.toLowerCase().includes(applied.location.toLowerCase())) &&
      (applied.jobtype.length === 0 || applied.jobtype.includes(job.jobtype)) &&
      (applied.experience === "" || job.experience === applied.experience)
    );
  });

  const jobsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const pageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApply = (item) => {
    navigate("/JobApplyForm", { state: { item } });
  };
                                          
  return (
    <div>
      <h1 className="text-orange-600 m-3 text-2xl font-medium flex flex-row gap-3 items-center">
        <PiCirclesFour className="text-3xl bg-orange-500 p-1 text-white rounded-4xl" /> Jobs
      </h1>
      <div className="flex flex-col gap-5 mt-8 ml-3 rounded-2xl">
        {currentJobs.length ? (
          currentJobs.map((item, index) => (
            <div
              key={index}
              className="bg-blue-100 grid mx-auto md:min-w-5xl max-w-6xl grid-cols-1 sm:grid-cols-3 p-5 rounded-2xl"
            >
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-start gap-4">
                  <img src={logo} alt="company logo" className="w-16 h-16 rounded-xl" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
                    <div className="flex justify-between gap-30 mt-2">
                      <div>
                        <p className="text-gray-600">{item.company}</p>
                        <p className="text-blue-600 font-semibold">{item.salary}/year</p>
                        <p className="flex flex-row items-center gap-2 text-gray-600 mt-1">
                          <IoLocationSharp /> {item.location}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 mt-4">
                        <p className="text-gray-700">JobType - {item.jobtype}</p>
                        <p className="text-gray-700">Experience - {item.experience}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                <button
                  className="w-full mt-5 md:w-auto bg-blue-600/90 hover:bg-blue-700 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold transition"
                  onClick={() => handleApply(item)}
                >
                  Apply Now
                </button>
              </div>

              {/* Bookmark + Company Section */}
              <div className="space-y-6 mt-5">
                <div className="flex justify-end">
                  <span
                    className="text-2xl text-blue-500 cursor-pointer sm:text-2xl"
                    onClick={() => toggleBookmark(item._id)}
                  >
                    {savedJobs.includes(item._id) ? (
                      <FaBookmark className="text-blue-600" />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </span>
                </div>

                <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Company</h3>
                  <p className="text-gray-600 mb-3">{item.aboutcompany}</p>
                  <a
                    href="https://pixelgenixitsolution.com/"
                    className="text-blue-600 underline text-sm"
                  >
                    www.pixelgenix.com
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-4xl pl-45 sm:m-40 font-semibold ">
            No jobs found
          </p>
        )}
      </div>

      {totalPage > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10 mb-10">
          <button
            disabled={currentPage === 1}
            onClick={() => pageChange(currentPage - 1)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPage)].map((_, index) => (
            <button
              key={index}
              onClick={() => pageChange(index + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPage}
            onClick={() => pageChange(currentPage + 1)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === totalPage
                ? "bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Jobs;
