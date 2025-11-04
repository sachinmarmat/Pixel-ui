import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';


const Employers = () => {

    const [allemployers, setallemployers] = useState([])

    // const length = allemployers ? allemployers.length : 0;


    const token = localStorage.getItem('accessToken')
    const employedata = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/admin/getemploye`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log("Response:", res.data); 
            setallemployers(res.data.employe || []);

        }
        catch (error) {
            console.log("Error fetching employe:", error.response?.data || error.msg);
        }
    };

    useEffect(() => {
        employedata()
    }, [])



    const togalstatus = async (id, currentStatus) => {
        try {
            let res;

            if (currentStatus === "active") {
                // Suspend user
                res = await axios.put(
                    `http://localhost:8080/api/admin/employer/${id}/suspendemployer`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } else {
                // Reactivate user
                res = await axios.put(
                    `http://localhost:8080/api/admin/employer/${id}/reactivateEmployer`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            }

            toast.success(res.data.message || "Status changed!", {
                position: "top-right",
                autoClose: 1000,
                theme: "light",
                transition: Bounce,
            });

            employedata(); // refresh list
        } catch (error) {
            console.log("Error toggle:", error.response?.data || error.message);
            toast.error("Failed to change status");
        }
    };

    const deleteEmploye = async (id) => {
        if (!window.confirm("Do you really want to delete this user?")) return;

        try {
            await axios.delete(`http://localhost:8080/api/admin/employer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Employe Deleted", {
                position: "top-right",
                autoClose: 1000,
                theme: "light",
                transition: Bounce
            });

            employedata();
        } catch (error) {
            console.log("Error deleting user:", error.response?.data || error);
            toast.error("Failed to delete user");
        }
    }

    return (
        <div>

            <div className="px-7  ">

                <div className='bg-white sm:min-h-125 p-2 px-5 mt-3 rounded-2xl'>
                    <div className='mt-4 px-1 '>
                        <div className='flex justify-between sm:pr-15 bg-blue-300 p-4 px-8 rounded-t-2xl'>
                            <h1 className='text-xl font-medium'>Company</h1>
                            <h1 className='text-xl font-medium md:pr-5'>Status</h1>
                            <h1 className='text-xl font-medium'>Action</h1>
                        </div>
                        <div className="mt-4">
                            {allemployers.length == 0 ? (
                                <h1 className=" text-3xl text-gray-400 text-center pt-15">No Jobs Application</h1>
                            ) : (
                                allemployers.map((data) => {
                                    const isActive = data.status === "active";

                                    return (
                                        <div key={data._id} className="px-4 py-4 flex gap-5 hover:bg-gray-200 rounded  justify-between text-xm font-medium  items-center">
                                            <div className="flex flex-col md:w-28">
                                                <h1>{data.name}</h1>
                                                {/* <h1 className="text-gray-500 text-xs hover:underline">{data.title}</h1> */}
                                            </div>
                                            <h1 className={`p-1 px-3 rounded-2xl  ${isActive ? "bg-green-400" : "bg-red-400"
                                                }`}
                                            >{data.status}</h1>
                                            <div className='flex gap-1'>
                                                {/* <button className='border bg-blue-500 p-1 rounded text-white hover:bg-blue-600 cursor-pointer'>Activeted</button> */}
                                                <button className={`border p-1 px-3 rounded text-white cursor-pointer ${isActive
                                                    ? "bg-orange-500 hover:bg-orange-600"
                                                    : "bg-green-500 hover:bg-green-600"
                                                    }`}
                                                    onClick={() => togalstatus(data._id, data.status)}
                                                >
                                                    {isActive ? "Suspend" : "Activate"}
                                                </button>
                                                <button className='border bg-black p-1 px-2 rounded text-white cursor-pointer'
                                                    onClick={() => deleteEmploye(data._id)}>Delete</button>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer hideProgressBar />

        </div>
    )
};

export default Employers
