import { Edit3, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import StudentForm from "../components/StudentForm.jsx";
import { grades } from "../data/students.js";

export default function Students({ students, actions }) {
  const [query, setQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [editing, setEditing] = useState(null);
  const [formError, setFormError] = useState("");

  const filteredStudents = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return students.filter((student) => {
      const matchesGrade = selectedGrade === "All Grades" || student.grade === selectedGrade;
      const matchesSearch =
        !needle ||
        [student.name, student.roll, student.grade, student.section, student.guardian]
          .join(" ")
          .toLowerCase()
          .includes(needle);

      return matchesGrade && matchesSearch;
    });
  }, [query, selectedGrade, students]);

  function handleSubmit(student) {
    const duplicateRoll = students.some(
      (existingStudent) =>
        existingStudent.id !== student.id &&
        existingStudent.grade === student.grade &&
        existingStudent.roll.trim().toLowerCase() === student.roll.trim().toLowerCase()
    );

    if (duplicateRoll) {
      setFormError(`Roll number ${student.roll} already exists in ${student.grade}.`);
      return;
    }

    setFormError("");

    if (editing) {
      actions.updateStudent(student);
      setEditing(null);
      return;
    }

    actions.addStudent(student);
  }

  return (
    <div className="space-y-6">
      <StudentForm
        student={editing}
        error={formError}
        onSubmit={handleSubmit}
        onCancel={() => {
          setEditing(null);
          setFormError("");
        }}
      />

      <section className="panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold">Student List</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Class records and guardian details.</p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <select
              className="field sm:w-40"
              value={selectedGrade}
              onChange={(event) => setSelectedGrade(event.target.value)}
              aria-label="Filter by grade"
            >
              <option>All Grades</option>
              {grades.map((grade) => (
                <option key={grade}>{grade}</option>
              ))}
            </select>
            <label className="flex h-11 w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 sm:w-80 dark:border-slate-700 dark:bg-slate-900">
              <Search size={17} className="text-slate-400" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search students"
              />
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Attendance</th>
                <th className="px-4 py-3">Guardian</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 font-bold text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
                        {student.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-bold">{student.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{student.roll}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {student.grade} - {student.section}
                  </td>
                  <td className="px-4 py-4">{student.gender}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 rounded-full bg-slate-100 dark:bg-slate-800">
                        <div className="h-2 rounded-full bg-teal-600" style={{ width: `${student.attendance}%` }} />
                      </div>
                      <span className="font-semibold">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p>{student.guardian}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{student.phone}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        student.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        className="icon-button"
                        onClick={() => {
                          setEditing(student);
                          setFormError("");
                        }}
                        aria-label={`Edit ${student.name}`}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button className="icon-button" onClick={() => actions.deleteStudent(student.id)} aria-label={`Delete ${student.name}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">No student records match your search.</div>
        )}
      </section>
    </div>
  );
}
