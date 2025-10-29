import { useEffect, useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Postjobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editJob = location.state?.job || null; // job passed from ManageJobs

  const initialJobState = {
    title: "",
    description: "",
    salary: "",
    location: "",
    company: "",
    date: "",
    required: ""
  };


  const [addjob, setaddjob] = useState(initialJobState);
  const [isEdit, setIsEdit] = useState(false);

  // If job data exists, pre-fill form and switch to edit mode
  useEffect(() => {
    if (editJob) {
      setaddjob({
        title: editJob.title || "",
        description: editJob.description || "",
        salary: editJob.salary || "",
        location: editJob.location || "",
        company: editJob.company || "",
        date: editJob.date?.split("T")[0] || "",
        required: editJob.required || ""
      });
      setIsEdit(true);
    }
  }, [editJob]);

  const handleform = (e) => {
    setaddjob((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //  Handle submit for both create and edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    try {
      let res;
      if (isEdit) {
        // Update existing job
        res = await axios.put(
          `http://localhost:8080/api/jobs/${editJob._id}`,
          addjob,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create new job
        res = await axios.post("http://localhost:8080/api/jobs/create", addjob, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      toast.success(res.data.msg || (isEdit ? "Job updated!" : "Job posted!"), {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      // Clear form
      setaddjob(initialJobState);

      // Redirect back after success
      setTimeout(() => navigate("/Employedashboard"), 1500);
    } catch (error) {
      console.error("Job submit error:", error.response?.data || error.message);
      toast.error("Please fill all details correctly!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div className="bg-blue-200 min-h-screen">
        <div className="flex justify-between text-3xl px-12 py-10 items-center">
          <h1 className="font-bold">PixelGenix</h1>
          <p className="sm:pr-5">
            <BsFillBellFill className="text-gray-500" />
          </p>
        </div>
        <div className="border-b-2 border-gray-400"></div>

        <div className="px-8 pt-10 pb-8 sm:pr-15">
          <h1 className="text-2xl text-orange-600 font-medium flex gap-2 items-center">
            <FaCirclePlus className="text-3xl p-0.5" />
            {isEdit ? "Edit Job" : "Post Job"}
          </h1>

          <div className="bg-white p-4 mt-5 rounded-2xl">
            <form className="flex flex-col gap-8 p-4 py-5" onSubmit={handleSubmit}>
              {/* Job Title */}
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Job Title</h1>
                <input
                  className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                  placeholder="e.g. Senior UI/UX Designer"
                  name="title"
                  value={addjob.title}
                  onChange={handleform}
                  required
                />
              </div>

              {/* Job Description */}
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Job Description</h1>
                <textarea
                  className="border rounded-xl font-normal border-gray-400 p-3 w-full h-40"
                  placeholder="Describe the role"
                  name="description"
                  value={addjob.description}
                  onChange={handleform}
                  required
                />
              </div>

              {/* Salary & Location */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-2 sm:w-1/2">
                  <h1 className="text-2xl font-semibold">Salary Range</h1>
                  <input
                    className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                    placeholder="e.g. ₹30,000 - ₹60,000"
                    name="salary"
                    value={addjob.salary}
                    onChange={handleform}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 sm:w-1/2">
                  <h1 className="text-2xl font-semibold">Location</h1>
                  <input
                    className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                    placeholder="Location"
                    name="location"
                    value={addjob.location}
                    onChange={handleform}
                    required
                  />
                </div>
              </div>

              {/* Company & Deadline */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-2 sm:w-1/2">
                  <h1 className="text-2xl font-semibold">Company</h1>
                  <input
                    className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                    placeholder="e.g. PixelGenix Pvt Ltd"
                    name="company"
                    value={addjob.company}
                    onChange={handleform}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 sm:w-1/2">
                  <h1 className="text-2xl font-semibold">Application Deadline</h1>
                  <input
                    className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                    type="date"
                    name="date"
                    value={addjob.date}
                    onChange={handleform}
                    required
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Skills Required</h1>
                <input
                  className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                  placeholder="e.g. React, Node.js, MongoDB"
                  name="required"
                  value={addjob.required}
                  onChange={handleform}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="border bg-gray-200 p-1 sm:p-2 hover:bg-blue-500 font-medium hover:text-white rounded cursor-pointer px-4"
                  onClick={() => {
                    setaddjob(initialJobState);
                    navigate("/Employedashboard");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border p-1 sm:p-2 bg-blue-500 hover:bg-blue-600 font-medium text-white rounded cursor-pointer px-4"
                >
                  {isEdit ? "Update Job" : "Post Job"}
                </button>
              </div>
            </form>
          </div>
        </div >
      </div >
      <ToastContainer />
    </>
  );
};

export default Postjobs;
