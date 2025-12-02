'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Column - First Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/Images/college-students-different-ethnicities-cramming-min.jpg"
              alt="Students collaborating"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Right Column - Second Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/Images/college-students-different-ethnicities-cramming.jpg"
              alt="Student competition"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

        </div>

        {/* Centered Content Below Images */}
        <div className="mt-12 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-4 leading-tight tracking-tight"
          >
            Roomza's Educated Secret
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700 font-medium max-w-xl mx-auto leading-snug mb-6"
          >
            Vote. Compete. Win. Support students — real prizes, real impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 items-center justify-center"
          >
            <a href="/vote" className="inline-block bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">Vote Now</a>
            <a href="/about" className="inline-block border-2 border-black text-black hover:bg-black hover:text-white px-5 py-3 rounded-lg transition">Learn How</a>
            <div className="text-sm text-gray-600 ml-3">Join thousands — live shows & prizes</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
