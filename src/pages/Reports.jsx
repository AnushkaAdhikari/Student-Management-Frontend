import { FileText, Printer } from "lucide-react";
import { getClassStats, getDashboardStats } from "../utils/stats.js";

export default function Reports({ students }) {
  const stats = getDashboardStats(students);
  const classStats = getClassStats(students);

  return (
    <div className="space-y-6">
      <section className="panel p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Reports</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Printable frontend summaries for school records.</p>
          </div>
          <button className="inline-flex h-11 items-center gap-2 rounded-lg bg-teal-600 px-4 text-sm font-bold text-white transition hover:bg-teal-700">
            <Printer size={17} /> Print
          </button>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-4">
        <article className="panel p-5"><FileText className="text-teal-600" size={22} /><p className="mt-3 text-3xl font-bold">{stats.total}</p><p className="text-sm text-slate-500 dark:text-slate-400">Students</p></article>
        <article className="panel p-5"><p className="text-3xl font-bold">{stats.boys}</p><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Boys</p></article>
        <article className="panel p-5"><p className="text-3xl font-bold">{stats.girls}</p><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Girls</p></article>
        <article className="panel p-5"><p className="text-3xl font-bold">{stats.attendance}%</p><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Attendance</p></article>
      </section>
      <section className="panel p-5">
        <h3 className="font-bold">Class Summary</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {classStats.map((item) => (
            <article key={item.grade} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <p className="font-bold">{item.grade}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.students} students</p>
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
