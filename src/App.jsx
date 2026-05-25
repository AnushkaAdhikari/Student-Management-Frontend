import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppShell from "./components/AppShell.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Students from "./pages/Students.jsx";
import Charts from "./pages/Charts.jsx";
import Login from "./pages/Login.jsx";
import Teachers from "./pages/Teachers.jsx";
import Attendance from "./pages/Attendance.jsx";
import Fees from "./pages/Fees.jsx";
import Results from "./pages/Results.jsx";
import Timetable from "./pages/Timetable.jsx";
import Notices from "./pages/Notices.jsx";
import Reports from "./pages/Reports.jsx";
import Guardians from "./pages/Guardians.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";
import Admissions from "./pages/Admissions.jsx";
import Library from "./pages/Library.jsx";
import { initialStudents } from "./data/students.js";

const STORAGE_KEY = "student-dashboard-records";
const AUTH_KEY = "student-dashboard-admin-auth";
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};

function ProtectedApp({ children, isAuthenticated }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialStudents;
  });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(AUTH_KEY) === "true");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const actions = useMemo(
    () => ({
      addStudent(student) {
        setStudents((current) => [{ ...student, id: Date.now() }, ...current]);
      },
      updateStudent(updatedStudent) {
        setStudents((current) =>
          current.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
        );
      },
      deleteStudent(id) {
        setStudents((current) => current.filter((student) => student.id !== id));
      }
    }),
    []
  );

  function handleLogin(credentials) {
    const matchesAdmin =
      credentials.username.trim().toLowerCase() === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password;

    if (!matchesAdmin) {
      return false;
    }

    localStorage.setItem(AUTH_KEY, "true");
    setIsAuthenticated(true);
    return true;
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Login darkMode={darkMode} onToggleTheme={() => setDarkMode((value) => !value)} onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/*"
        element={
          <ProtectedApp isAuthenticated={isAuthenticated}>
            <AppShell darkMode={darkMode} onToggleTheme={() => setDarkMode((value) => !value)} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Dashboard students={students} />} />
                <Route path="/students" element={<Students students={students} actions={actions} />} />
                <Route path="/charts" element={<Charts students={students} />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/attendance" element={<Attendance students={students} />} />
                <Route path="/fees" element={<Fees students={students} />} />
                <Route path="/results" element={<Results students={students} />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/notices" element={<Notices />} />
                <Route path="/reports" element={<Reports students={students} />} />
                <Route path="/guardians" element={<Guardians students={students} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/library" element={<Library students={students} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppShell>
          </ProtectedApp>
        }
      />
    </Routes>
  );
}
