import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const JobApplyForm = ({ job, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
        expectedSalary: "",
        linkedin: "",
        coverLetter: "",
        resume: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Application submitted successfully!");
        onClose();
    };
    

    const location=useLocation()

    const {item}=location.state

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-100/85 rounded-2xl shadow-xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Apply for - {item }
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded-lg outline-hidden"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded-lg outline-hidden"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded-lg outline-hidden"
                    />

                    <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg"
                    >
                        <option value="">Select Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                    </select>

                    <input
                        type="number"
                        name="expectedSalary"
                        placeholder="Expected Salary (₹)"
                        value={formData.expectedSalary}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg outline-hidden"
                    />

                    <input
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn / Portfolio URL"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg outline-hidden"
                    />

                    <textarea
                        name="coverLetter"
                        placeholder="Cover Letter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        rows="3"
                        className="w-full border p-2 rounded-lg outline-hidden"
                    />

                    <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg outline-hidden"
                    />

                    <div className="flex justify-between mt-4">
                        <a href="/Dashboard/Jobs" className="">  <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button></a>

                        <button 
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApplyForm;
