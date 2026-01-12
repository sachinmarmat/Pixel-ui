import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";

const Application = () => {
  const [search, setsearch] = useState("");
  const [applicants, setApplicants] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const employerId = user?._id;
  const token = localStorage.getItem("accessToken");

  // ✅ Fetch employer jobs and their applicants
  const getApplicants = async () => {
    // console.log('hello')
    try {
      const res = await axios.get(
        `https://pixel-job-portal-backend.onrender.com/api/jobs/${employerId}/getEmployerJobsWithApplicants`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(res)

      // res.data should be an array of jobs, each containing applicants
      const allApplicants = res.data.flatMap((job) =>
        job.applicants.map((app) => ({
          jobTitle: job.title,
          applicantName: app.user?.name || "Unknown",
          applicantEmail: app.user?.email || "No email",
          status: app.status || "Pending",
          date: app.createdAt,
          id: app._id,
        }))
      );

      setApplicants(allApplicants);
    } catch (error) {
      console.log("Error fetching applicants:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getApplicants();
  }, [employerId]);

  // ✅ Optional search filter
  const filteredApplicants = applicants.filter(
    (a) =>
      a.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-blue-200 min-h-screen">
      <div className="flex justify-between text-3xl px-12 py-10 items-center">
        <h1 className="font-bold">PixelGenix</h1>
        <p>
          <BsFillBellFill className="text-gray-500 cursor-pointer hover:text-gray-600" />
        </p>
      </div>
      <div className="border-b-2 border-gray-400"></div>

      <div className="px-8 pt-15 pb-8">
        <h1 className="text-2xl text-orange-600 font-medium flex gap-2 items-center">
          <IoPeopleSharp className="bg-white text-3xl rounded-4xl p-0.5" />
          Applicants
        </h1>

        <div className="bg-white sm:min-h-120 p-4 mt-5 rounded-2xl">
          <div className="relative hidden md:block text-right mt-3">
            <input
              placeholder="Search applicant or job..."
              type="text"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              className="w-65 text-xm border outline-none border-gray-400 pl-4 pr-10 py-1.5 rounded-3xl bg-gray-200"
            />
            <BiSearch className="absolute top-4.5 right-1 -translate-y-1/2 text-3xl bg-blue-500 rounded-full p-1 text-white cursor-pointer hover:bg-blue-600" />
          </div> 

          <div className="mt-8 px-1">
            <div className="flex justify-between mt-5 bg-blue-300 p-4 px-5 rounded-t-2xl">
              <h1 className="text-xl font-medium">Applicant Name</h1>
              <h1 className="text-xl font-medium">Job Title</h1>
              <h1 className="text-xl font-medium">Date Applied</h1>
              <h1 className="text-xl font-medium">Status</h1>
            </div>

            <div className="mt-4">
              {filteredApplicants.length === 0 ? (
                <h1 className="text-3xl text-gray-400 text-center pt-15">
                  No Applicants Found
                </h1>
              ) : (
                filteredApplicants.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-4 flex justify-between items-center hover:bg-gray-200 rounded text-xm font-medium"
                  >
                    <div className="flex flex-col">
                      <h1>{item.applicantName}</h1>
                      <h1 className="text-gray-500 text-xs">{item.applicantEmail}</h1>
                    </div>
                    <h1>{item.jobTitle}</h1>
                    <h1>{new Date(item.date).toLocaleDateString()}</h1>
                    <h1 className="bg-green-400 px-2 rounded-2xl text-sm text-white">
                      {item.status}
                    </h1>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
