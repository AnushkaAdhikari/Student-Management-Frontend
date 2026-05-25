import { Activity, Percent, UserRound, UsersRound } from "lucide-react";
import { GenderChart, StudentsByGradeChart } from "../components/Charts.jsx";
import { getClassStats, getDashboardStats } from "../utils/stats.js";

export default function Dashboard({ students }) {
  const stats = getDashboardStats(students);
  const classStats = getClassStats(students);
  const topStudents = [...students].sort((a, b) => b.attendance - a.attendance).slice(0, 3);

  const cards = [
    { label: "Total Students", value: stats.total, icon: UsersRound, color: "bg-teal-600" },
    { label: "Total Boys", value: stats.boys, icon: UserRound, color: "bg-blue-600" },
    { label: "Total Girls", value: stats.girls, icon: UserRound, color: "bg-pink-600" },
    { label: "Attendance", value: `${stats.attendance}%`, icon: Percent, color: "bg-amber-500" }
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="panel p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{card.label}</p>
                  <p className="mt-2 text-3xl font-bold">{card.value}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg text-white ${card.color}`}>
                  <Icon size={21} />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Students by Grade</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Class strength across the school.</p>
            </div>
            <Activity className="text-teal-600" size={20} />
          </div>
          <StudentsByGradeChart students={students} />
        </div>
        <div className="panel p-5">
          <h2 className="text-lg font-bold">Boys vs Girls</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Current enrollment split.</p>
          <GenderChart students={students} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="panel overflow-hidden">
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-lg font-bold">Class Statistics</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Grade totals and average attendance.</p>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {classStats.map((item) => (
              <div key={item.grade} className="grid grid-cols-3 items-center gap-3 p-4 text-sm">
                <span className="font-bold">{item.grade}</span>
                <span className="text-slate-500 dark:text-slate-400">{item.students} students</span>
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-teal-600" style={{ width: `${item.attendance}%` }} />
                  </div>
                  <span className="w-10 text-right font-semibold">{item.attendance}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-lg font-bold">Profile Cards</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Top attendance performers this term.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {topStudents.map((student) => (
              <article key={student.id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 font-bold text-teal-700 dark:bg-slate-800 dark:text-teal-300">
                    {student.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold">{student.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {student.grade} - Section {student.section}
                    </p>
                  </div>
                  <span className="ml-auto rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
                    {student.attendance}%
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
