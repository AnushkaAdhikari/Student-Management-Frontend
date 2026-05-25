import { CreditCard, ReceiptText, WalletCards } from "lucide-react";
import { feeRecords } from "../data/school.js";

export default function Fees({ students }) {
  const rows = feeRecords.map((record) => ({ ...record, student: students.find((student) => student.roll === record.roll) }));
  const paid = rows.filter((row) => row.status === "Paid").reduce((sum, row) => sum + row.amount, 0);
  const due = rows.filter((row) => row.status !== "Paid").reduce((sum, row) => sum + row.amount, 0);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="panel p-5"><ReceiptText className="text-teal-600" size={22} /><p className="mt-3 text-3xl font-bold">{rows.length}</p><p className="text-sm text-slate-500 dark:text-slate-400">Fee records</p></article>
        <article className="panel p-5"><CreditCard className="text-emerald-600" size={22} /><p className="mt-3 text-3xl font-bold">Rs. {paid}</p><p className="text-sm text-slate-500 dark:text-slate-400">Collected</p></article>
        <article className="panel p-5"><WalletCards className="text-amber-600" size={22} /><p className="mt-3 text-3xl font-bold">Rs. {due}</p><p className="text-sm text-slate-500 dark:text-slate-400">Pending</p></article>
      </section>

      <section className="panel overflow-hidden">
        <div className="border-b border-slate-200 p-5 dark:border-slate-800">
          <h2 className="text-lg font-bold">Fee Collection</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly fee tracking with mock records.</p>
        </div>
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            <tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Month</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Due Date</th><th className="px-4 py-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {rows.map((row) => (
              <tr key={`${row.roll}-${row.month}`}>
                <td className="px-4 py-4 font-bold">{row.student?.name || row.roll}</td>
                <td className="px-4 py-4">{row.month}</td>
                <td className="px-4 py-4">Rs. {row.amount}</td>
                <td className="px-4 py-4">{row.dueDate}</td>
                <td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${row.status === "Paid" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"}`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
