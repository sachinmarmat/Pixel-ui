import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTemporary, toggleJobType, applyFilters } from "../../redux/slice/jobslice";

const Jobfilter = () => {
  const dispatch = useDispatch();
  const { temporary } = useSelector((state) => state.job);

  const handleChange = (field, value) => {
    dispatch(updateTemporary({ field, value }));
  };
 
  return (  
    <div className="p-4 bg-white rounded-xl shadow-md w-65">
      <label className="text-sm font-semibold text-gray-700">Job Title</label>
      <input 
        type="text" 
        value={temporary.title} 
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Job Title"
        className="w-full p-2 mt-1 mb-3 rounded-md bg-blue-50 border border-gray-200 outline-none"
      />
 
      <label className="text-sm font-semibold text-gray-700">Location</label>
      <input 
        type="text"
        value={temporary.location}
        onChange={(e) => handleChange("location", e.target.value)}
        placeholder="Location"
        className="w-full p-2 mt-1 mb-3 rounded-md bg-blue-50 border border-gray-200 outline-none"
      />

      <label className="text-sm font-semibold text-gray-700">Salary</label>
      <input
        type="range"
        min="10000"
        max="10000000"
        step="1000"
        value={temporary.salary}
        onChange={(e) => handleChange("salary", Number(e.target.value))}
        className="w-full accent-orange-500"
      />
      <div className="flex justify-between text-sm text-gray-600 mb-3">
        <span>₹1L</span>
        <span>₹20L</span>
      </div>
      <p className="text-center text-sm text-gray-700 mb-3">
        Selected: <span className="font-semibold text-orange-600">₹{temporary.salary.toLocaleString()}</span>
      </p>

      <label className="text-sm font-semibold text-gray-700">Job Type</label>
      <div className="grid grid-cols-2 gap-2 mb-3 mt-2">
        {["Full Time", "Part Time", "Remote", "Internship"].map((type) => (
          <label key={type} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={temporary.jobtype.includes(type)}
              onChange={() => dispatch(toggleJobType(type))}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm">{type}</span> 
          </label>
        ))}
      </div>

      <label className="text-sm font-semibold text-gray-700">Experience</label>
      <div className="grid grid-cols-2 gap-2 mb-5 mt-2">
        {["Fresher", "Mid", "Professional"].map((exp) => (
          <label key={exp} className="flex items-center gap-2">
            <input
              type="radio"
              name="experience"
              checked={temporary.experience === exp}
              onChange={() => handleChange("experience", exp)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm">{exp}</span>
          </label>
        ))}
      </div>

      <button
        onClick={() => dispatch(applyFilters())}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Apply Filter 
      </button>
    </div>
  );
};

export default Jobfilter;
