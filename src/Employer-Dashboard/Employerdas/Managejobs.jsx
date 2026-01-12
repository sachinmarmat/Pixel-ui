import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsFillBellFill } from 'react-icons/bs'
import { IoPeopleSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Managejobs = () => {
  const navigate = useNavigate()
  
  
  const [search, setsearch] = useState("");
  const [jobs, setjobs] = useState([])
  
  const [allapplication, setallapplication] = useState([]);

  // user.(localStorage.getjobs(""))

  const user = JSON.parse(localStorage.getItem('user'))
  const id = user?.id

  // const jobId=

  const token = localStorage.getItem('accessToken')
  
  const fatchjobs = async () => {
    try {
      const getjobs = await axios.get(`https://pixel-job-portal-backend.onrender.com/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });  
      // const jobId = req.params.id;


      // console.log('Jobs fetched:', getjobs.data);
      setjobs(getjobs.data.job || []); // THIS LINE FIXED
      
      // const jobId = getjobs.data.job?._id;
    } 
    catch (error) {
      console.log('error fetching job', error)
    }
  }



  // const fetchapplinu=async()=>{
  //   cont res=await axios.get()
  // }



  useEffect(() => {
    fatchjobs()
  }, [])


  const deletejobs = async (id) => {
    if (!window.confirm("Do you really want to delete this job?")) return;

    try {
      await axios.delete(`https://pixel-job-portal-backend.onrender.com/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Job deleted successfully!");
      fatchjobs();
    } catch (error) {
      console.log("Error deleting job:", error.response?.data || error);
      toast.error("Failed to delete job");
    }
  };

  const statuschanged = async (id) => {
    try {
       await axios.put(`https://pixel-job-portal-backend.onrender.com/api/jobs/${id}/togglestatus`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Status change successfully!");
      fatchjobs();
    } catch (error) {
      console.log("Error status changes:", error.response?.data || error);
      toast.error("Failed to change status");

    }
  }

  const editjob = (job) => {
    navigate("/Employedashboard", { state: { job } })
  }

  const managejobfilter = jobs.filter(jobs =>
    jobs.title.toLowerCase().includes(search.toLowerCase())
  )



   const application = async (jobId) => {
    console.log(jobId)
    try {
      const res = await axios.get(
        `https://pixel-job-portal-backend.onrender.com/api/jobs/${jobId}/applicants`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setallapplication(res.data.applicants || []);
      console.log(`Applicants for Job ${jobId}:`, res.data.applicants);
    } catch (error) {
      console.log("Error fetching applications:", error.response?.data || error.message);
    }
  };
  
   const getalljobsapply = async (jobId) => {
    console.log(jobId) 
    try {
      const res = await axios.get(
        `https://pixel-job-portal-backend.onrender.com/api/jobs/${jobId}/getEmployerJobsWithApplicants`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setallapplication(res.data.job || []);
      console.log(`Applicants for Job ${jobId}:`, res.data.job);
    } catch (error) {
      console.log("Error fetching applications:", error.response?.data || error.message);
    }
  };

  
  const applicantlength = allapplication.length;
  console.log("Total applicants:", applicantlength);
  useEffect(() => {
    application();
  }, []);


  return (
    <div className='bg-blue-200 min-h-screen  '>
      <div className=' flex justify-between text-3xl  px-12 py-10 items-center'>
        <h1 className='font-bold'>
          PixelGenix
        </h1>
        <p>
          <BsFillBellFill className='text-gray-500 hover:text-gray-600 cursor-pointer' />
        </p>

      </div>
      <div className='border-b-2 border-gray-400'></div>


      <div className='px-8 pt-15 pb-8'>
        <h1 className='text-2xl text-orange-600 font-medium flex gap-2 items-center'>
          <IoPeopleSharp className='bg-white text-3xl rounded-4xl p-0.5' />
          Manage Jobs
        </h1>

        <div className='bg-white sm:min-h-125 p-4 mt-5 rounded-2xl'>
          <div className="relative hidden md:block text-right mt-3 ">
            <input
              placeholder="Search job here"
              type='text'
              value={search}
              onChange={e => setsearch(e.target.value)}
              className="w-65 text-xm  border outline-none  border-gray-400 pl-4 pr-10 py-2 rounded-3xl bg-gray-200"
            />
            <BiSearch className="absolute top-5 right-1 -translate-y-1/2 text-3xl bg-blue-500 rounded-full p-1 text-white  cursor-pointer hover:bg-blue-600" />
          </div>
          <div className='mt-8 px-1'>
            <div className='flex justify-between mt-5  bg-blue-300 p-4 px-5 rounded-t-2xl'>
              <h1 className='text-xl font-medium'>Job Title</h1>
              <h1 className='text-xl font-medium sm:pl-25'>Status</h1>
              <h1 className='text-xl font-medium sm:pl-15'>Date Posted</h1>
              <h1 className='text-xl font-medium'>Application Recived</h1>
              <h1 className='text-xl font-medium sm:pr-5'>Action</h1>
            </div>

            <div className="mt-4">
              {managejobfilter.length == 0 ? (
                <h1 className=" text-3xl text-gray-400 text-center pt-15">No Result</h1>
              ) : (
                managejobfilter.map((items) => {
                  const isActive = items.status === "active"; // check status

                  return (
                    <>
                      <div key={items._id} className="px-4 py-4 flex gap-2 hover:bg-gray-200 rounded  justify-between text-xm font-medium  items-center">
                        <h1 className='sm:w-30'>{items.title}</h1>
                        <h1 className="bg-green-400 p-1  px-3 rounded-2xl items-center ">{items.status}</h1>
                        <h1 className='sm:w-20'>{new Date(items.createdAt).toLocaleDateString()}</h1>
                        <h1 className="w-5 text-center">0</h1>

                        <div className='flex gap-0.5 sm:w-45'>
                          <button className='border bg-blue-500 p-1 px-2 rounded hover:bg-blue-600 cursor-pointer'
                            onClick={() => editjob(items)}
                          > Edit
                          </button>
                          <button className={`border bg-blue-500 p-1 px-2 rounded hover:bg-blue-600 cursor-pointer ${isActive
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-green-500 hover:bg-green-600"
                            }`}
                            onClick={() => statuschanged(items._id)}

                          >          {isActive ? "Closed" : "Activate"}</button>
                          <button className='border bg-blue-500 p-1 px-2 rounded hover:bg-blue-600 cursor-pointer'
                            onClick={() => deletejobs(items._id)}
                          >Delete</button>
                        </div>
                      </div>
                    </>
                  )
                })
              )}
            </div >
          </div>
        </div>
      </div>
      <ToastContainer hideProgressBar />

    </div>
  )
}

export default Managejobs
