"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function AdminSponsors() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ name:"", tier:"Premium", logoUrl:"", description:"" });
  const [loading, setLoading] = useState(false);

  async function load(){ setList(await (await fetch("/api/sponsors")).json()); }
  useEffect(()=>{ load(); }, []);

  async function create(e:any){
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/sponsors", { method: "POST", body: JSON.stringify(form), headers:{ "Content-Type":"application/json" }});
    if (res.ok) { setForm({ name:"", tier:"Premium", logoUrl:"", description:"" }); load(); }
    setLoading(false);
  }

  async function remove(id:number){
    if (!confirm("Delete sponsor?")) return;
    await fetch(`/api/sponsors/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-black mb-4">Sponsors</h2>

      <form onSubmit={create} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="p-2 border rounded" />
        <select value={form.tier} onChange={e=>setForm({...form, tier: e.target.value})} className="p-2 border rounded">
          <option>Title Sponsor</option>
          <option>Premium</option>
          <option>Supporting</option>
        </select>
        <input placeholder="Logo URL" value={form.logoUrl} onChange={e=>setForm({...form, logoUrl: e.target.value})} className="p-2 border rounded" />
        <Button type="submit" variant="primary" loading={loading}>Add</Button>
        <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Description" className="md:col-span-4 p-2 border rounded"></textarea>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {list.map(s=>(
          <div key={s.id} className="p-4 border rounded flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 flex items-center justify-center">
              {s.logoUrl ? <img src={s.logoUrl} alt={s.name} className="object-contain w-full h-full" /> : <span className="text-xs text-gray-400">No Logo</span>}
            </div>
            <div className="flex-1">
              <div className="font-bold">{s.name}</div>
              <div className="text-xs text-gray-500">{s.tier}</div>
              <div className="mt-2 text-sm text-gray-600">{s.description}</div>
            </div>
            <div>
              <Button onClick={()=>remove(s.id)} variant="danger">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
