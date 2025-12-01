'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, TrendingUp, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Contestants() {
  // Mock data - will be replaced with API call
  const contestants = [
    {
      id: 1,
      name: 'Thandi Mkhize',
      institution: 'University of Pretoria',
      province: 'Gauteng',
      votes: 125430,
      image: '/contestants/1.jpg',
    },
    {
      id: 2,
      name: 'Sipho Ndlovu',
      institution: 'University of Cape Town',
      province: 'Western Cape',
      votes: 118750,
      image: '/contestants/2.jpg',
    },
    {
      id: 3,
      name: 'Lerato Mokoena',
      institution: 'University of KwaZulu-Natal',
      province: 'KwaZulu-Natal',
      votes: 112890,
      image: '/contestants/3.jpg',
    },
    {
      id: 4,
      name: 'Mpho Ngwenya',
      institution: 'Wits University',
      province: 'Gauteng',
      votes: 109340,
      image: '/contestants/4.jpg',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Meet Our <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Top Contestants</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Vote for your favorite students and help them win amazing prizes!
          </p>
          <Link
            href="/contestants"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium rounded-lg hover:shadow-lg transition"
          >
            <span>View All Contestants</span>
            <TrendingUp size={18} />
          </Link>
        </motion.div>

        {/* Contestants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contestants.map((contestant, index) => (
            <motion.div
              key={contestant.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-64 bg-gradient-to-br from-primary-500 to-accent-500 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-20">
                    #{index + 1}
                  </div>
                  {/* Placeholder - replace with actual images */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                    {contestant.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-1 font-medium">
                    {contestant.institution}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin size={14} className="mr-1" />
                    <span>{contestant.province}</span>
                  </div>

                  {/* Votes */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {contestant.votes.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Total Votes</div>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                      <Heart className="text-red-500" fill="currentColor" size={24} />
                    </div>
                  </div>

                  {/* Vote Button */}
                  <Link
                    href={`/vote?contestant=${contestant.id}`}
                    className="block w-full py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium rounded-lg text-center hover:shadow-lg transition"
                  >
                    Vote Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
