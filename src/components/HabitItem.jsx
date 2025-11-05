export default function HabitItem({ item, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-xl px-4 py-3">
      <div className="min-w-0">
        <div className="font-semibold truncate">{item.name}</div>
        {item.goal ? <div className="text-xs text-slate-400 truncate">{item.goal}</div> : null}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(item)}
          className={`px-3 py-1 rounded-lg text-sm font-bold transition ${
            item.done ? "bg-green-500" : "bg-sky-600 hover:bg-sky-500"
          }`}
        >
          {item.done ? "Done ✅" : "Mark Done"}
        </button>
        <button
          onClick={() => onDelete?.(item)}
          className="px-2 py-1 rounded-lg text-sm bg-red-600 hover:bg-red-500"
          title="Delete habit"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
