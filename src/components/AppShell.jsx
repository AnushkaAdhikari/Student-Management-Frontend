import { NavLink, useLocation } from "react-router-dom";
import {
  Bell,
  BarChart3,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  Search,
  Sun,
  UserRound,
  Users,
  UsersRound,
  X
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: Users },
  { to: "/teachers", label: "Teachers", icon: GraduationCap },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/fees", label: "Fees", icon: CreditCard },
  { to: "/results", label: "Results", icon: FileText },
  { to: "/timetable", label: "Timetable", icon: CalendarDays },
  { to: "/notices", label: "Notices", icon: Bell },
  { to: "/reports", label: "Reports", icon: ClipboardCheck },
  { to: "/guardians", label: "Guardians", icon: UsersRound },
  { to: "/admissions", label: "Admissions", icon: ClipboardCheck },
  { to: "/library", label: "Library", icon: BookOpen },
  { to: "/charts", label: "Charts", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/settings", label: "Settings", icon: Settings }
];

const titles = {
  "/": "Dashboard",
  "/students": "Student Management",
  "/teachers": "Teachers",
  "/attendance": "Attendance",
  "/fees": "Fees",
  "/results": "Exam Results",
  "/timetable": "Timetable",
  "/notices": "Notice Board",
  "/reports": "Reports",
  "/guardians": "Parents & Guardians",
  "/admissions": "Admissions",
  "/library": "Library",
  "/charts": "Charts",
  "/profile": "Profile",
  "/settings": "Settings"
};

export default function AppShell({ children, darkMode, onToggleTheme, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 transform flex-col border-r border-slate-200 bg-white transition lg:translate-x-0 dark:border-slate-800 dark:bg-slate-900 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-600 text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-base font-bold">EduPanel</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Student dashboard</p>
            </div>
          </div>
          <button className="icon-button lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={19} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="m-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm font-semibold">Current Term</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Academic records for grades 7 through 10.
          </p>
        </div>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button className="icon-button lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <Menu size={19} />
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase text-teal-600 dark:text-teal-300">
                School Admin
              </p>
              <h1 className="truncate text-xl font-bold sm:text-2xl">{titles[location.pathname] || "Dashboard"}</h1>
            </div>
            <div className="hidden h-10 w-64 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500 md:flex dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              <Search size={17} />
              2026 Academic Session
            </div>
            <button className="icon-button" onClick={onToggleTheme} aria-label="Toggle dark mode">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="icon-button" onClick={onLogout} aria-label="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
