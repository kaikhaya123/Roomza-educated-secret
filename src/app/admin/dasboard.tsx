'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <section className="min-h-screen bg-gray-50">

      {/* top navigation */}
      <div className="bg-black text-white py-6 px-10 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-black">Admin Dashboard</h1>

        <Link href="/" className="text-sm font-semibold underline">
          View Website
        </Link>
      </div>

      {/* dashboard content */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-8 bg-white rounded-xl shadow-md border"
        >
          <h2 className="font-black text-xl mb-2">Contestants</h2>
          <p className="text-gray-600 text-sm mb-5">
            Add, edit, remove contestants.
          </p>
          <Link href="/admin/dashboard/contestants" className="text-black font-bold underline text-sm">
            Manage Contestants
          </Link>
        </motion.div>

        {/* card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-8 bg-white rounded-xl shadow-md border"
        >
          <h2 className="font-black text-xl mb-2">Voting Control</h2>
          <p className="text-gray-600 text-sm mb-5">
            Track votes and voting phases.
          </p>
          <Link href="/admin/dashboard/votes" className="text-black font-bold underline text-sm">
            Open Voting Panel
          </Link>
        </motion.div>

        {/* card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-8 bg-white rounded-xl shadow-md border"
        >
          <h2 className="font-black text-xl mb-2">Registered Students</h2>
          <p className="text-gray-600 text-sm mb-5">
            Review all student signups.
          </p>
          <Link href="/admin/dashboard/students" className="text-black font-bold underline text-sm">
            View Students
          </Link>
        </motion.div>

        {/* card 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-8 bg-white rounded-xl shadow-md border"
        >
          <h2 className="font-black text-xl mb-2">Sponsors</h2>
          <p className="text-gray-600 text-sm mb-5">
            Manage sponsor tiers and display.
          </p>
          <Link href="/admin/dashboard/sponsors" className="text-black font-bold underline text-sm">
            Edit Sponsors
          </Link>
        </motion.div>

        {/* card 5 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-8 bg-white rounded-xl shadow-md border"
        >
          <h2 className="font-black text-xl mb-2">Show Controls</h2>
          <p className="text-gray-600 text-sm mb-5">
            Manage status, announcements, and phases.
          </p>
          <Link href="/admin/dashboard/settings" className="text-black font-bold underline text-sm">
            Open Settings
          </Link>
        </motion.div>

        {/* card 6 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-8 bg-white rounded-xl shadow-md border"
        >
          <h2 className="font-black text-xl mb-2">Analytics</h2>
          <p className="text-gray-600 text-sm mb-5">
            Viewer traffic and vote trends.
          </p>
          <Link href="/admin/dashboard/analytics" className="text-black font-bold underline text-sm">
            View Analytics
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
