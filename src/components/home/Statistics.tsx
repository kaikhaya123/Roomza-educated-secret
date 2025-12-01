'use client';

import { motion } from 'framer-motion';
import { Trophy, Users, TrendingUp, Gift } from 'lucide-react';

export default function Statistics() {
  const stats = [
    {
      icon: Users,
      value: '7M+',
      label: 'Daily Visitors',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      value: '100M+',
      label: 'Total Votes Cast',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Trophy,
      value: '383',
      label: 'Participating Campuses',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Gift,
      value: 'R500K+',
      label: 'Weekly Prizes',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="text-white" size={28} />
                </div>

                {/* Value */}
                <div className="text-4xl font-bold text-gray-900 mb-1 font-display">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>

                {/* Decorative Element */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -z-10 group-hover:scale-150 transition-transform`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
