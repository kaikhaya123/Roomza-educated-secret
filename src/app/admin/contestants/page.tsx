"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

type Contestant = {
  id: number;
  name: string;
  campus: string;
};

export default function ContestantsAdmin() {
  const [list, setList] = useState<Contestant[]>([]);
  const [name, setName] = useState("");
  const [campus, setCampus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/contestants").then(res => res.json()).then(setList);
  }, []);

  async function createContestant(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/contestants", {
      method: "POST",
      body: JSON.stringify({ name, campus }),
      headers: { "Content-Type": "application/json" }
    });
    setName("");
    setCampus("");
    fetch("/api/contestants").then(res => res.json()).then(setList);
    setLoading(false);
  }

  async function deleteContestant(id: number) {
    await fetch(`/api/contestants/${id}`, { method: "DELETE" });
    setList(list.filter(c => c.id !== id));
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contestants Admin</h1>
      <form onSubmit={createContestant} className="mb-6 flex gap-2">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border p-2 rounded" />
        <input value={campus} onChange={e=>setCampus(e.target.value)} placeholder="Campus" className="border p-2 rounded" />
        <Button type="submit" loading={loading} variant="primary">Add</Button>
      </form>
      <ul>
        {list.map(c => (
          <li key={c.id} className="flex items-center justify-between mb-2 p-2 bg-white rounded shadow">
            <span>{c.name} ({c.campus})</span>
            <Button onClick={()=>deleteContestant(c.id)} variant="danger">Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
