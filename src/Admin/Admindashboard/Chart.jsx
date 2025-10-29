import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

const pieData = [
  { name: "Re-used APIs", value: 36, color: "#ef4444" }, // red
  { name: "Webhooks", value: 38, color: "#3b82f6" },    // blue
  { name: "API Calls", value: 25, color: "#9ca3af" }    // gray
];

const PlanBar = ({ label, value, max, color }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{label}</span>
        <span>
          {value}/{max}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default function DashboardCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* ---------- Left: P&L ---------- */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex  justify-between items-center mb-4">
          <h2 className="text-lg font-semibold underline">P&amp;L</h2>
          <span className="text-sm text-gray-400">
            Total profit growth of 25%
          </span>
        </div>

        <div className="h-65">
          <ResponsiveContainer>
            <PieChart>
              <Tooltip />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry) => (
                  <span className="text-sm text-gray-700">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ---------- Right: Current Plan ---------- */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
        <h2 className="text-lg font-semibold mb-1">Current Plan</h2>
        <p className="text-sm text-gray-500 mb-4">
          Information and usages of your current plan
        </p>

        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mr-4 text-xl">
            🛠
          </div>
          <div>
            <p className="font-medium text-gray-800">Teams Plan</p>
            <p className="text-gray-500 text-sm">$99/mo</p>
          </div>
        </div>

        <PlanBar label="Projects" value={1} max={3} color="bg-orange-400" />
        <PlanBar label="Users" value={1} max={5} color="bg-purple-500" />
        <PlanBar label="Requests/day" value={7540} max={10000} color="bg-red-500" />

        <button className="mt-auto self-start bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
          <a href="/PremiumPlans">  Upgrade Plan
          </a>
        </button>
      </div>
    </div>
  );
}
