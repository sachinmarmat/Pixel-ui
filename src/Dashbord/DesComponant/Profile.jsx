// Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit3, FiSave, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Clean White Profile (Naukri/LinkedIn style)
 * - View mode: only filled fields display
 * - Edit mode: shows all fields (including empty)
 * - Array sections: education, experience, projects (add/remove)
 * - Premium status + cancel modal
 *
 * Backend endpoints expected:
 * - GET  /api/user/profile
 * - PUT  /api/user/profile
 * - GET  /api/premium/status
 * - POST /api/premium/cancel
 *
 * Auth token: localStorage.getItem("accessToken")
 */

const emptyEducation = () => ({ id: Date.now() + Math.random(), degree: "", institute: "", start: "", end: "" });
const emptyExperience = () => ({ id: Date.now() + Math.random(), title: "", company: "", start: "", end: "", details: "", currentlyWorking: false });
const emptyProject = () => ({ id: Date.now() + Math.random(), title: "", description: "", link: "" });

export default function Profile() {
  const token = localStorage.getItem("accessToken") || "";

  // UI state
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // profile state (raw from backend)
  const [profile, setProfile] = useState(null);

  // form state (editable copy)
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    website: "",
    company: "",
    phone: "",
    currentRole: "",
    experienceYears: "",
    currentSalary: "",
    expectedSalary: "",
    summary: "",
    skills: "", // comma separated
    languages: "", // comma separated
    education: [emptyEducation()],
    experience: [emptyExperience()],
    projects: [emptyProject()],
  });

  // premium state
  const [premium, setPremium] = useState({ isPremium: false, plan: null, expiry: null });

  // helper: whether a value is present (for view mode)
  const has = (v) => {
    if (Array.isArray(v)) return v.some((x) => Object.values(x).some((y) => String(y).trim() !== ""));
    return v !== undefined && v !== null && String(v).trim() !== "";
  };

  // Fetch profile + premium status
  useEffect(() => {
    fetchProfile();
    fetchPremium();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://pixel-job-portal-backend.onrender.com/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = res.data.user || res.data || {};
      setProfile(user);

      // Normalize incoming arrays / strings
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        website: user.website || "",
        currentRole: user.currentRole || "",
        company: user.company || "",
        experienceYears: user.experienceYears || "",
        currentSalary: user.currentSalary || "",
        expectedSalary: user.expectedSalary || "",
        summary: user.summary || "",
        skills: Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "",
        languages: Array.isArray(user.languages) ? user.languages.join(", ") : user.languages || "",
        education: Array.isArray(user.education) && user.education.length ? user.education.map((e) => ({ id: e.id || Date.now() + Math.random(), ...e })) : [emptyEducation()],
        experience: Array.isArray(user.experience) && user.experience.length ? user.experience.map((ex) => ({ id: ex.id || Date.now() + Math.random(), ...ex })) : [emptyExperience()],
        projects: Array.isArray(user.projects) && user.projects.length ? user.projects.map((p) => ({ id: p.id || Date.now() + Math.random(), ...p })) : [emptyProject()],
      });
    } catch (err) {
      console.warn("Could not fetch profile (UI still usable):", err?.response?.data || err.message);
      // keep defaults
    } finally {
      setLoading(false);
    }
  };

  const fetchPremium = async () => {
    try {
      const res = await axios.get("https://pixel-job-portal-backend.onrender.com/api/premium/status", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // expected response shape: { isPremium: true/false, plan: 'Gold', expiry: '2025-12-31' }
      setPremium({
        isPremium: res.data.isPremium || false,
        plan: res.data.plan || null,
        expiry: res.data.expiresOn || res.data.expiry || null,
      });
    } catch (err) {
      console.warn("Premium fetch failed:", err?.message || err);
    }
  };

  // EDIT helpers
  const updateField = (key, val) => setForm((s) => ({ ...s, [key]: val }));

  // array helpers
  const addItem = (field, template) => setForm((s) => ({ ...s, [field]: [...(s[field] || []), template] }));
  const updateItem = (field, id, key, val) =>
    setForm((s) => ({ ...s, [field]: s[field].map((it) => (it.id === id ? { ...it, [key]: val } : it)) }));
  const removeItem = (field, id) => setForm((s) => ({ ...s, [field]: s[field].filter((it) => it.id !== id) }));

  // Save to backend
  const handleSave = async (e) => {
    e?.preventDefault?.();
    setLoading(true);
    try {
      // Prepare payload - convert comma strings to arrays
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const res = await axios.put("https://pixel-job-portal-backend.onrender.com/api/user/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(res.data.user || payload); 
      toast.success("Profile saved");
      setEditMode(false);
      fetchPremium(); // refresh premium info if needed
    } catch (err) {
      console.error("Save failed:", err?.response?.data || err.message);
      toast.error("Save failed — try again");
    } finally {
      setLoading(false);
    }
  };

  // Cancel premium
  const handleCancelPremium = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://pixel-job-portal-backend.onrender.com/api/premium/cancel", {}, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(res.data.msg || "Premium canceled");
      setShowCancelConfirm(false);
      // update ui state
      setPremium({ isPremium: false, plan: null, expiry: null });
      fetchProfile();
    } catch (err) {
      console.error("Cancel failed:", err?.response?.data || err.message);
      toast.error("Cancel failed");
    } finally {
      setLoading(false);
    }
  };

  // small components
  const Label = ({ children }) => <div className="text-sm text-gray-500">{children}</div>;
  const Value = ({ children }) => <div className="text-sm text-gray-800">{children}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <ToastContainer position="top-right" />
      <div className="max-w-5xl md:min-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 overflow-hidden">
          {/* header */}
          <div className="bg-white p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-semibold text-gray-700">
                {(form.name && form.name[0]?.toUpperCase()) || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">{form.name || "Your Name"}</h1>
                <p className="text-sm text-gray-500">{form.currentRole || profile?.role || "Professional Title"}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${premium.isPremium ? "bg-yellow-100 text-yellow-700 border border-yellow-200" : "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                    {premium.isPremium ? `Premium • ${premium.plan || ""}` : <a href="/PremiumPlans">{"Free"}</a>}
                  </div>
                  {premium.expiry && <div className="text-xs text-gray-400">Expires: {new Date(premium.expiry).toLocaleDateString()}</div>}
                </div>
              </div>
            </div>

            {/* actions */}
            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={() => (editMode ? handleSave() : setEditMode(true))}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${editMode ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                {editMode ? <><FiSave /> Save</> : <><FiEdit3 /> Edit</>}
              </button>

              {premium.isPremium && (
                <button onClick={() => setShowCancelConfirm(true)} className="px-3 py-2 rounded-full bg-white border text-sm text-gray-700 hover:bg-gray-50">
                  Cancel Premium
                </button>
              )}
            </div>
          </div>

          {/* body */}
          <form onSubmit={handleSave}>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* left card - summary & contact */}
              <div className="md:col-span-1 space-y-4">
                <div className="bg-white border rounded-xl p-4">
                  <Label>Summary</Label>
                  {!editMode && !has(form.summary) ? <Value className="text-gray-400">No summary provided</Value> : editMode ? (
                    <textarea value={form.summary} onChange={(e) => updateField("summary", e.target.value)} rows={4} className="w-full border rounded-md p-2 mt-2" placeholder="Short professional summary" />
                  ) : (
                    <Value>{form.summary}</Value>
                  )}
                </div>

                <div className="bg-white border rounded-xl p-4">
                  <Label>Contact</Label>
                  <div className="mt-3 space-y-3">
                    {/* Email */}
                    {(!editMode && !has(form.email)) ? null : (
                      <div>
                        <Label>Email</Label>
                        {!editMode ? <Value>{form.email}</Value> : <input name="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className="w-full border rounded-md p-2 mt-1" />}
                      </div>
                    )}

                    {/* Phone */}
                    {(!editMode && !has(form.phone)) ? null : (
                      <div>
                        <Label>Phone</Label>
                        {!editMode ? <Value>{form.phone}</Value> : <input name="phone" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full border rounded-md p-2 mt-1" />}
                      </div>
                    )}

                    {/* Website */}
                    {(!editMode && !has(form.website)) ? null : (
                      <div>
                        <Label>Website</Label>
                        {!editMode ? <Value>{form.website}</Value> : <input name="website" value={form.website} onChange={(e) => updateField("website", e.target.value)} className="w-full border rounded-md p-2 mt-1" />}
                      </div>
                    )}

                    {/* Address */}
                    {(!editMode && !has(form.address)) ? null : (
                      <div>
                        <Label>Address</Label>
                        {!editMode ? <Value>{form.address}</Value> : <input name="address" value={form.address} onChange={(e) => updateField("address", e.target.value)} className="w-full border rounded-md p-2 mt-1" />}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white border rounded-xl p-4">
                  <Label>Skills</Label>
                  {!editMode && !has(form.skills) ? <Value className="text-gray-400">No skills listed</Value> : editMode ? <input value={form.skills} onChange={(e) => updateField("skills", e.target.value)} className="w-full border rounded-md p-2 mt-2" placeholder="Comma separated (React, Node...)" /> : <div className="mt-2 flex flex-wrap gap-2">{form.skills.split(",").filter(Boolean).map((s,i)=>(<span key={i} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">{s.trim()}</span>))}</div>}
                </div>
                <div className="bg-white border rounded-xl p-4">
                  <Label>Languages</Label>
                  {!editMode && !has(form.languages) ? <Value className="text-gray-400">No languages choose</Value> : editMode ? <input value={form.languages} onChange={(e) => updateField("languages", e.target.value)} className="w-full border rounded-md p-2 mt-2" placeholder="Comma separated (english, spanish...)" /> : <div className="mt-2 flex flex-wrap gap-2">{form.languages.split(",").filter(Boolean).map((s,i)=>(<span key={i} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">{s.trim()}</span>))}</div>}
                </div>
              </div>

              {/* right card - details */}
              <div className="md:col-span-2 space-y-4">
                {/* Basic info row */}
                <div className="bg-white border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <Label>Full Name</Label>
                    {!editMode ? <Value>{form.name || "—"}</Value> : <input name="name" value={form.name} onChange={(e) => updateField("name", e.target.value)} className="w-full border rounded-md p-2" />}
                  </div>

                  {/* Current Role */}
                  <div>
                    <Label>Current Role</Label>
                    {!editMode ? <Value>{form.currentRole || "—"}</Value> : <input name="currentRole" value={form.currentRole} onChange={(e) => updateField("currentRole", e.target.value)} className="w-full border rounded-md p-2" />}
                  </div>

                  {/* Company */}
                  <div>
                    <Label>Company</Label>
                    {!editMode ? <Value>{form.company || "—"}</Value> : <input name="company" value={form.company} onChange={(e) => updateField("company", e.target.value)} className="w-full border rounded-md p-2" />}
                  </div>

                  {/* Experience years */}
                  <div>
                    <Label>Experience (years)</Label>
                    {!editMode ? <Value>{form.experienceYears || "—"}</Value> : <input name="experienceYears" value={form.experienceYears} onChange={(e) => updateField("experienceYears", e.target.value)} className="w-full border rounded-md p-2" />}
                  </div>
                </div>

                {/* Salary */}
                <div className="bg-white border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Current Salary</Label>
                    {!editMode ? <Value>{form.currentSalary || "—"}</Value> : <input name="currentSalary" value={form.currentSalary} onChange={(e) => updateField("currentSalary", e.target.value)} className="w-full border rounded-md p-2" />}
                  </div>
                  <div>
                    <Label>Expected Salary</Label>
                    {!editMode ? <Value>{form.expectedSalary || "—"}</Value> : <input name="expectedSalary" value={form.expectedSalary} onChange={(e) => updateField("expectedSalary", e.target.value)} className="w-full border rounded-md p-2" />}
                  </div>
                </div>

                {/* Experience list */}
                <div className="bg-white border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <Label>Experience</Label>
                    {editMode && <button type="button" onClick={() => addItem("experience", emptyExperience())} className="flex items-center gap-2 text-sm text-blue-600"><FiPlus /> Add</button>}
                  </div>

                  <div className="space-y-3">
                    {form.experience.map((exp) => (
                      <div key={exp.id} className="border rounded-md p-3">
                        {!editMode ? (
                          <>
                            {has(exp.title) || has(exp.company) ? (
                              <div>
                                <div className="text-sm font-medium text-indigo-700">{exp.title || ""} {exp.title && exp.company ? "—" : ""} <span className="font-normal text-gray-600">{exp.company}</span></div>
                                <div className="text-xs text-gray-400">{exp.start} - {exp.currentlyWorking ? "Present" : (exp.end || "")}</div>
                                {exp.details && <div className="mt-2 text-sm text-gray-700">{exp.details}</div>}
                              </div>
                            ) : null}
                          </>
                        ) : (
                          <div className="space-y-2">
                            <input value={exp.title} onChange={(e) => updateItem("experience", exp.id, "title", e.target.value)} className="w-full border rounded-md p-2" placeholder="Job title" />
                            <input value={exp.company} onChange={(e) => updateItem("experience", exp.id, "company", e.target.value)} className="w-full border rounded-md p-2" placeholder="Company" />
                            <div className="flex gap-2">
                              <input value={exp.start} onChange={(e) => updateItem("experience", exp.id, "start", e.target.value)} className="w-1/2 border rounded-md p-2" placeholder="Start (MM month or YYYY)" />
                              <input value={exp.end} onChange={(e) => updateItem("experience", exp.id, "end", e.target.value)} className="w-1/2 border rounded-md p-2" placeholder="End (MM month or YYYY)" />
                            </div>
                            <textarea value={exp.details} onChange={(e) => updateItem("experience", exp.id, "details", e.target.value)} className="w-full border rounded-md p-2" placeholder="Responsibilities / achievements" />
                            <div className="flex items-center justify-between">
                              <label className="text-sm"><input type="checkbox" checked={exp.currentlyWorking} onChange={(e) => updateItem("experience", exp.id, "currentlyWorking", e.target.checked)} /> Currently Working</label>
                              <button type="button" onClick={() => removeItem("experience", exp.id)} className="text-red-500 flex items-center gap-1 text-sm"><FiTrash2 /> Remove</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education list */}
                <div className="bg-white border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <Label>Education</Label>
                    {editMode && <button type="button" onClick={() => addItem("education", emptyEducation())} className="flex items-center gap-2 text-sm text-blue-600"><FiPlus /> Add</button>}
                  </div>

                  <div className="space-y-3">
                    {form.education.map((edu) => (
                      <div key={edu.id} className="border rounded-md p-3">
                        {!editMode ? (
                          <>
                            {has(edu.degree) || has(edu.institute) ? (
                              <div>
                                <div className="text-sm font-medium text-purple-700">{edu.degree} <span className="font-normal text-gray-600">— {edu.institute}</span></div>
                                <div className="text-xs text-gray-400">{edu.start} - {edu.end}</div>
                              </div>
                            ) : null}
                          </>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <input value={edu.degree} onChange={(e) => updateItem("education", edu.id, "degree", e.target.value)} className="border rounded-md p-2" placeholder="Degree (B.Tech, MBA)" />
                            <input value={edu.institute} onChange={(e) => updateItem("education", edu.id, "institute", e.target.value)} className="border rounded-md p-2" placeholder="Institute" />
                            <div className="flex gap-2">
                              <input value={edu.start} onChange={(e) => updateItem("education", edu.id, "start", e.target.value)} className="w-1/2 border rounded-md p-2" placeholder="Start year" />
                              <input value={edu.end} onChange={(e) => updateItem("education", edu.id, "end", e.target.value)} className="w-1/2 border rounded-md p-2" placeholder="End year" />
                            </div>
                            <div className="mt-2">
                              <button type="button" onClick={() => removeItem("education", edu.id)} className="text-red-500 flex items-center gap-1 text-sm"><FiTrash2 /> Remove</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="bg-white border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <Label>Projects</Label>
                    {editMode && <button type="button" onClick={() => addItem("projects", emptyProject())} className="flex items-center gap-2 text-sm text-blue-600"><FiPlus /> Add</button>}
                  </div>

                  <div className="space-y-3">
                    {form.projects.map((p) => (
                      <div key={p.id} className="border rounded-md p-3">
                        {!editMode ? (
                          <>
                            {has(p.title) ? <div className="text-sm font-medium text-indigo-700">{p.title}</div> : null}
                            {p.description && <div className="text-sm text-gray-700 mt-1">{p.description}</div>}
                            {p.link && <a href={p.link} className="text-sm text-blue-600 mt-1 inline-block">{p.link}</a>}
                          </>
                        ) : (
                          <div className="space-y-2">
                            <input value={p.title} onChange={(e) => updateItem("projects", p.id, "title", e.target.value)} className="w-full border rounded-md p-2" placeholder="Project title" />
                            <input value={p.link} onChange={(e) => updateItem("projects", p.id, "link", e.target.value)} className="w-full border rounded-md p-2" placeholder="Project link (optional)" />
                            <textarea value={p.description} onChange={(e) => updateItem("projects", p.id, "description", e.target.value)} className="w-full border rounded-md p-2" placeholder="Short description" />
                            <div className="flex justify-end">
                              <button type="button" onClick={() => removeItem("projects", p.id)} className="text-red-500 flex items-center gap-1 text-sm"><FiTrash2 /> Remove</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Cancel premium modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Cancel Premium</h3>
              <button onClick={() => setShowCancelConfirm(false)} className="text-gray-500"><FiX /></button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to cancel your premium plan? You'll lose premium features.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowCancelConfirm(false)} className="px-4 py-2 rounded-md border">No</button>
              <button onClick={handleCancelPremium} className="px-4 py-2 rounded-md bg-red-600 text-white">Yes, cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
