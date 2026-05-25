import { KeyRound, ShieldCheck, UserRound } from "lucide-react";

export default function Profile() {
  return (
    <div className="space-y-6">
      <section className="panel p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-teal-600 text-white">
            <UserRound size={30} />
          </div>
          <div>
            <h2 className="text-xl font-bold">School Administrator</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">admin@edupanel.edu</p>
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <article className="panel p-5"><ShieldCheck className="text-emerald-600" size={22} /><h3 className="mt-3 font-bold">Admin Access</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Logged in with frontend-only session storage.</p></article>
        <article className="panel p-5"><KeyRound className="text-amber-600" size={22} /><h3 className="mt-3 font-bold">Demo Password</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Password changes need a backend to be secure.</p></article>
      </section>
    </div>
  );
}
