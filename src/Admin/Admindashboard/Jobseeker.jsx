import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Jobseeker = () => {
    const [allusers, setallusers] = useState([]);

    const token = localStorage.getItem("accessToken");

    const userdata = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/admin/getjobseeker`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setallusers(res.data.jobseeker || []);
        } catch (error) {
            console.log("Error fetching users:", error.response?.data || error.msg);
        }
    };

    useEffect(() => {
        userdata();
    }, []);

    const togalstatus = async (id, currentStatus) => {
        try {
            let res;

            if (currentStatus === "active") {
                // Suspend user
                res = await axios.put(
                    `http://localhost:8080/api/admin/user/${id}/suspenduser`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } else {
                // Reactivate user
                res = await axios.put(
                    `http://localhost:8080/api/admin/user/${id}/reactivateuser`,
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

            userdata(); // refresh list
        } catch (error) {
            console.log("Error toggle:", error.response?.data || error.message);
            toast.error("Failed to change status");
        }
    };

    const deletejobseeker = async (id) => {
        if (!window.confirm("Do you really want to delete this user?")) return;

        try {
            await axios.delete(`http://localhost:8080/api/admin/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("user Deleted", {
                position: "top-right",
                autoClose: 1000,
                theme: "light",
                transition: Bounce
            });

            userdata();
        } catch (error) {
            console.log("Error deleting user:", error.response?.data || error);
            toast.error("Failed to delete user");
        }
    };

    return (
        <div>
            <div className="px-7">
                <div className="bg-white sm:min-h-125 p-2 px-4 mt-3 rounded-2xl">
                    <div className="mt-4 px-1">
                        <div className="flex justify-between bg-blue-300 p-4 px-8 rounded-t-2xl">
                            <h1 className="text-xl font-medium">Name</h1>
                            <h1 className="text-xl font-medium sm:pr-8">Status</h1>
                            <h1 className="text-xl font-medium sm:pr-5">Action</h1>
                        </div>

                        <div className="pt-5  ">
                            {allusers.length === 0 ? (
                                <h1 className="text-3xl text-gray-400 text-center pt-15">
                                    No Job Seekers Found
                                </h1>
                            ) : (
                                allusers.map((item) => {
                                    const isActive = item.status === "active";
                                    return (
                                        <div
                                            key={item._id}
                                            className="px-4 py-4 flex  gap-5 hover:bg-gray-200  rounded justify-between text-xm font-medium items-center"
                                        >
                                            <div className="flex flex-col md:w-30">
                                                <h1>{item.name}</h1>

                                            </div>

                                            <h1
                                                className={`p-1 px-3 rounded-2xl text-white ${isActive ? "bg-green-500" : "bg-orange-400"
                                                    }`}
                                            >
                                                {isActive ? "Active" : "Suspended"}
                                            </h1>

                                            <div className="flex gap-1">
                                                <button
                                                    className={`border p-1 px-3 rounded text-white cursor-pointer ${isActive
                                                        ? "bg-orange-500 hover:bg-orange-600"
                                                        : "bg-green-500 hover:bg-green-600"
                                                        }`}
                                                    onClick={() => togalstatus(item._id, item.status)}
                                                >
                                                    {isActive ? "Suspend" : "Activate"}
                                                </button>

                                                <button className="border bg-black p-1 px-3 rounded text-white cursor-pointer hover:bg-gray-800"
                                                    onClick={()=>deletejobseeker(item._id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer hideProgressBar />
        </div>
    );
};

export default Jobseeker;
