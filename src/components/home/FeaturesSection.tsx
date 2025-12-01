'use client';

import { motion } from 'framer-motion';
import { Vote, Brain, Trophy, Radio, Award, Users } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';

export default function FeaturesSection() {
  const features = [
    {
      icon: null,
      title: 'Vote for Contestants',
      description: 'Cast up to 100 votes per day for your favorite contestants. Free and premium voting options available.',
      useAnimation: true,
      animationType: 'voting'
    },
    {
      icon: null,
      title: 'Daily Quizzes',
      description: 'Test your knowledge with exciting daily quizzes. Win points, climb leaderboards, and earn rewards.',
      useAnimation: true,
      animationType: 'brain'
    },
    {
      icon: null,
      title: 'Nominate Students',
      description: 'Know someone amazing? Nominate talented students from your campus to join the competition.',
      useAnimation: true,
      animationType: 'referral'
    },
    {
      icon: null,
      title: 'Live Streaming',
      description: 'Watch the show live 18 hours daily on TikTok, Facebook, and YouTube. Never miss a moment!',
      useAnimation: true,
      animationType: 'streaming'
    },
    {
      icon: null,
      title: 'Win Prizes',
      description: 'Compete for amazing prizes including cash, devices, bursaries, and exclusive merchandise.',
      useAnimation: true,
      animationType: 'champion'
    },
    {
      icon: null,
      title: 'Earn Achievements',
      description: 'Unlock badges and achievements as you participate. Build your profile and show off your status!',
      useAnimation: true,
      animationType: 'winner'
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
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
            Why Join <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">R.E.S.?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the ultimate student competition platform with exciting features designed for maximum engagement and entertainment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full border border-gray-100">
                {/* Icon */}
                <div className={`w-28 h-28 bg-white rounded-xl flex items-center justify-center mb-6 transition-transform mx-auto`}>
                  {feature.useAnimation ? (
                    <div className="flex items-center justify-center w-full h-full">
                      <DotLottieReact
                        src={`/lottie files/${
                          feature.animationType === 'brain' ? 'Funny brain.lottie' :
                          feature.animationType === 'referral' ? 'referral.lottie' :
                          feature.animationType === 'streaming' ? 'Live Streaming.lottie' :
                          feature.animationType === 'champion' ? 'Champion.lottie' :
                          feature.animationType === 'winner' ? 'Winner.lottie' :
                          'Election concept Lottie JSON animation.lottie'
                        }`}
                        loop
                        autoplay
                        style={{ 
                          width: '96px', 
                          height: '96px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      />
                    </div>
                  ) : (
                    feature.icon ? React.createElement(feature.icon, { className: "text-white", size: 48 }) : null
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
