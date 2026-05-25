import { Megaphone } from "lucide-react";
import { notices } from "../data/school.js";

export default function Notices() {
  return (
    <div className="space-y-6">
      <section className="panel p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">Notice Board</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Announcements and upcoming reminders.</p>
          </div>
          <Megaphone className="text-teal-600" size={22} />
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {notices.map((notice) => (
          <article key={notice.id} className="panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold">{notice.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{notice.audience}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${notice.priority === "High" ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>{notice.priority}</span>
            </div>
            <p className="mt-5 text-sm font-semibold text-teal-700 dark:text-teal-300">{notice.date}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
