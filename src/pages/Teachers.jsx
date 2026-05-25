import { Edit3, Mail, Phone, Plus, Save, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { teachers } from "../data/school.js";
import { grades, sections } from "../data/students.js";

const TEACHERS_KEY = "student-dashboard-teachers";
const classTeacherOptions = grades.flatMap((grade) => sections.map((section) => `${grade} ${section}`));
const blankTeacher = {
  name: "",
  subject: "",
  classTeacher: classTeacherOptions[0],
  phone: "",
  status: "Active"
};

export default function Teachers() {
  const [query, setQuery] = useState("");
  const [teacherList, setTeacherList] = useState(() => {
    const saved = localStorage.getItem(TEACHERS_KEY);
    return saved ? JSON.parse(saved) : teachers;
  });
  const [formData, setFormData] = useState(blankTeacher);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const filteredTeachers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return teacherList.filter((teacher) => Object.values(teacher).join(" ").toLowerCase().includes(needle));
  }, [query, teacherList]);

  function updateForm(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingTeacher) {
      const nextTeachers = teacherList.map((teacher) =>
        teacher.id === editingTeacher.id ? { ...formData, id: editingTeacher.id } : teacher
      );

      setTeacherList(nextTeachers);
      localStorage.setItem(TEACHERS_KEY, JSON.stringify(nextTeachers));
      setEditingTeacher(null);
      setFormData(blankTeacher);
      return;
    }

    const newTeacher = {
      ...formData,
      id: Date.now()
    };
    const nextTeachers = [newTeacher, ...teacherList];

    setTeacherList(nextTeachers);
    localStorage.setItem(TEACHERS_KEY, JSON.stringify(nextTeachers));
    setFormData(blankTeacher);
  }

  function handleEdit(teacher) {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      subject: teacher.subject,
      classTeacher: classTeacherOptions.includes(teacher.classTeacher) ? teacher.classTeacher : classTeacherOptions[0],
      phone: teacher.phone,
      status: teacher.status
    });
  }

  function handleCancelEdit() {
    setEditingTeacher(null);
    setFormData(blankTeacher);
  }

  function handleDelete(id) {
    const nextTeachers = teacherList.filter((teacher) => teacher.id !== id);
    setTeacherList(nextTeachers);
    localStorage.setItem(TEACHERS_KEY, JSON.stringify(nextTeachers));

    if (editingTeacher?.id === id) {
      handleCancelEdit();
    }
  }

  return (
    <div className="space-y-6">
      <form className="panel p-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">{editingTeacher ? "Edit Teacher" : "Add Teacher"}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Teacher records are saved in this browser.</p>
            </div>
            {editingTeacher && (
              <button type="button" className="icon-button" onClick={handleCancelEdit} aria-label="Cancel editing">
                <X size={17} />
              </button>
            )}
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="space-y-1 text-sm font-semibold">
            <span>Name</span>
            <input className="field" value={formData.name} onChange={(event) => updateForm("name", event.target.value)} required placeholder="Teacher name" />
          </label>
          <label className="space-y-1 text-sm font-semibold">
            <span>Subject</span>
            <input className="field" value={formData.subject} onChange={(event) => updateForm("subject", event.target.value)} required placeholder="Subject" />
          </label>
          <label className="space-y-1 text-sm font-semibold">
            <span>Class Teacher</span>
            <select className="field" value={formData.classTeacher} onChange={(event) => updateForm("classTeacher", event.target.value)} required>
              {classTeacherOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm font-semibold">
            <span>Phone</span>
            <input className="field" value={formData.phone} onChange={(event) => updateForm("phone", event.target.value)} placeholder="980-000-0000" />
          </label>
          <label className="space-y-1 text-sm font-semibold">
            <span>Status</span>
            <select className="field" value={formData.status} onChange={(event) => updateForm("status", event.target.value)}>
              <option>Active</option>
              <option>On Leave</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="inline-flex h-11 items-center gap-2 rounded-lg bg-teal-600 px-4 text-sm font-bold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/40" type="submit">
            {editingTeacher ? <Save size={17} /> : <Plus size={17} />}
            {editingTeacher ? "Save Changes" : "Add Teacher"}
          </button>
        </div>
      </form>

      <section className="panel p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Teachers</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Faculty assignments and contact details.</p>
          </div>
          <label className="flex h-11 w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 sm:w-80 dark:border-slate-700 dark:bg-slate-900">
            <Search size={17} className="text-slate-400" />
            <input className="w-full bg-transparent text-sm outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search teachers" />
          </label>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredTeachers.map((teacher) => (
          <article key={teacher.id} className="panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 font-bold text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
                {teacher.name.split(" ").map((part) => part[0]).join("")}
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${teacher.status === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"}`}>
                {teacher.status}
              </span>
            </div>
            <h3 className="mt-4 font-bold">{teacher.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{teacher.subject}</p>
            <p className="mt-3 text-sm font-semibold">{teacher.classTeacher}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <p className="flex items-center gap-2"><Phone size={15} />{teacher.phone}</p>
              <p className="flex items-center gap-2"><Mail size={15} />teacher@edupanel.edu</p>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="icon-button" onClick={() => handleEdit(teacher)} aria-label={`Edit ${teacher.name}`}>
                <Edit3 size={16} />
              </button>
              <button className="icon-button" onClick={() => handleDelete(teacher.id)} aria-label={`Delete ${teacher.name}`}>
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
