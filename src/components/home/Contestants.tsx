'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Users, ArrowRight, Star, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Contestants() {
  const miniStats = [
    { value: '383', label: 'Campuses Engaged' },
    { value: '7M+', label: 'Daily Users' },
    { value: '1.7M', label: 'Students Reached' }
  ];

  // Placeholder contestants - replace with real data later
  const contestants = [
    {
      id: 1,
      name: 'Coming Soon',
      campus: 'Your Campus',
      bio: 'Talented students ready to compete',
      badge: 'Launching Soon',
      trending: true
    },
    {
      id: 2,
      name: 'Coming Soon',
      campus: 'Your Campus',
      bio: 'Excellence in education & talent',
      badge: 'Launching Soon',
      trending: false
    },
    {
      id: 3,
      name: 'Coming Soon',
      campus: 'Your Campus',
      bio: 'Future leaders of South Africa',
      badge: 'Launching Soon',
      trending: false
    },
    {
      id: 4,
      name: 'Coming Soon',
      campus: 'Your Campus',
      bio: 'Innovation meets opportunity',
      badge: 'Launching Soon',
      trending: false
    },
    {
      id: 5,
      name: 'Coming Soon',
      campus: 'Your Campus',
      bio: 'Empowering youth through competition',
      badge: 'Launching Soon',
      trending: false
    },
    {
      id: 6,
      name: 'Coming Soon',
      campus: 'Your Campus',
      bio: 'Celebrating student excellence',
      badge: 'Launching Soon',
      trending: false
    }
  ];

  return (
    <section className="py-32 lg:py-40 bg-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <motion.div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative">
        {/* Mini Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-20"
        >
          {miniStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-black text-black mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Floating stars decoration */}
          <div className="relative inline-block mb-6">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 -left-8"
            >
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </motion.div>
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -top-4 -right-10"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl lg:text-8xl font-black tracking-tighter"
            >
              Your <span className="italic font-light bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">Stars</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the talented students competing nationwide and support your favourites.
          </motion.p>
        </motion.div>

        {/* Contestant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {contestants.map((contestant, index) => (
            <motion.div
              key={contestant.id}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`relative bg-white border-2 ${contestant.trending ? 'border-yellow-400 shadow-xl shadow-yellow-400/20' : 'border-gray-200'} rounded-2xl overflow-hidden group cursor-pointer`}
            >
              {/* Trending badge */}
              {contestant.trending && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="absolute top-4 right-4 z-20 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1"
                >
                  <Star className="w-3 h-3 fill-black" />
                  Trending
                </motion.div>
              )}

              {/* Image placeholder */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-400/20 to-yellow-500/20"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Users className="w-20 h-20 text-gray-300" strokeWidth={1} />
                  </motion.div>
                </div>

                {/* Badge overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold"
                >
                  {contestant.badge}
                </motion.div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="text-2xl font-black text-black mb-1 tracking-tight">{contestant.name}</h3>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-3">{contestant.campus}</p>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">{contestant.bio}</p>
                
                {/* Vote placeholder button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-black text-white font-black text-xs uppercase tracking-[0.15em] rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
                  disabled
                >
                  <Trophy className="w-4 h-4" />
                  Vote Coming Soon
                </motion.button>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto bg-gradient-to-br from-black to-gray-900 rounded-3xl p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Animated background stars */}
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 opacity-10"
          >
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-400 rounded-full" />
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="absolute top-1/3 right-1/2 w-1 h-1 bg-yellow-400 rounded-full" />
          </motion.div>

          <div className="relative z-10">
            <motion.div
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-6"
            >
              <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 mx-auto" />
            </motion.div>

            <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to <span className="italic font-light text-yellow-400">Join</span> the Show?
            </h3>
            
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Register now and be the first to vote when contestants are announced. Your support can change lives.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth/register"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-yellow-400 text-black font-black text-sm uppercase tracking-[0.15em] rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg shadow-yellow-400/30"
                >
                  <span>Register & Vote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-black text-sm uppercase tracking-[0.15em] rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  <span>Learn More</span>
                  <Sparkles className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/50 text-sm mt-8"
            >
              Contestants will be announced soon. Stay tuned!
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
