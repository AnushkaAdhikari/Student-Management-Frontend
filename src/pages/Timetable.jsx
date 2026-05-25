import { Clock3 } from "lucide-react";
import { useState } from "react";
import { timetableByGrade } from "../data/school.js";
import { grades } from "../data/students.js";

export default function Timetable() {
  const [selectedGrade, setSelectedGrade] = useState("Grade 7");
  const timetable = timetableByGrade[selectedGrade] || [];

  return (
    <div className="space-y-6">
      <section className="panel p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Weekly Timetable</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{selectedGrade} class routine.</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="hidden text-teal-600 sm:block" size={22} />
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
            <tr><th className="px-4 py-3">Day</th><th className="px-4 py-3">Period 1</th><th className="px-4 py-3">Period 2</th><th className="px-4 py-3">Period 3</th><th className="px-4 py-3">Period 4</th><th className="px-4 py-3">Period 5</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {timetable.map((day) => (
              <tr key={day.day}>
                <td className="px-4 py-4 font-bold">{day.day}</td>
                <td className="px-4 py-4">{day.p1}</td>
                <td className="px-4 py-4">{day.p2}</td>
                <td className="px-4 py-4">{day.p3}</td>
                <td className="px-4 py-4">{day.p4}</td>
                <td className="px-4 py-4">{day.p5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
