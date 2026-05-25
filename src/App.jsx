import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Students from "./pages/Students.jsx";
import Charts from "./pages/Charts.jsx";
import { initialStudents } from "./data/students.js";

const STORAGE_KEY = "student-dashboard-records";

export default function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialStudents;
  });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

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

  return (
    <AppShell darkMode={darkMode} onToggleTheme={() => setDarkMode((value) => !value)}>
      <Routes>
        <Route path="/" element={<Dashboard students={students} />} />
        <Route path="/students" element={<Students students={students} actions={actions} />} />
        <Route path="/charts" element={<Charts students={students} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
