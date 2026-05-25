import { Award, BookOpenCheck, Percent } from "lucide-react";
import { examResults } from "../data/school.js";

function gradeFromAverage(average) {
  if (average >= 90) return "A+";
  if (average >= 80) return "A";
  if (average >= 70) return "B+";
  return "B";
}

export default function Results({ students }) {
  const rows = examResults.map((result) => {
    const average = Math.round((result.math + result.science + result.english) / 3);
    return { ...result, average, grade: gradeFromAverage(average), student: students.find((student) => student.roll === result.roll) };
  });
  const classAverage = Math.round(rows.reduce((sum, row) => sum + row.average, 0) / rows.length);
  const topResult = rows.reduce((best, row) => (row.average > best.average ? row : best), rows[0]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="panel p-5"><BookOpenCheck className="text-teal-600" size={22} /><p className="mt-3 text-3xl font-bold">Mid Term</p><p className="text-sm text-slate-500 dark:text-slate-400">Current exam</p></article>
        <article className="panel p-5"><Percent className="text-blue-600" size={22} /><p className="mt-3 text-3xl font-bold">{classAverage}%</p><p className="text-sm text-slate-500 dark:text-slate-400">Class average</p></article>
        <article className="panel p-5"><Award className="text-amber-600" size={22} /><p className="mt-3 text-3xl font-bold">{topResult.student?.name}</p><p className="text-sm text-slate-500 dark:text-slate-400">Top performer</p></article>
      </section>

      <section className="panel overflow-hidden">
        <div className="border-b border-slate-200 p-5 dark:border-slate-800">
          <h2 className="text-lg font-bold">Exam Results</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Subject marks and calculated grades.</p>
        </div>
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            <tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Math</th><th className="px-4 py-3">Science</th><th className="px-4 py-3">English</th><th className="px-4 py-3">Average</th><th className="px-4 py-3">Grade</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {rows.map((row) => (
              <tr key={row.roll}>
                <td className="px-4 py-4 font-bold">{row.student?.name || row.roll}</td>
                <td className="px-4 py-4">{row.math}</td>
                <td className="px-4 py-4">{row.science}</td>
                <td className="px-4 py-4">{row.english}</td>
                <td className="px-4 py-4">{row.average}%</td>
                <td className="px-4 py-4"><span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">{row.grade}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
