import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { getGenderData, getGradeData } from "../utils/stats.js";

const palette = ["#0f766e", "#2563eb", "#f59e0b", "#ef4444"];

export function StudentsByGradeChart({ students }) {
  const data = getGradeData(students);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="grade" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip cursor={{ fill: "rgba(15, 118, 110, 0.08)" }} />
          <Bar dataKey="students" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.grade} fill={palette[index % palette.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GenderChart({ students }) {
  const data = getGenderData(students);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="name" innerRadius={65} outerRadius={100} paddingAngle={4}>
            <Cell fill="#2563eb" />
            <Cell fill="#db2777" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="-mt-8 flex justify-center gap-5 text-sm">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-600" /> Boys
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-pink-600" /> Girls
        </span>
      </div>
    </div>
  );
}
