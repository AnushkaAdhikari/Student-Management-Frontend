import { BookOpen, Plus } from "lucide-react";
import { useState } from "react";
import { libraryIssues } from "../data/school.js";

const LIBRARY_KEY = "student-dashboard-library-issues";
const today = new Date().toISOString().slice(0, 10);

export default function Library({ students }) {
  const [issueList, setIssueList] = useState(() => {
    const saved = localStorage.getItem(LIBRARY_KEY);
    return saved ? JSON.parse(saved) : libraryIssues;
  });
  const [formData, setFormData] = useState({
    roll: students[0]?.roll || "",
    book: "",
    issueDate: today,
    dueDate: today,
    status: "Issued"
  });
  const rows = issueList.map((issue) => ({ ...issue, student: students.find((student) => student.roll === issue.roll) }));

  function updateForm(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextIssues = [{ ...formData, id: Date.now() }, ...issueList];

    setIssueList(nextIssues);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(nextIssues));
    setFormData({
      roll: students[0]?.roll || "",
      book: "",
      issueDate: today,
      dueDate: today,
      status: "Issued"
    });
  }

  return (
    <div className="space-y-6">
      <form className="panel p-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Add Book</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Issued books are saved in this browser.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="space-y-1 text-sm font-semibold">
            <span>Student</span>
            <select className="field" value={formData.roll} onChange={(event) => updateForm("roll", event.target.value)}>
              {students.map((student) => (
                <option key={student.id} value={student.roll}>{student.name} ({student.roll})</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm font-semibold">
            <span>Book</span>
            <input className="field" value={formData.book} onChange={(event) => updateForm("book", event.target.value)} required placeholder="Book title" />
          </label>
          <label className="space-y-1 text-sm font-semibold">
            <span>Issue Date</span>
            <input className="field" type="date" value={formData.issueDate} onChange={(event) => updateForm("issueDate", event.target.value)} required />
          </label>
          <label className="space-y-1 text-sm font-semibold">
            <span>Due Date</span>
            <input className="field" type="date" value={formData.dueDate} onChange={(event) => updateForm("dueDate", event.target.value)} required />
          </label>
          <label className="space-y-1 text-sm font-semibold">
            <span>Status</span>
            <select className="field" value={formData.status} onChange={(event) => updateForm("status", event.target.value)}>
              <option>Issued</option>
              <option>Returned</option>
              <option>Overdue</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="inline-flex h-11 items-center gap-2 rounded-lg bg-teal-600 px-4 text-sm font-bold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/40" type="submit">
            <Plus size={17} />
            Add Book
          </button>
        </div>
      </form>

      <section className="panel p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">Library</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Issued books, due dates, and return status.</p>
          </div>
          <BookOpen className="text-teal-600" size={22} />
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {rows.map((issue) => (
          <article key={issue.id || `${issue.roll}-${issue.book}`} className="panel p-5">
            <h3 className="font-bold">{issue.book}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{issue.student?.name || issue.roll}</p>
            <div className="mt-4 space-y-2 text-sm">
              <p>Issued: {issue.issueDate}</p>
              <p>Due: {issue.dueDate}</p>
            </div>
            <span className={`mt-4 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${issue.status === "Overdue" ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300" : "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300"}`}>{issue.status}</span>
          </article>
        ))}
      </section>
    </div>
  );
}
