import { useEffect, useState } from "react";
import API from "../api";

export default function Profile() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", avatar: "" });
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/profile");
        setForm(data);
        setPreview(data.avatar || "");
      } catch {}
    })();
  }, []);

  const pickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const v = reader.result.toString();
      setPreview(v);
      setForm((prev) => ({ ...prev, avatar: v }));
    };
    reader.readAsDataURL(f);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await API.put("/profile", { name: form.name, phone: form.phone, avatar: form.avatar });
      alert("Profile updated");
    } catch {
      alert("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] p-6 bg-slate-900 text-slate-200">
      <div className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-sky-400">Your Profile</h2>

        <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start">
          <div className="space-y-3">
            <div className="w-48 h-48 rounded-2xl overflow-hidden bg-slate-700 grid place-items-center">
              {preview ? <img src={preview} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-slate-400">No photo</span>}
            </div>
            <label className="block">
              <span className="text-sm text-slate-300">Profile photo</span>
              <input type="file" accept="image/*" onChange={pickFile} className="mt-1 block w-full text-sm" />
            </label>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-slate-300">Name</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 outline-none"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">Email (readonly)</span>
              <input value={form.email} readOnly className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 outline-none opacity-70" />
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">Phone</span>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 outline-none"
                placeholder="+91 9xxxxxxxxx"
              />
            </label>

            <div className="pt-2">
              <button disabled={saving} className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 font-semibold disabled:opacity-60">
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
