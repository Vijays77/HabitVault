import { useEffect, useState } from "react";
import API from "../api";
import WeeklyCompletionChart from "../components/WeeklyCompletionChart";

export default function Charts() {
  const [weekly, setWeekly] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/habits/weekly");
        setWeekly(data);
      } catch {
        setWeekly([
          { day: "Mon", pct: 55 },{ day: "Tue", pct: 72 },{ day: "Wed", pct: 63 },
          { day: "Thu", pct: 40 },{ day: "Fri", pct: 80 },{ day: "Sat", pct: 50 },{ day: "Sun", pct: 68 },
        ]);
      }
    })();
  }, []);

  return (
    <div className="min-h-[calc(100vh-56px)] p-6 bg-slate-900 text-slate-200">
      <div className="max-w-5xl mx-auto bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
          <h2 className="text-xl font-bold">Weekly Completion</h2>
          <span className="text-xs text-sky-300 border border-sky-400/40 bg-sky-400/10 px-2 py-1 rounded-full">Last 7 days</span>
        </div>
        <WeeklyCompletionChart data={weekly} />
      </div>
    </div>
  );
}
