import { ClipboardCheck, Plus } from "lucide-react";
import { useState } from "react";
import { admissions } from "../data/school.js";
import { grades } from "../data/students.js";

const ADMISSIONS_KEY = "student-dashboard-admissions";
const blankApplicant = {
  name: "",
  applyingFor: "Grade 7",
  guardian: "",
  status: "Pending"
};

export default function Admissions() {
  const [applicantList, setApplicantList] = useState(() => {
    const saved = localStorage.getItem(ADMISSIONS_KEY);
    return saved ? JSON.parse(saved) : admissions;
  });
  const [formData, setFormData] = useState(blankApplicant);

  function updateForm(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextApplicants = [{ ...formData, id: Date.now() }, ...applicantList];

    setApplicantList(nextApplicants);
    localStorage.setItem(ADMISSIONS_KEY, JSON.stringify(nextApplicants));
    setFormData(blankApplicant);
  }

  return (
    <div className="space-y-6">
      <form className="panel p-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Add Admission</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Applicants are saved in this browser.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-1 text-sm font-semibold">
            <span>Applicant Name</span>
            <input className="field" value={formData.name} onChange={(event) => updateForm("name", event.target.value)} required placeholder="Student name" />
          </label>
          <label className="space-y-1 text-sm font-semibold">
            <span>Applying For</span>
            <select className="field" value={formData.applyingFor} onChange={(event) => updateForm("applyingFor", event.target.value)}>
              {grades.map((grade) => (
                <option key={grade}>{grade}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm font-semibold">
            <span>Guardian</span>
            <input className="field" value={formData.guardian} onChange={(event) => updateForm("guardian", event.target.value)} required placeholder="Guardian name" />
          </label>
          <label className="space-y-1 text-sm font-semibold">
            <span>Status</span>
            <select className="field" value={formData.status} onChange={(event) => updateForm("status", event.target.value)}>
              <option>Pending</option>
              <option>Review</option>
              <option>Approved</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="inline-flex h-11 items-center gap-2 rounded-lg bg-teal-600 px-4 text-sm font-bold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/40" type="submit">
            <Plus size={17} />
            Add Applicant
          </button>
        </div>
      </form>

      <section className="panel p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">Admissions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">New applicant tracking for the current session.</p>
          </div>
          <ClipboardCheck className="text-teal-600" size={22} />
        </div>
      </section>
      <section className="panel overflow-hidden">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            <tr><th className="px-4 py-3">Applicant</th><th className="px-4 py-3">Applying For</th><th className="px-4 py-3">Guardian</th><th className="px-4 py-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {applicantList.map((applicant) => (
              <tr key={applicant.id}>
                <td className="px-4 py-4 font-bold">{applicant.name}</td>
                <td className="px-4 py-4">{applicant.applyingFor}</td>
                <td className="px-4 py-4">{applicant.guardian}</td>
                <td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${applicant.status === "Approved" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"}`}>{applicant.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
