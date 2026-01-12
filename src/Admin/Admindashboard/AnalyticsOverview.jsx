import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

// ----- Sample data -----
const fullData = [
    { name: "Jan", jobView: 60, jobApplied: 20 },
    { name: "Feb", jobView: 70, jobApplied: 25 },
    { name: "Mar", jobView: 65, jobApplied: 22 },
    { name: "Apr", jobView: 40, jobApplied: 15 },
    { name: "May", jobView: 45, jobApplied: 18 },
    { name: "Jun", jobView: 50, jobApplied: 19 },
    { name: "Jul", jobView: 55, jobApplied: 21 },
    { name: "Aug", jobView: 77, jobApplied: 23 },
    { name: "Sep", jobView: 58, jobApplied: 18 },
    { name: "Oct", jobView: 62, jobApplied: 20 },
    { name: "Nov", jobView: 70, jobApplied: 25 },
    { name: "Dec", jobView: 55, jobApplied: 17 },
];

// Simple dropdown filter function
function getFilteredData(range) {
    if (range === "This Month") return [fullData[new Date().getMonth()]];
    if (range === "Last 3 Months") return fullData.slice(-3);
    if (range === "First Half") return fullData.slice(0, 6);
    return fullData; // All Year
}

export default function AnalyticsOverview() {
    const [range, setRange] = useState("All Year");
    const [hiddenKeys, setHiddenKeys] = useState([]); // for legend toggle

    const filtered = getFilteredData(range);

    // Recharts allows custom legend click handler:
    const handleLegendClick = (dataKey) => {
        setHiddenKeys((prev) =>
            prev.includes(dataKey)
                ? prev.filter((k) => k !== dataKey)
                : [...prev, dataKey]
        );
    };

    return (
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
            {/* Header with dropdown */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-xl font-semibold text-gray-800">
                    Analytics Overview
                </h2>

                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <option>All Year</option>
                    <option>This Month</option>
                    <option>Last 3 Months</option>
                    <option>First Half</option>
                </select>
            </div>

            {/* Chart */}
            <div className="w-full h-72">
                <ResponsiveContainer>
                    <BarChart
                        data={filtered}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                            cursor={{ fill: "rgba(124,58,237,0.1)" }}
                            formatter={(value) => [`${value}`, "Count"]}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: 10 }}
                            onClick={(e) => handleLegendClick(e.dataKey)}
                            formatter={(value) => (
                                <span className="text-gray-700 text-sm capitalize">
                                    {value === "jobView" ? "Job View" : "Job Applied"}
                                </span>
                            )}
                        />
                        {!hiddenKeys.includes("jobView") && (
                            <Bar dataKey="jobView" stackId="a" fill="#7c3aed" barSize={40} />
                        )}
                        {!hiddenKeys.includes("jobApplied") && (
                            <Bar dataKey="jobApplied" stackId="a" fill="#c4b5fd" barSize={40} />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
