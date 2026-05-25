import { GenderChart, StudentsByGradeChart } from "../components/Charts.jsx";
import { getClassStats } from "../utils/stats.js";

export default function Charts({ students }) {
  const classStats = getClassStats(students);

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="panel p-5">
          <h2 className="text-lg font-bold">Students by Grade</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Enrollment strength across grades.</p>
          <StudentsByGradeChart students={students} />
        </div>
        <div className="panel p-5">
          <h2 className="text-lg font-bold">Boys vs Girls</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Current enrollment split.</p>
          <GenderChart students={students} />
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="text-lg font-bold">Attendance by Class</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {classStats.map((item) => (
            <article key={item.grade} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.grade}</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <p className="text-3xl font-bold">{item.attendance}%</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.students} students</p>
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-2 rounded-full bg-teal-600" style={{ width: `${item.attendance}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
