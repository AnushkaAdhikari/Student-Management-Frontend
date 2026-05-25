import { Save, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";

const SETTINGS_KEY = "student-dashboard-settings";
const defaultSettings = { schoolName: "EduPanel School", session: "2026 Academic Session", gradingScale: "Percentage", notifications: true };

export default function Settings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
  }

  return (
    <div className="space-y-6">
      <section className="panel p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">Settings</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Preferences are stored in this browser.</p>
          </div>
          <SettingsIcon className="text-teal-600" size={22} />
        </div>
      </section>
      <form className="panel p-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm font-semibold"><span>School Name</span><input className="field" value={settings.schoolName} onChange={(event) => setSettings((current) => ({ ...current, schoolName: event.target.value }))} /></label>
          <label className="space-y-1 text-sm font-semibold"><span>Session</span><input className="field" value={settings.session} onChange={(event) => setSettings((current) => ({ ...current, session: event.target.value }))} /></label>
          <label className="space-y-1 text-sm font-semibold"><span>Grading Scale</span><select className="field" value={settings.gradingScale} onChange={(event) => setSettings((current) => ({ ...current, gradingScale: event.target.value }))}><option>Percentage</option><option>Letter Grades</option><option>GPA</option></select></label>
          <label className="flex h-11 items-center gap-3 self-end text-sm font-semibold"><input type="checkbox" checked={settings.notifications} onChange={(event) => setSettings((current) => ({ ...current, notifications: event.target.checked }))} /> Enable notices</label>
        </div>
        {saved && <p className="mt-4 text-sm font-semibold text-emerald-600 dark:text-emerald-300">Settings saved.</p>}
        <button className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-teal-600 px-4 text-sm font-bold text-white transition hover:bg-teal-700" type="submit"><Save size={17} /> Save Settings</button>
      </form>
    </div>
  );
}
