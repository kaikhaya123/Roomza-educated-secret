'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      window.location.href = '/admin/dashboard';
    }, 1200);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black"
      />

      <div className="relative bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">

        <h1 className="text-3xl font-black mb-6 tracking-tight">
          Admin Login
        </h1>

        <p className="text-gray-600 mb-8 text-sm">
          Access the control panel for the student reality show.
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">

          <input 
            type="email" 
            placeholder="Admin Email" 
            className="w-full border-gray-300 border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
            required
          />

          <input 
            type="password" 
            placeholder="Password"
            className="w-full border-gray-300 border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
            required
          />

          <button 
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-black tracking-wide"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

        </form>

        <p className="mt-6 text-gray-500 text-xs">
          Protected system for authorized administrators only.
        </p>
      </div>
    </section>
  );
}
