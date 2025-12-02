"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function FeaturesSection() {
  const features = [
    { 
      title: 'Vote for Contestants', 
      description: 'Cast up to 100 votes per day for your favorite contestants. Free and premium voting options available to support students and help them win educational prizes.', 
      animation: 'Election concept Lottie JSON animation.lottie',
      bgColor: 'bg-cyan-400'
    },
    { 
      title: 'Daily Quizzes', 
      description: 'Test your knowledge with exciting daily quizzes. Win points, climb leaderboards, and earn rewards while staying engaged with the competition.', 
      animation: 'Funny brain.lottie',
      bgColor: 'bg-teal-700'
    },
    { 
      title: 'Nominate Students', 
      description: 'Know someone amazing? Nominate talented students from your campus to join the competition and showcase their abilities to win scholarships.', 
      animation: 'referral.lottie',
      bgColor: 'bg-orange-400'
    },
    { 
      title: 'Live Streaming', 
      description: 'Watch the show live 18 hours daily on TikTok, Facebook, and YouTube. Never miss a moment of the action and follow your favorite contestants in real-time.', 
      animation: 'Live Streaming.lottie',
      bgColor: 'bg-teal-700'
    },
  ];

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3"
          >
            INTERPHIKO
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Our Most Commonly Used<br />Features and Channels
          </motion.h2>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-20">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}
              >
                
                {/* Animation Box */}
                <motion.div 
                  className={`${!isEven ? 'lg:col-start-2' : ''}`}
                  initial={{ 
                    opacity: 0, 
                    x: isEven ? -100 : 100,
                    rotate: isEven ? -5 : 5
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    rotate: 0
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: isEven ? 2 : -2,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={`${feature.bgColor} rounded-3xl p-8 lg:p-12 flex items-center justify-center min-h-[320px] lg:min-h-[380px] shadow-xl`}>
                    <motion.div 
                      className="w-full max-w-[280px] lg:max-w-[320px]"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <DotLottieReact 
                        src={encodeURI(`/lottie-files/${feature.animation}`)} 
                        loop 
                        autoplay 
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div 
                  className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''} flex flex-col justify-center`}
                  initial={{ 
                    opacity: 0, 
                    x: isEven ? 100 : -100
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3,
                    type: "spring",
                    stiffness: 80
                  }}
                >
                  <motion.h3 
                    className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 uppercase tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    whileHover={{ 
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-base lg:text-lg text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
