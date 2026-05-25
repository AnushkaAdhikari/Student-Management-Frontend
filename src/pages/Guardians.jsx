import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { grades } from "../data/students.js";

export default function Guardians({ students }) {
  const [selectedGrade, setSelectedGrade] = useState("Grade 7");
  const filteredStudents = students.filter((student) => student.grade === selectedGrade);

  return (
    <div className="space-y-6">
      <section className="panel p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Parents & Guardians</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{selectedGrade} guardian contacts linked to student profiles.</p>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="hidden text-teal-600 sm:block" size={22} />
            <select className="field sm:w-40" value={selectedGrade} onChange={(event) => setSelectedGrade(event.target.value)}>
              {grades.map((grade) => (
                <option key={grade}>{grade}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="panel overflow-hidden">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Roll</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Guardian</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <td className="px-4 py-4 font-bold">{student.name}</td>
                <td className="px-4 py-4">{student.roll}</td>
                <td className="px-4 py-4">{student.grade} - {student.section}</td>
                <td className="px-4 py-4">{student.guardian}</td>
                <td className="px-4 py-4">{student.phone}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${student.status === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"}`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">No guardians found for {selectedGrade}.</div>
        )}
      </section>
    </div>
  );
}
