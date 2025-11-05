import { useState } from "react";

export default function AddHabitModal({ open, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onCreate({ title, goal });
    setTitle(""); setGoal("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-[360px]">
        <h3 className="text-xl font-bold mb-4">Add Habit</h3>
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 outline-none"
            placeholder="Title (e.g., Morning Walk)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 outline-none"
            placeholder="Goal (e.g., 20 min)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-sky-600 hover:bg-sky-500 rounded-lg py-2 font-semibold">Create</button>
            <button type="button" onClick={onClose} className="flex-1 bg-slate-700 hover:bg-slate-600 rounded-lg py-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
