import React, { useEffect, useState } from "react";
import AnalyticsOverview from "./AnalyticsOverview";
import DashboardCards from "./Chart";
import axios from "axios";

const Dashboards = () => {
    const [employerLength, setEmployerLength] = useState(0); // store count
    const [Jobseekerlength, setJobseekerlength] = useState(0); // store count
    const [alljobslegnth, setAlljobslength] = useState(0); // store count
    const token = localStorage.getItem("accessToken");

    //  Fetch employer count
    const employedata = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/admin/getemploye`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const count = res.data.employe?.length || 0;
            setEmployerLength(count); // store length in state
        } catch (error) {
            console.log("Error fetching employe:", error.response?.data || error.message);
        }
    };

    const userdata = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/admin/getjobseeker`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const count = res.data.jobseeker?.length || 0;
            setJobseekerlength(count); // store length in state
        } catch (error) {
            console.log("Error fetching users:", error.response?.data || error.msg);
        }
    };
    const Jobdata = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/admin/getAllJobs`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log("Response:", res.data);
            const count = (res.data.jobs?.length || 0);
            setAlljobslength(count);

        }
        catch (error) {
            console.log("Error fetching jobs:", error.response?.data || error.message);
        }
    };

    //  Run once on component load
    useEffect(() => {
        employedata();
        userdata()
        Jobdata()
    }, []);

    // Use state value dynamically in dashboard cards
    const stats = [
        { title: "Total Employers", value: employerLength, unit: "Employers" },
        { title: "Total Jobseekers", value: Jobseekerlength, unit: "Jobseekers" },
        { title: "Total Jobs", value: alljobslegnth, unit: "Jobs" },
        { title: "Total Users", value: employerLength + Jobseekerlength , unit: "Users" },
    ];

return (
    <div className="px-10 mr-10">
        <h1 className="text-gray-400 font-medium text-sm pb-6">
            Information about current plan & Users
        </h1>

        {/* Cards rendered dynamically */}
        <div className="flex flex-wrap justify-center gap-5">
            {stats.map((item, index) => (
                <div
                    key={index}
                    className="bg-white p-3 flex w-55 flex-col items-center rounded shadow-sm min-w-[180px]"
                >
                    <h1 className="flex items-center gap-3 text-center text-lg font-medium">
                        {item.title}
                        <span className="bg-red-300 rounded-2xl text-xs px-2 py-0.5">10%</span>
                    </h1>
                    <h3 className="text-2xl font-semibold">{item.value}</h3>
                    <p className="text-gray-400 font-medium text-sm">{item.unit}</p>
                </div>
            ))}
        </div>

        {/* Charts */}
        <div className="mt-8">
            <AnalyticsOverview />
        </div>

        <div className="mt-10 pb-10">
            <DashboardCards />
        </div>
    </div>
);
};

export default Dashboards;
