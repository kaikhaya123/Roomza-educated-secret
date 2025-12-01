'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Radio, Calendar, Clock } from 'lucide-react';

export default function LiveStream() {
  const platforms = [
    {
      name: 'TikTok',
      color: 'from-pink-500 to-red-500',
      url: '/stream/tiktok',
      isLive: true,
    },
    {
      name: 'Facebook',
      color: 'from-blue-600 to-blue-700',
      url: '/stream/facebook',
      isLive: true,
    },
    {
      name: 'YouTube',
      color: 'from-red-600 to-red-700',
      url: '/stream/youtube',
      isLive: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/20 backdrop-blur-md rounded-full border border-red-500/30 mb-6">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">LIVE NOW - 18 Hours Daily</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Watch the Show <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Live</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tune in to watch exciting challenges, eliminations, and live interactions with contestants across multiple platforms.
          </p>
        </motion.div>

        {/* Live Stream Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer">
              {/* Placeholder for video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                    <Play size={40} fill="white" className="text-white ml-1" />
                  </div>
                  <p className="text-white font-medium">Click to Watch Live</p>
                </div>
              </div>

              {/* Live Badge */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 px-4 py-2 bg-red-500 rounded-full shadow-lg">
                <Radio size={16} className="animate-pulse" />
                <span className="font-bold text-sm">LIVE</span>
              </div>

              {/* Viewer Count */}
              <div className="absolute top-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full">
                <span className="font-medium text-sm">2.3M Watching</span>
              </div>
            </div>

            {/* Platform Tabs */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {platforms.map((platform, index) => (
                <Link
                  key={index}
                  href={platform.url}
                  className={`relative p-4 bg-gradient-to-br ${platform.color} rounded-xl text-center font-bold hover:shadow-xl transition transform hover:scale-105`}
                >
                  {platform.isLive && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                  <div className="text-lg">{platform.name}</div>
                  <div className="text-xs opacity-90">{platform.isLive ? 'Live Now' : 'View Replays'}</div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Schedule & Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Schedule Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="text-primary-400" size={24} />
                <h3 className="text-xl font-display font-bold">Live Schedule</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Clock className="text-accent-400 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <div className="font-medium">Daily Show</div>
                    <div className="text-sm text-gray-400">6:00 AM - 12:00 AM</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="text-accent-400 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <div className="font-medium">Elimination Round</div>
                    <div className="text-sm text-gray-400">Every Sunday 8:00 PM</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="text-accent-400 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <div className="font-medium">Grand Finale</div>
                    <div className="text-sm text-gray-400">December 15, 2025</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/stream"
              className="block w-full py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-xl text-center hover:shadow-2xl transition transform hover:scale-105"
            >
              Go to Live Stream Page
            </Link>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center">
                <div className="text-3xl font-bold mb-1">196M</div>
                <div className="text-sm text-gray-400">Viewing Hours</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center">
                <div className="text-3xl font-bold mb-1">8M+</div>
                <div className="text-sm text-gray-400">Peak Viewers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
