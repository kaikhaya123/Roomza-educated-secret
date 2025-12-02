"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Registration failed");
      }

      router.push("/auth/login?registered=true");
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Create an account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">First name</label>
          <input
            name="firstName"
            value={formValue(formData.firstName)}
            onChange={handleChange}
            className="mt-1 block w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last name</label>
          <input
            name="lastName"
            value={formValue(formData.lastName)}
            onChange={handleChange}
            className="mt-1 block w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formValue(formData.email)}
            onChange={handleChange}
            className="mt-1 block w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={formValue(formData.password)}
            onChange={handleChange}
            className="mt-1 block w-full rounded border px-3 py-2"
          />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isLoading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
}

function formValue(val: any) {
  return val ?? "";
}
