import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';


const Managejob = () => {


    const [alljobs, setalljobs] = useState([])

    const token = localStorage.getItem('accessToken');

    const Jobdata = async () => {
        try {
            const res = await axios.get(`https://pixel-job-portal-backend.onrender.com/api/admin/getAllJobs`, {
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

    const user = JSON.parse(localStorage.getItem("user"))
    const id = user?._id


    const togalstatus = async (id) => {
        // console.log(token)
        try {
            const res = await axios.put(`https://pixel-job-portal-backend.onrender.com/api/jobs/${id}/togglestatus`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log("Response:", res);
            // toast.success("Status changed!");
            toast.success(res.data.msg || "Status changed!", {
                position: "top-right",
                autoClose: 1000,
                theme: "light",
                transition: Bounce
            });

            Jobdata()
        }
        catch (error) {
            console.log("Error togale:", error.response?.data || error.message);
        }
    };


    const deletejob = async (id) => {
        if (!window.confirm("Do you really want to delete this job?")) return;

        try {
            await axios.delete(`https://pixel-job-portal-backend.onrender.com/api/admin/job/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Job Deleted", { 
                position: "top-right",
                autoClose: 1000, 
                theme: "light",
                transition: Bounce
            });

            Jobdata();
        } catch (error) {
            console.log("Error deleting job:", error.response?.data || error);
            toast.error("Failed to delete job");
        }
    };


    return (

        <div className="px-8 pt-5">
            <div className='bg-white sm:min-h-125 p-4 mt-5 rounded-2xl'>
                <div className='mt-5 px-1'>
                    <div className='flex justify-between  bg-blue-300 p-4 px-6 rounded-t-2xl'>
                        <h1 className='text-xl font-medium'>Job Title</h1>
                        <h1 className='text-xl font-medium sm:ml-10'>Company</h1>
                        <h1 className='text-xl font-medium sm:mr-15 '>Status</h1>
                        <h1 className='text-xl font-medium'>Action</h1>
                    </div>

                    <div className="mt-4">
                        {alljobs.length == 0 ? (
                            <h1 className=" text-3xl text-gray-400 text-center pt-15">No Result</h1>
                        ) : (
                            alljobs.map((items) => {
                                const isActive = items.status === "active"; // check status

                                return (
                                    <>
                                        <div key={items._id} className="px-4 py-4 flex gap-5 hover:bg-gray-200 rounded  justify-between text-xm font-medium  items-center">
                                            <h1 className='sm:w-40'>{items.title}</h1>
                                            <h1 className="items-center   text-center">{items.company}</h1>
                                            <h1 className="bg-green-200 p-o.5 px-2 rounded-2xl ">{items.status}</h1>
                                            <div className='flex'>
                                                <button className='border bg-orange-500 p-1 w-22 px-2 text-white rounded hover:bg-orange-600 cursor-pointer'
                                                    onClick={() => togalstatus(items._id)}
                                                >          {isActive ? "Closed" : "Activate"}
                                                </button>
                                                <button className='border bg-black p-1 px-2 rounded text-white cursor-pointer'
                                                    onClick={() => deletejob(items._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        )}
                    </div >
                </div>
            </div>
            <ToastContainer hideProgressBar />

        </div>

    )
}

export default Managejob
