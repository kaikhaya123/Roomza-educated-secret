'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, Vote, BookOpen, Tv, Trophy, Settings, LogOut, User, Zap, Award, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Animated counter component
function AnimatedCounter({ value, duration = 1 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    votesCast: 0,
    quizzesCompleted: 0,
    leaderboardPosition: 0,
    remainingVotes: 5,
    liveViewers: 2500,
  });
  const [leaderboard, setLeaderboard] = useState([
    { name: 'Khayalami Z.', votes: 2840 },
    { name: 'Amelia S.', votes: 2650 },
    { name: 'Jordan M.', votes: 2420 },
  ]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        votesCast: prev.votesCast + Math.floor(Math.random() * 5),
        liveViewers: Math.floor(2500 + Math.random() * 500),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-primary-600 border-t-white rounded-full"
        />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative border-b border-white/10 px-6 lg:px-12 py-16"
      >
        <div className="max-w-7xl mx-auto">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-4">
              Welcome back, {session.user?.name?.split(' ')[0]}
            </h1>
            <p className="text-xl text-white/60">Continue your journey to the top</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            <div className="border border-white/20 rounded-xl p-6 hover:border-white/40 transition group">
              <p className="text-white/60 text-sm font-semibold mb-2">VOTES CAST</p>
              <p className="text-4xl lg:text-5xl font-black group-hover:text-primary-500 transition">
                <AnimatedCounter value={stats.votesCast} />
              </p>
            </div>

            <div className="border border-white/20 rounded-xl p-6 hover:border-white/40 transition group">
              <p className="text-white/60 text-sm font-semibold mb-2">QUIZZES DONE</p>
              <p className="text-4xl lg:text-5xl font-black group-hover:text-secondary-500 transition">
                {stats.quizzesCompleted}
              </p>
            </div>

            <div className="border border-white/20 rounded-xl p-6 hover:border-white/40 transition group">
              <p className="text-white/60 text-sm font-semibold mb-2">YOUR RANK</p>
              <p className="text-4xl lg:text-5xl font-black text-accent-500 group-hover:scale-110 transition-transform">
                #{stats.leaderboardPosition || '—'}
              </p>
            </div>

            <div className="border border-white/20 rounded-xl p-6 hover:border-white/40 transition group">
              <p className="text-white/60 text-sm font-semibold mb-2">VOTES LEFT</p>
              <p className="text-4xl lg:text-5xl font-black text-primary-500 group-hover:scale-110 transition-transform">
                {stats.remainingVotes}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Alert */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-accent-500/50 bg-accent-500/10 rounded-xl p-6 mb-16 flex items-start gap-4"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Bell size={24} className="text-accent-500 flex-shrink-0 mt-1" />
            </motion.div>
            <div>
              <p className="font-bold text-lg">New Quiz Available!</p>
              <p className="text-white/60 mt-1">Try today's challenge before midnight to earn bonus points</p>
            </div>
          </motion.div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {/* Vote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="group border border-white/20 hover:border-primary-500/50 rounded-2xl p-8 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <Link href="/vote" className="relative z-10 block">
                <Vote size={32} className="text-primary-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Vote Now</h3>
                <p className="text-white/60 mb-6">{stats.remainingVotes} votes remaining</p>
                <div className="flex items-center gap-2 text-primary-500 font-semibold group-hover:gap-4 transition-all">
                  Cast Vote <ArrowRight size={20} />
                </div>
              </Link>
            </motion.div>

            {/* Quiz */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="group border border-white/20 hover:border-secondary-500/50 rounded-2xl p-8 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <Link href="/quiz" className="relative z-10 block">
                <BookOpen size={32} className="text-secondary-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Daily Quiz</h3>
                <p className="text-white/60 mb-6">Test your knowledge</p>
                <div className="flex items-center gap-2 text-secondary-500 font-semibold group-hover:gap-4 transition-all">
                  Take Quiz <ArrowRight size={20} />
                </div>
              </Link>
            </motion.div>

            {/* Live */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="group border border-red-500/50 bg-red-600/5 rounded-2xl p-8 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <Link href="/stream" className="relative z-10 block">
                <div className="flex items-center gap-3 mb-4">
                  <Tv size={32} className="text-red-500 group-hover:scale-110 transition-transform" />
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full"
                  >
                    LIVE
                  </motion.span>
                </div>
                <h3 className="text-xl font-bold mb-2">Watch Live</h3>
                <p className="text-white/60 mb-6">
                  <AnimatedCounter value={stats.liveViewers} /> watching
                </p>
                <div className="flex items-center gap-2 text-red-500 font-semibold group-hover:gap-4 transition-all">
                  Join Stream <ArrowRight size={20} />
                </div>
              </Link>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="group border border-white/20 hover:border-accent-500/50 rounded-2xl p-8 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <Link href="/leaderboard" className="relative z-10 block">
                <Trophy size={32} className="text-accent-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
                <p className="text-white/60 mb-6">See where you rank</p>
                <div className="flex items-center gap-2 text-accent-500 font-semibold group-hover:gap-4 transition-all">
                  View Ranks <ArrowRight size={20} />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Leaderboard & Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Top Voters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 border border-white/20 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <Trophy size={28} className="text-accent-500" />
                <h2 className="text-3xl font-black">Top Voters</h2>
              </div>

              <div className="space-y-4">
                {leaderboard.map((user, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-center justify-between border border-white/10 rounded-lg p-4 hover:border-white/30 transition group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </div>
                      <span className="font-semibold">{user.name}</span>
                    </div>
                    <span className="text-accent-500 font-black text-lg">{user.votes.toLocaleString()}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="border border-white/20 rounded-2xl p-8"
            >
              <div className="mb-8">
                <p className="text-white/60 text-sm font-semibold mb-2">YOUR PROFILE</p>
                <p className="text-2xl font-black">{session.user?.name}</p>
                <p className="text-white/60 text-sm mt-2">{session.user?.email}</p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:border-white/40 transition text-white font-semibold group"
                >
                  <User size={20} className="group-hover:scale-110 transition-transform" />
                  My Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:border-white/40 transition text-white font-semibold group"
                >
                  <Settings size={20} className="group-hover:scale-110 transition-transform" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-red-500/30 hover:border-red-500/60 hover:bg-red-500/10 transition text-red-500 font-semibold group"
                >
                  <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
