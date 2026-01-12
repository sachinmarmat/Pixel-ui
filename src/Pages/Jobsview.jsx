import React, { useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5';
import logo from '../assets/logo.png'
import { Briefcase, IndianRupee, MapPin } from 'lucide-react';
import Defaultnav from '../Componants/Defaultnav';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const Jobsview = () => {
  const navigate = useNavigate()
  const [alljobs, setalljobs] = useState([])
  const [view, setview] = useState([]);


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

  const jobdetail = (job) => {
    setview([job])
  }

  const { applied } = useSelector(state => state.job);

  const filteredJobs = alljobs.filter(job => {
    return (
      (applied.title === "" || job.title.toLowerCase().includes(applied.title.toLowerCase())) &&
      (applied.location === "" || job.location.toLowerCase().includes(applied.location.toLowerCase()))
    );
} );


  useEffect(() => {
    if (filteredJobs.length > 0 && view.length === 0) {
      setview([filteredJobs[0]]);
    }
  }, [filteredJobs]);


  const handleapply = (item) => {

    const role = localStorage.getItem("role");

    if (!role) {
      // No role = not logged in
      navigate("/Login");
    } else if (role === "jobseeker") {
      // Only jobseeker can apply
      navigate("/JobApplyForm", { state: { item } });
    } else {
      // Other roles (admin/employ) not allowed
      alert("Only job seekers can apply for jobs.");
    }
  };

  return (
    <>
      <Defaultnav />
      <div className="flex flex-row gap-5 ">
        <div className=" bg-sky-200/20 mt-25 px-5 shadow-2xl p-3 ">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((data) => (
              <div className="w-full min-w-[55vh] bg-blue-200 rounded-xl shadow-md p-4 pl-6 mb-6  hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {data.title}
                  </h2>
                  <span className=" text-gray-600 hover:underline">{data.company}</span>
                </div>

                {/* Footer info */}
                <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {data.location}
                  </span>
                  <span className="flex items-center gap-1">
                    {/* <Briefcase size={16} /> {data.experience} */}
                  </span>
                  <span className="flex items-center gap-1">
                    <IndianRupee size={16} /> {data.salary}
                  </span>
                </div>

                {/* View Details Button */}
                <div className="mt-6">
                  <button className="border border-red-400 text-red-500 px-4 py-2 rounded-full hover:bg-red-50 cursor-pointer transition"
                    onClick={() => jobdetail(data)}>
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full justify-center items-center flex min-w-[65vh] min-h-[59vh] text-4xl font-semibold text-gray-600 ">
              Job Not Found</div>
          )}
        </div>


        <div className='gap-5 flex flex-col mt-35 px-5 mb-5'>
          {
            view.map((item, index) => (
              <div key={index} className="bg-blue-100 grid  lg:w-4xl grid-cols-1 sm:grid-cols-3 p-5 rounded-2xl">
                <div className="md:col-span-2 space-y-6">

                  <div className="flex items-start gap-4">
                    <img src={logo} alt="company logo" className="w-16 h-16 rounded-xl" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
                      <div className="flex justify-between gap-30 mt-2">
                        <div>
                          <p className="text-gray-600">{item.company}</p>
                          <p className="text-blue-600 font-semibold flex flex-row items-center "><IndianRupee size={15}/>{item.salary}/year</p>
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

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
                    {/* <ul className="grid grid-cols-2 list-disc list-inside text-gray-600 gap-y-1">
                      {item.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul> */}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
                    {/* <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span  className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div> */}
                  </div>
                  <button className="w-full mt-5 md:w-auto bg-blue-600/90 hover:bg-blue-700 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold transition"
                    onClick={() => handleapply(item)}>
                    Apply Now
                  </button>
                </div>

                <div className="space-y-6 mt-5">
                  <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Company</h3>
                    <p className="text-gray-600 mb-3">{item.aboutcompany}</p>
                    <a href="https://pixelgenixitsolution.com/" className="text-blue-600 underline text-sm">
                      www.pixelgenix.com
                    </a>
                  </div>

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

          }
        </div>
      </div>
    </>

  )
}

export default Jobsview
