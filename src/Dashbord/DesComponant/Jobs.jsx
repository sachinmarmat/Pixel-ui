import React, { useState } from 'react'
import { PiCirclesFour } from 'react-icons/pi'
import logo from '../../assets/logo.png'
import { IoLocationSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';

const Jobs = () => {
  // const Jobdata = [{
  //   title: "Senior UI Designer",
  //   company: "PixelGenix",
  //   salary: "₹200000-400000 LPA",
  //   location: "Shyam Nagar, Jodpur , Raj.",
  //   jobtype: "Full Time",
  //   experience: "Mid",
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   requirements: [
  //     "1–2 years experience in design",
  //     "Strong knowledge of Figma",
  //     "Good communication skills",
  //     "Ability to work in team",
  //   ],
  //   skills: ["UI", "UX", "Figma", "Adobe XD"],
  //   aboutcompany:
  //     "PixelGenix is a creative design and development company serving clients worldwide.",
  //   similarjobs: [
  //     { title: "Product Designer", company: "Apple" },
  //     { title: "UX Designer", company: "Microsoft" },
  //   ],
  // },
  // {
  //   title: "Web Developer",
  //   company: "PixelGenix",
  //   salary: "₹300000-500000 LPA",
  //   location: "Shyam Nagar, Jaipur, Raj.",
  //   jobtype: "Internship",
  //   experience: "Fresher",
  //   description: "We are looking for a React + Node.js Developer.",
  //   requirements: [
  //     "1–2 years experience in web development",
  //     "Good knowledge of React & Node.js",
  //     "Database experience with MongoDB",
  //   ],
  //   skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
  //   aboutcompany:
  //     "PixelGenix builds web apps and provides innovative tech solutions.",
  //   similarjobs: [
  //     { title: "Frontend Developer", company: "Google" },
  //     { title: "Backend Developer", company: "Amazon" },
  //   ],
  // },
  // {
  //   title: "Digital Marketing",
  //   company: "PixelGenix",
  //   salary: "₹300000-400000 LPA",
  //   location: "Shyam Nagar, Jaipur, Raj.",
  //   jobtype: "Full Time",
  //   experience: "Mid",
  //   description: "We are looking for a marketing + Seo Management Developer.",
  //   requirements: [
  //     "1–2 years experience in web development",
  //     "Good knowledge of maketing",
  //     "Database experience with MongoDB",
  //   ],
  //   skills: ["Marketing", "Seo", "Cruse"],
  //   aboutcompany:
  //     "PixelGenix builds web apps and provides innovative tech solutions.",
  //   similarjobs: [
  //     { title: "SEO Managment", company: "nvidia" },
  //     { title: "Communication", company: "Amazon" },
  //   ],
  // },
  // {
  //   title: "Digital Marketing",
  //   company: "PixelGenix",
  //   salary: "₹300000-400000 LPA",
  //   location: "Shyam Nagar, Jaipur, Raj.",
  //   jobtype: "Full Time",
  //   experience: "Mid",
  //   description: "We are looking for a marketing + Seo Management Developer.",
  //   requirements: [
  //     "1–2 years experience in web development",
  //     "Good knowledge of maketing",
  //     "Database experience with MongoDB",
  //   ],
  //   skills: ["Marketing", "Seo", "Cruse"],
  //   aboutcompany:
  //     "PixelGenix builds web apps and provides innovative tech solutions.",
  //   similarjobs: [
  //     { title: "SEO Managment", company: "nvidia" },
  //     { title: "Communication", company: "Amazon" },
  //   ],
  // },
  // ]; 
  const [alljobs, setalljobs] = useState([])
  const navigate = useNavigate()


  const token = localStorage.getItem('accessToken')
  const Jobdata = async () => {
    try {
      // console.log("Fetching jobs for id:", "token:", token);
      const res = await axios.get(`http://localhost:8080/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("Response:", res.data);
      setalljobs(res.data.jobs || []);

    }
    catch (error) {
      console.log("Error fetching jobs:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    Jobdata()
  }, [])

  // const filters = useSelector(state => state.job.appliedFilters || {});

  // helper: extract minimum salary number 

  const getMinSalary = (salaryStr) => {
    if (!salaryStr || typeof salaryStr !== "string") return 0; // ✅ prevent crash
    const match = salaryStr.match(/₹(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };


  const { applied } = useSelector(state => state.job);

  const filteredJobs = alljobs.filter(job => {
    return (
      (applied.title === "" || job.title.toLowerCase().includes(applied.title.toLowerCase())) &&
      (applied.location === "" || job.location.toLowerCase().includes(applied.location.toLowerCase())) &&
      // (applied.salary === 0 || getMinSalary(job.salary) >= applied.salary) &&
      (applied.jobtype.length === 0 || applied.jobtype.includes(job.jobtype)) &&
      (applied.experience === "" || job.experience === applied.experience)
    );
  });


  const jobsperpage = 3;
  const [currentpage, setcurrentpage] = useState(1);

  const totalpage = Math.ceil(filteredJobs.length / jobsperpage)
  const indexoflastjob = currentpage * jobsperpage
  const indexoffirstjob = indexoflastjob - jobsperpage
  const currentjobs = filteredJobs.slice(indexoffirstjob, indexoflastjob)


  const pagechange = (pagenumber) => {
    setcurrentpage(pagenumber)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  const handleapply = (item) => {
    navigate('/JobApplyForm', { state: { item } })
  }

  const [savedJobs, setSavedJobs] = useState([]); // store IDs of saved jobs

  const toggleBookmark = async (jobId) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/jobs/${jobId}/savejob`,
        {}, // no body needed
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // update local UI state after success
      setSavedJobs((prev) =>
        prev.includes(jobId)
          ? prev.filter((id) => id !== jobId)
          : [...prev, jobId]
      );

      console.log(res.data.msg);
    } catch (error) {
      console.error("Error bookmarking job:", error.response?.data || error);
    }
  };


  return (
    <div>
      <h1 className="text-orange-600 m-3 text-2xl font-medium flex flex-row gap-3 items-center">
        <PiCirclesFour className="text-3xl bg-orange-500 p-1 text-white rounded-4xl" /> Jobs
      </h1>
      <div className="flex flex-col gap-5 mt-8 ml-3 rounded-2xl">
        {currentjobs.length ? (
          currentjobs.map((item, index) => (
            <div key={index} className="bg-blue-100 grid mx-auto md:min-w-6xl max-w-6xl grid-cols-1 sm:grid-cols-3 p-5 rounded-2xl">
              <div className="md:col-span-2 space-y-6">
                {/* Job Header */}
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

                {/* Job Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
                  {/* <ul className="grid grid-cols-2 list-disc list-inside text-gray-600 gap-y-1">
                    {item.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul> */}
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
                  {/* <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, i) => (
                      <span key={i} className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div> */}
                </div>
                {/* <a href="/JobApplyForm" className=""> */}
                <button className="w-full mt-5 md:w-auto bg-blue-600/90 hover:bg-blue-700 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold transition"
                  onClick={() => handleapply(item)}>
                  Apply Now
                </button>
                {/* </a> */}
              </div>

              {/* About Company */}
              <div className="space-y-6 mt-5">
                <div className="flex justify-end">
                  <span
                    className="text-2xl text-blue-500 cursor-pointer sm:text-2xl"
                    onClick={() => toggleBookmark(item._id)}
                  >
                    {savedJobs.includes(item._id)
                      ? <FaBookmark className="text-blue-600" />
                      : <FaRegBookmark />}
                  </span>
                </div>


                <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Company</h3>
                  <p className="text-gray-600 mb-3">{item.aboutcompany}</p>
                  <a href="https://pixelgenixitsolution.com/" className="text-blue-600 underline text-sm">
                    www.pixelgenix.com
                  </a>
                </div>

                {/* Similar Jobs */}
                <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Similar Jobs</h3>
                  {/* {item.similarjobs.map((sj, i) => (
                    <div key={i} className="mb-3">
                      <p className="font-medium text-gray-800">{sj.title}</p>
                      <p className="text-gray-600 text-sm">{sj.company}</p>
                    </div>
                  ))} */}
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-4xl pl-45 sm:m-40 font-semibold ">No jobs found</p>
        )}
      </div>


      {totalpage > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10 mb-10">
          <button
            disabled={currentpage === 1}
            onClick={() => pagechange(currentpage - 1)}
            className={`px-4 py-2 rounded-lg font-semibold ${currentpage === 1 ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            Prev
          </button>

          {[...Array(totalpage)].map((_, index) => (
            <button
              key={index}
              onClick={() => pagechange(index + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${currentpage === index + 1 ? "bg-orange-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentpage === totalpage}
            onClick={() => pagechange(currentpage + 1)}
            className={`px-4 py-2 rounded-lg font-semibold ${currentpage === totalpage ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Jobs;
