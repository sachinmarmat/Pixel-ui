import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const JobApplyForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

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

  // Expect job passed as location.state.job
  // const jobObj = location.state?.item || null;
  const jobId = location.state?.item?._id || location.state?.job?._id || null;
  const jobTitle = location.state?.item?.title || location.state?.job?.title || "Job";


  // token: try both keys, but keep consistent in your app (prefer 'token')
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?._id || null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const goback = () => navigate(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobId) {
      alert("Job ID missing. Open this job from job list and try again.");
      console.error("Missing jobId. location.state:", location.state);
      return;
    }
    if (!token) {
      alert("You must be logged in to apply. Redirecting to Login.");
      navigate("/Login");
      return;
    }
    setLoading(true)
    // Build multipart form data
    const data = new FormData();
    data.append("job", jobId);
    if (userId) data.append("user", userId);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("experience", formData.experience);
    data.append("expectedSalary", formData.expectedSalary);
    data.append("linkedin", formData.linkedin);
    data.append("coverLetter", formData.coverLetter);
    if (formData.resume) data.append("resume", formData.resume);

    try {
      const res = await axios.post(
        `http://localhost:8080/api/jobs/${jobId}/apply`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Do NOT set Content-Type manually; browser/axios will set the multipart boundary.
          },
        }
      );
      console.log("Application submitted:", res.data);
      toast.success(res.data.message || "Application Submited"), {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      };
      // toast.success("Application submitted!");
      setTimeout(() => navigate(-1), 500);

    } catch (error) {
      console.error("Error applying:", error.response?.data || error.message);
      // alert(error.response?.data?.message || "Failed to submit application. Please try again.");
      toast.info(error.response?.data?.message || "Failed to submit application. Please try again."), {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      };
      // toast.success("Application submitted!");
      setTimeout(() => navigate(-1), 3000);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Apply for - {jobTitle}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded-lg" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded-lg" />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full border p-2 rounded-lg" />

          <select name="experience" value={formData.experience} onChange={handleChange} required className="w-full border p-2 rounded-lg">
            <option  value="">Select Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="1-2 years">1-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>

          <input type="number" name="expectedSalary" placeholder="Expected Salary (₹)" value={formData.expectedSalary} onChange={handleChange} className="w-full border p-2 rounded-lg" />
          <input type="text" name="linkedin" placeholder="LinkedIn / Portfolio URL" value={formData.linkedin} onChange={handleChange} className="w-full border p-2 rounded-lg" />
          <textarea name="coverLetter" placeholder="Cover Letter" value={formData.coverLetter} onChange={handleChange} rows="3" className="w-full border p-2 rounded-lg" />
          <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} required className="w-full border p-2 rounded-lg" />

          <div className="flex justify-between mt-4">
            <button type="button" onClick={goback} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />

    </div>
  );
};

export default JobApplyForm;