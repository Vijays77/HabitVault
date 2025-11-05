import dayjs from "dayjs";

const LABEL = {
  habit_created: "Created habit",
  habit_archived: "Deleted habit",
  habit_restored: "Restored habit",
  completion_added: "Completed",
  completion_removed: "Uncompleted",
};

export default function ActivityList({ items }) {
  if (!items?.length) return <div className="text-slate-400 text-sm">No recent activity.</div>;
  return (
    <ul className="divide-y divide-slate-700">
      {items.map((a) => (
        <li key={a._id} className="py-3 flex items-center justify-between">
          <div className="text-sm">
            <div className="font-medium">
              {LABEL[a.type] || a.type}{" "}
              {a.meta?.title ? <span className="text-slate-400">— {a.meta.title}</span> : null}
            </div>
            <div className="text-xs text-slate-400">{a.date}</div>
          </div>
          <div className="text-xs text-slate-400">{dayjs(a.createdAt).format("DD MMM, HH:mm")}</div>
        </li>
      ))}
    </ul>
  );
}
