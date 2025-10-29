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

  // user.(localStorage.getjobs(""))

  const user = JSON.parse(localStorage.getItem('user'))
  const id = user?.id

  const token = localStorage.getItem('accessToken')
  const fatchjobs = async () => {
    try {
      const getjobs = await axios.get(`http://localhost:8080/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Jobs fetched:', getjobs.data);
      setjobs(getjobs.data.job || []); // THIS LINE FIXED

    } catch (error) {
      console.log('error fetching job', error)
    }
  }

  useEffect(() => {
    fatchjobs()
  }, [])


  const deletejobs = async (id) => {
    if (!window.confirm("Do you really want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/jobs/${id}`, {
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

  // const closejob = (jobstate) => {

  // }

  const editjob = (job) => {
    navigate("/Employedashboard", { state: { job } })
  }

  const managejobfilter = jobs.filter(jobs =>
    jobs.title.toLowerCase().includes(search.toLowerCase())
  )

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
                  return (
                    <>
                      <div key={items._id} className="px-4 py-4 flex gap-2 hover:bg-gray-200 rounded  justify-between text-xm font-medium  items-center">
                        <h1 className='sm:w-30'>{items.title}</h1>
                        <h1 className="bg-green-400 p-o.5 px-2 rounded-2xl items-center ">{items.status}</h1>
                        <h1 className='sm:w-20'>{new Date(items.createdAt).toLocaleDateString()}</h1>
                        <h1 className="w-5 text-center">{items.salary}</h1>

                        <div className='flex'>
                          <button className='border bg-blue-500 p-1 rounded hover:bg-blue-600 cursor-pointer'
                            onClick={() => editjob(items)}
                          > Edit
                          </button>
                          <button className='border bg-blue-500 p-1 rounded hover:bg-blue-600 cursor-pointer'

                          >Close</button>
                          <button className='border bg-blue-500 p-1 rounded hover:bg-blue-600 cursor-pointer'
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
      <ToastContainer hideProgressBar/>

    </div>
  )
}

export default Managejobs
