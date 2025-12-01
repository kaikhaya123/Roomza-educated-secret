'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <Sparkles className="text-accent-400" size={16} fill="currentColor" />
            <span className="text-white text-sm font-medium">Join 15 Million Users</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Ready to Make Your<br />
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Vote Count?
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join South Africa's biggest student competition today. Vote, compete, win prizes, and support the next generation of leaders!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="group px-10 py-5 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold text-lg rounded-full hover:shadow-2xl transition transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Register Now</span>
              <ArrowRight size={22} className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/about"
              className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-full border-2 border-white/20 hover:bg-white/20 transition"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">R28M+</div>
              <div className="text-gray-400 text-sm">Total Prizes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">7,660</div>
              <div className="text-gray-400 text-sm">Campus Ambassadors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400 text-sm">Free to Join</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
