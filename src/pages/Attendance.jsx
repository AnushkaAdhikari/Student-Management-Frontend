import { CalendarDays, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { grades } from "../data/students.js";

export default function Attendance({ students }) {
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const filteredStudents = selectedGrade === "All Grades" ? students : students.filter((student) => student.grade === selectedGrade);
  const summary = useMemo(() => {
    const present = filteredStudents.filter((student) => student.attendance >= 85).length;
    const late = filteredStudents.filter((student) => student.attendance >= 75 && student.attendance < 85).length;
    const absent = filteredStudents.length - present - late;
    return { present, late, absent };
  }, [filteredStudents]);

  const cards = [
    { label: "Present", value: summary.present, icon: CheckCircle2, color: "text-emerald-600" },
    { label: "Late", value: summary.late, icon: Clock, color: "text-amber-600" },
    { label: "Needs Review", value: summary.absent, icon: XCircle, color: "text-rose-600" }
  ];

  return (
    <div className="space-y-6">
      <section className="panel p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Daily Attendance</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Frontend-only attendance status by class.</p>
          </div>
          <div className="flex gap-2">
            <div className="hidden h-11 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm text-slate-500 sm:flex dark:border-slate-700 dark:text-slate-400">
              <CalendarDays size={17} /> May 25, 2026
            </div>
            <select className="field sm:w-40" value={selectedGrade} onChange={(event) => setSelectedGrade(event.target.value)}>
              <option>All Grades</option>
              {grades.map((grade) => <option key={grade}>{grade}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="panel p-5">
              <Icon className={card.color} size={22} />
              <p className="mt-3 text-3xl font-bold">{card.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
            </article>
          );
        })}
      </section>

      <section className="panel overflow-hidden">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            <tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Class</th><th className="px-4 py-3">Attendance</th><th className="px-4 py-3">Today</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-4 font-bold">{student.name}</td>
                <td className="px-4 py-4">{student.grade} - {student.section}</td>
                <td className="px-4 py-4">{student.attendance}%</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${student.attendance >= 85 ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"}`}>
                    {student.attendance >= 85 ? "Present" : "Review"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
