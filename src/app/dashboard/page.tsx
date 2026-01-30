'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trophy, User, Settings, LogOut } from 'lucide-react'
import Footer from '@/components/layout/Footer'

interface Stats {
  votesCast: number
  totalContestants: number
  totalUsers: number
  leaderboard: { id: string; name: string; votes: number }[]
}

export default function DashboardPage() {
  const [data, setData] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(setData)
      .catch(() => {})
  }, [])

  return (
    <>
      <div className="min-h-screen bg-black text-white relative pb-10">
        
        {/* Header Section with Image Placeholder */}
        <div className="bg-black pt-6 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Grid layout for title and image placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Title Section */}
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
                <p className="text-base text-gray-400">Here's your platform activity summary</p>
              </div>

              {/* Image Placeholder - Right Side */}
              <div className="flex flex-col items-center md:items-end">
                <div className="mb-3">
                  <img src="/Images/Happy student-pana.png" alt="Dashboard Illustration" className="w-40 h-40 object-cover rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-6 space-y-10">

          {/* STATS */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Votes Cast', value: data?.votesCast },
              { label: 'Contestants', value: data?.totalContestants },
              { label: 'Users', value: data?.totalUsers },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-yellow-300 border border-yellow-300-border rounded-xl p-6 text-black"
              >
                <p className="text-sm text-slate-600 font-semibold">{stat.label}</p>
                <p className="text-3xl font-bold mt-2 text-slate-900">
                  {stat.value?.toLocaleString() || '—'}
                </p>
              </motion.div>
            ))}
          </section>

          {/* MAIN GRID */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEADERBOARD */}
            <div className="lg:col-span-2 bg-yellow-300 border border-yellow-300 rounded-xl">
              <div className="p-6 border-b border-yellow-300 flex items-center justify-between">
                <h2 className="font-bold text-lg text-black">Top Contestants</h2>
                <Trophy className="text-brand-yellow" size={20} />
              </div>

              <div className="divide-y divide-white/10">
                {data?.leaderboard?.length ? (
                  data.leaderboard.map((user, i) => (
                    <motion.div 
                      key={user.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 flex justify-between items-center hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-yellow to-yellow-600 text-black flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </div>
                        <span className="font-semibold text-white">{user.name}</span>
                      </div>
                      <span className="font-bold text-brand-yellow">{user.votes.toLocaleString()}</span>
                    </motion.div>
                  ))
                ) : (
                  <p className="p-6 text-sm text-black">No data available</p>
                )}
              </div>
            </div>

            {/* PROFILE */}
            <aside className="bg-yellow-300 border border-white/10 rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-yellow to-yellow-600 text-black flex items-center justify-center font-bold">
                  KZ
                </div>
                <div>
                  <p className="font-semibold text-black">Khayalami Z.</p>
                  <p className="text-sm text-black">Member</p>
                </div>
              </div>

              <nav className="space-y-2">
                <Link href="/dashboard/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-white">
                  <User size={18} /> Profile
                </Link>

                <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-white">
                  <Settings size={18} /> Settings
                </Link>

                <button className="flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors w-full text-left">
                  <LogOut size={18} /> Logout
                </button>
              </nav>
            </aside>
          </section>

          {/* QUICK ACTIONS */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/vote" className="bg-dark-bg-charcoal border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 bg-gray-300 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 text-xs font-semibold">Icon</span>
              </div>
              <p className="font-semibold text-white">Vote</p>
              <p className="text-sm text-slate-400">Support contestants</p>
            </Link>

            <Link href="/quiz" className="bg-dark-bg-charcoal border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 bg-gray-300 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 text-xs font-semibold">Icon</span>
              </div>
              <p className="font-semibold text-white">Daily Quiz</p>
              <p className="text-sm text-slate-400">Earn bonus votes</p>
            </Link>

            <Link href="/stream" className="bg-dark-bg-charcoal border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 bg-gray-300 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 text-xs font-semibold">Icon</span>
              </div>
              <p className="font-semibold text-white">Live Stream</p>
              <p className="text-sm text-slate-400">Watch and vote live</p>
            </Link>
          </section>

        </main>
      </div>
      <Footer />
    </>
  )
}
