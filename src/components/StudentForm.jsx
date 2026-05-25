import { Save, X } from "lucide-react";
import { grades, sections } from "../data/students.js";

const blankStudent = {
  name: "",
  gender: "Boy",
  grade: "Grade 7",
  section: "A",
  roll: "",
  attendance: 90,
  phone: "",
  guardian: "",
  status: "Active"
};

export default function StudentForm({ student, error, onSubmit, onCancel }) {
  const formData = student || blankStudent;

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    onSubmit({
      ...formData,
      ...data,
      attendance: Number(data.attendance)
    });
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">{student ? "Edit Student" : "Add Student"}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Keep profile and attendance data current.</p>
        </div>
        {student && (
          <button type="button" className="icon-button" onClick={onCancel} aria-label="Cancel editing">
            <X size={17} />
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-1 text-sm font-semibold">
          <span>Name</span>
          <input className="field" name="name" defaultValue={formData.name} required placeholder="Student name" />
        </label>
        <label className="space-y-1 text-sm font-semibold">
          <span>Gender</span>
          <select className="field" name="gender" defaultValue={formData.gender}>
            <option>Boy</option>
            <option>Girl</option>
          </select>
        </label>
        <label className="space-y-1 text-sm font-semibold">
          <span>Grade</span>
          <select className="field" name="grade" defaultValue={formData.grade}>
            {grades.map((grade) => (
              <option key={grade}>{grade}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm font-semibold">
          <span>Section</span>
          <select className="field" name="section" defaultValue={formData.section}>
            {sections.map((section) => (
              <option key={section}>{section}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm font-semibold">
          <span>Roll</span>
          <input className="field" name="roll" defaultValue={formData.roll} required placeholder="8A-01" />
        </label>
        <label className="space-y-1 text-sm font-semibold">
          <span>Attendance %</span>
          <input className="field" name="attendance" type="number" min="0" max="100" defaultValue={formData.attendance} required />
        </label>
        <label className="space-y-1 text-sm font-semibold">
          <span>Phone</span>
          <input className="field" name="phone" defaultValue={formData.phone} placeholder="980-000-0000" />
        </label>
        <label className="space-y-1 text-sm font-semibold">
          <span>Guardian</span>
          <input className="field" name="guardian" defaultValue={formData.guardian} placeholder="Guardian name" />
        </label>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="submit"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-teal-600 px-4 text-sm font-bold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
        >
          <Save size={17} />
          {student ? "Save Changes" : "Add Student"}
        </button>
      </div>
    </form>
  );
}
