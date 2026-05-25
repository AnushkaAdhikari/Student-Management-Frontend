import { Eye, EyeOff, GraduationCap, Lock, LogIn, Moon, Sun, UserRound } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login({ darkMode, onToggleTheme, onLogin }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    const loggedIn = onLogin(credentials);
    if (!loggedIn) {
      setError("Invalid admin username or password.");
      return;
    }

    setError("");
    navigate(redirectTo, { replace: true });
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-600 text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-base font-bold">EduPanel</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Student dashboard</p>
            </div>
          </div>
          <button className="icon-button" onClick={onToggleTheme} aria-label="Toggle dark mode">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <section className="flex flex-1 items-center justify-center py-10">
          <form className="panel p-6" onSubmit={handleSubmit}>
            <div>
              <h2 className="text-2xl font-bold">Login</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Use the admin account to continue.</p>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold">Username</span>
                <span className="mt-2 flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-500 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                  <UserRound size={17} />
                  <input
                    className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-slate-100"
                    value={credentials.username}
                    onChange={(event) => {
                      setCredentials((current) => ({ ...current, username: event.target.value }));
                      setError("");
                    }}
                    placeholder="admin"
                    autoComplete="username"
                  />
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-semibold">Password</span>
                <span className="mt-2 flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-500 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                  <Lock size={17} />
                  <input
                    className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-slate-100"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(event) => {
                      setCredentials((current) => ({ ...current, password: event.target.value }));
                      setError("");
                    }}
                    placeholder="admin123"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </span>
              </label>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                {error}
              </div>
            )}

            <div className="mt-5 rounded-lg bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Demo credentials: admin / admin123
            </div>

            <button
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 text-sm font-bold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              type="submit"
            >
              <LogIn size={18} />
              Sign in
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
