import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import domtoimage from "dom-to-image-more";
import { useEffect } from "react";

const defaultData = {
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    photo: "",
  },
  summary: "",
  education: [{ id: 1, degree: "", school: "", start: "", end: "", details: "" }],
  experience: [{ id: 2, title: "", company: "", start: "", end: "", details: "" }],
  projects: [{ id: 3, name: "", description: "", link: "" }],
  skills: [""],
  languages: [""],
};

export default function ResumeBuilder() {
  const [data, setData] = useState(defaultData);
  const [users, setusers] = useState(null);
  const previewRef = useRef();

  // ==== Update Helpers ====
  const updatePersonal = (key, value) =>
    setData((prev) => ({ ...prev, personal: { ...prev.personal, [key]: value } }));

  const updateField = (key, id, field, value) =>
    setData((p) => ({
      ...p,
      [key]: p[key].map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));

  const addItem = (key, templateItem) =>
    setData((p) => ({ ...p, [key]: [...p[key], { ...templateItem, id: Date.now() }] }));

  const removeItem = (key, id) =>
    setData((p) => ({ ...p, [key]: p[key].filter((item) => item.id !== id) }));

  const handlePhoto = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updatePersonal("photo", reader.result);
    reader.readAsDataURL(file);
  };

  const token = localStorage.getItem("accessToken");

  const increaseResumeCount = async () => {
    try {
      const res = await axios.post(
        "https://pixel-job-portal-backend.onrender.com/api/premium/resumecounte",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Resume count:", res.data.resumeCount);
    } catch (error) {
      console.error("Error increasing count:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://pixel-job-portal-backend.onrender.com/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setusers(res.data.user || res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // ==== Export PDF ====
  const exportPDF = async () => {
    if (!users) return alert(" user dont find ");


    // Restrict free users to 1 resume
    if (!users.isPremium && users.resumeCount >= 1) {
      alert("⚠️ Free plan users can only create 1 resume.\nUpgrade to Premium to create more!");
      window.location.href = "/PremiumPlans";
      return;
    }


    const el = previewRef.current;
    if (!el) return alert("Preview not found");

    el.classList.add("print-clean");
    try {
      const dataUrl = await domtoimage.toPng(el, {
        cacheBust: true,
        bgcolor: "#ffffff",
        quality: 1,
        style: { background: "#fff", boxShadow: "none", border: "none" },
        useCORS: true,
      });

      const pdf = new jsPDF("p", "pt", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const img = new Image();
      img.src = dataUrl;


      img.onload = async () => {
        const ratio = img.height / img.width;
        const height = width * ratio;
        pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
        pdf.save(`${data.personal.fullName || "resume"}.pdf`);
        await increaseResumeCount?.();
      };

    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export resume.");
    } finally {
      el.classList.remove("print-clean");
    }
  };

  // ==== JSX ====
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">

        {/* LEFT PANEL */}
        <div className="col-span-12 lg:col-span-5">
          <h1 className="text-3xl font-extrabold mb-4 text-indigo-700">
            🎨 Resume Builder
          </h1>

          {/* PERSONAL INFO */}
          <section className="bg-white p-4 rounded-2xl shadow mb-4 border border-gray-100">
            <h2 className="font-semibold mb-3 text-indigo-700">
              Personal Info <span className="text-red-500">*</span>
            </h2>
            <input
              required
              value={data.personal.fullName}
              onChange={(e) => updatePersonal("fullName", e.target.value)}
              placeholder="Full Name *"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              value={data.personal.title}
              onChange={(e) => updatePersonal("title", e.target.value)}
              placeholder="Job Title"
              className="w-full p-2 border rounded mb-2"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                required
                value={data.personal.email}
                onChange={(e) => updatePersonal("email", e.target.value)}
                placeholder="Email *"
                className="p-2 border rounded"
              />
              <input
                required
                value={data.personal.phone}
                onChange={(e) => updatePersonal("phone", e.target.value)}
                placeholder="Phone *"
                className="p-2 border rounded"
              />
            </div>
            <input
              value={data.personal.location}
              onChange={(e) => updatePersonal("location", e.target.value)}
              placeholder="Location"
              className="w-full p-2 border rounded mt-2"
            />
            <input
              value={data.personal.linkedin}
              onChange={(e) => updatePersonal("linkedin", e.target.value)}
              placeholder="LinkedIn"
              className="w-full p-2 border rounded mt-2"
            />
            <input
              value={data.personal.github}
              onChange={(e) => updatePersonal("github", e.target.value)}
              placeholder="GitHub"
              className="w-full p-2 border rounded mt-2"
            />
            <label className="block text-sm mt-2">Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhoto(e.target.files[0])}
            />
          </section>
          <section
            className="bg-white p-4 rounded shadow mb-4"> <h2 className="font-semibold mb-2">Summary</h2>
            <textarea value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })} rows={4} className="w-full p-2 border rounded" />
          </section>
          <SectionList
            title="Education *"
            data={data.education}
            onAdd={() =>
              addItem("education", {
                degree: "",
                school: "",
                start: "",
                end: "",
                details: "",
              })
            }
            onRemove={(id) => removeItem("education", id)}
            onChange={(id, f, v) => updateField("education", id, f, v)}
            fields={[
              { key: "degree", label: "Degree *" },
              { key: "school", label: "College *" },
              { key: "start", label: "Start" },
              { key: "end", label: "End" },
              { key: "details", label: "Details" },
            ]}
          />

          <SectionList
            title="Experience *"
            data={data.experience}
            onAdd={() =>
              addItem("experience", {
                title: "",
                company: "",
                start: "",
                end: "",
                details: "",
              })
            }
            onRemove={(id) => removeItem("experience", id)}
            onChange={(id, f, v) => updateField("experience", id, f, v)}
            fields={[
              { key: "title", label: "Job Title *" },
              { key: "company", label: "Company *" },
              { key: "start", label: "Start" },
              { key: "end", label: "End" },
              { key: "details", label: "Details" },
            ]}
          />

          <SectionList
            title="Projects"
            data={data.projects}
            onAdd={() =>
              addItem("projects", { name: "", description: "", link: "" })
            }
            onRemove={(id) => removeItem("projects", id)}
            onChange={(id, f, v) => updateField("projects", id, f, v)}
            fields={[
              { key: "name", label: "Project Name" },
              { key: "description", label: "Description" },
              { key: "link", label: "Link" },
            ]}
          />

          <section className="bg-white p-4 rounded-2xl shadow mb-4 border border-gray-100">
            <h2 className="font-semibold mb-2 text-indigo-700">
              Skills <span className="text-red-500">*</span>
            </h2>
            <textarea
              value={data.skills.join(", ")}
              onChange={(e) =>
                setData({
                  ...data,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              placeholder="e.g. React, JavaScript, Tailwind"
              className="w-full p-2 border rounded"
            />
          </section>

          <section className="bg-white p-4 rounded-2xl shadow mb-4 border border-gray-100">
            <h2 className="font-semibold mb-2 text-indigo-700">
              Languages <span className="text-red-500">*</span>
            </h2>
            <textarea
              value={data.languages.join(", ")}
              onChange={(e) =>
                setData({
                  ...data,
                  languages: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              placeholder="e.g. English, Hindi, Spanish"
              className="w-full p-2 border rounded"
            />
          </section>

          <button
            onClick={exportPDF}
            className="px-4 py-3 bg-gradient-to-r cursor-pointer from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl w-full transition"
          >
            Download PDF
          </button>
        </div>

        {/* RIGHT PANEL (Preview) */}
        <div className="col-span-12 lg:col-span-7">
          <div
            ref={previewRef}
            className="bg-white shadow-2xl p-8 rounded-2xl border border-gray-100"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {data.personal.fullName}
                </h1>
                <p className="text-indigo-600 font-medium text-lg">
                  {data.personal.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {data.personal.location} • {data.personal.phone} •{" "}
                  {data.personal.email}
                </p>
                <p className="text-sm text-gray-600">
                  {data.personal.linkedin}{" "}
                  {data.personal.github && ` • ${data.personal.github}`}
                </p>
              </div>
              {data.personal.photo && (
                <img
                  src={data.personal.photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow"
                />
              )}
            </div>

            {/* Body */}
            <div className="mt-6 grid grid-cols-3 gap-6">
              {/* Left Side */}
              <div className="col-span-1 border-r pr-4 space-y-6">
                <div>
                  <h3 className="text-indigo-600 font-semibold border-b pb-1 mb-2">
                    Skills
                  </h3>
                  <ul className="flex flex-wrap gap-2 text-sm">
                    {data.skills
                      .filter(Boolean)
                      .map((s, i) => (
                        <li
                          key={i}
                          className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full"
                        >
                          {s}
                        </li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-purple-600 font-semibold border-b pb-1 mb-2">
                    Languages
                  </h3>
                  <ul className="flex flex-wrap gap-2 text-sm">
                    {data.languages
                      .filter(Boolean)
                      .map((s, i) => (
                        <li
                          key={i}
                          className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
                        >
                          {s}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Right Side */}
              <div className="col-span-2 space-y-6">
                {data.summary && (
                  <section>
                    <h3 className="font-semibold text-gray-800 border-b pb-1 mb-2">
                      Summary
                    </h3>
                    <p className="text-sm text-gray-700">{data.summary}</p>
                  </section>
                )}

                <section>
                  <h3 className="font-semibold text-gray-800 border-b pb-1 mb-2">
                    Experience
                  </h3>
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="mb-3">
                      <div className="flex justify-between text-sm font-medium text-indigo-700">
                        <span>
                          {exp.title} — {exp.company}
                        </span>
                        <span>
                          {exp.start} - {exp.end}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mt-1">
                        {exp.details}
                      </p>
                    </div>
                  ))}
                </section>

                <section>
                  <h3 className="font-semibold text-gray-800 border-b pb-1 mb-2">
                    Education
                  </h3>
                  {data.education.map((edu) => (
                    <div key={edu.id} className="mb-3">
                      <div className="flex justify-between text-sm font-medium text-purple-700">
                        <span>
                          {edu.degree} — {edu.school}
                        </span>
                        <span>
                          {edu.start} - {edu.end}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mt-1">
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </section>

                <section>
                  <h3 className="font-semibold text-gray-800 border-b pb-1 mb-2">
                    Projects
                  </h3>
                  {data.projects.map((proj) => (
                    <div key={proj.id}>
                      <p className="text-sm">
                        <span className="font-semibold text-indigo-600">
                          {proj.name}
                        </span>{" "}
                        — {proj.description}{" "}
                        {proj.link && (
                          <a
                            href={proj.link}
                            className="text-blue-600 underline"
                          >
                            {proj.link}
                          </a>
                        )}
                      </p>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === Helper Section Component === */
function SectionList({ title, data, onAdd, onRemove, onChange, fields }) {
  return (
    <section className="bg-white p-4 rounded-2xl shadow mb-4 border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-indigo-700">{title}</h2>
        <button
          onClick={onAdd}
          className="px-2 py-1 bg-green-500 cursor-pointer hover:bg-green-600 text-white rounded text-sm"
        >
          Add
        </button>
      </div>
      {data.map((item) => (
        <div key={item.id} className="p-2 border rounded-lg mb-2">
          {fields.map((f) => (
            <input
              key={f.key}
              required={f.label.includes("*")}
              value={item[f.key]}
              onChange={(e) => onChange(item.id, f.key, e.target.value)}
              placeholder={f.label}
              className="w-full p-1 border rounded mb-1 text-sm"
            />
          ))}
          <button
            onClick={() => onRemove(item.id)}
            className="px-2 py-1 bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded text-sm"
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
}
