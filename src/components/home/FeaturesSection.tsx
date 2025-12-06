"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      step: "01",
      title: "Vote for Contestants",
      description: "Cast up to 100 votes per day for your favorite contestants. Free and premium voting options available.",
      animation: "Election concept Lottie JSON animation.lottie",
      tag: "Engage"
    },
    {
      step: "02",
      title: "Daily Quizzes",
      description: "Test your knowledge with exciting daily quizzes. Win points, climb leaderboards, and earn rewards.",
      animation: "Brain disappointed.lottie",
      tag: "Challenge"
    },
    {
      step: "03",
      title: "Nominate Students",
      description: "Know someone amazing? Nominate talented students from your campus to join the competition.",
      animation: "referral.lottie",
      tag: "Discover"
    },
    {
      step: "04",
      title: "Live Streaming",
      description: "Watch the show live 18 hours daily on TikTok, Facebook, and YouTube.",
      animation: "Live Streaming.lottie",
      tag: "Watch"
    },
    {
      step: "05",
      title: "Win Prizes",
      description: "Compete for prizes including cash, devices, bursaries, and exclusive merchandise.",
      animation: "Rewards Programme.lottie",
      tag: "Rewards"
    },
    {
      step: "06",
      title: "Earn Achievements",
      description: "Unlock badges and achievements as you participate.",
      animation: "Champion.lottie",
      tag: "Unlock"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-4"
          >
            Platform Features
          </motion.p>
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-4">
            Everything You Can <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Do</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click on any feature to explore how you can participate, engage, and win amazing prizes
          </p>
        </motion.div>

        {/* Desktop & Tablet: Horizontal Progress Cards */}
        <div className="hidden md:block">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {features.map((feature, index) => (
              <ProgressCard
                key={index}
                feature={feature}
                index={index}
                activeIndex={activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </motion.div>
        </div>

        {/* Mobile: Stacked Cards */}
        <div className="md:hidden grid grid-cols-1 gap-6">
          {features.map((feature, index) => (
            <MobileCard key={index} feature={feature} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgressCard({
  feature,
  index,
  activeIndex,
  onClick,
}: {
  feature: any;
  index: number;
  activeIndex: number;
  onClick: () => void;
}) {
  const isActive = index === activeIndex;

  return (
    <motion.div
      layout="position"
      onClick={onClick}
      animate={{
        flex: isActive ? "1 1 55%" : "1 1 9%",
      }}
      whileHover={{ 
        backgroundColor: isActive ? "#ffffff" : "#f9fafb",
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.32, 0.72, 0, 1],
        layout: { duration: 0.5 }
      }}
      className={`relative cursor-pointer overflow-hidden transition-all border-r last:border-r-0 group ${
        isActive ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
      }`}
      style={{ minHeight: "550px", borderRightColor: "#e5e7eb", willChange: "flex" }}
    >
      {/* Vertical accent bar */}
      <motion.div 
        className="absolute top-0 bottom-0 left-0 w-1.5"
        animate={{
          backgroundColor: isActive ? "#000000" : "#d1d5db",
        }}
        transition={{ duration: 0.3 }}
        style={{ willChange: "background-color" }}
      />

      <div className="p-8 h-full flex flex-col relative">
        {/* Step Number */}
        <motion.div 
          className="mb-6"
          animate={{
            scale: isActive ? 1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
          style={{ willChange: "transform" }}
        >
          <span className={`text-7xl font-black transition-all duration-300 ${
            isActive 
              ? "bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent" 
              : "text-gray-300 group-hover:text-gray-400"
          }`}>
            {feature.step}
          </span>
        </motion.div>

        {/* Title - Always visible */}
        <motion.h3 
          className="font-bold transition-all duration-300"
          animate={{
            fontSize: isActive ? "1.5rem" : "1.125rem",
            color: isActive ? "#111827" : "#6b7280",
          }}
          transition={{ duration: 0.3 }}
          style={{ willChange: "font-size, color" }}
        >
          {feature.title}
        </motion.h3>

        {/* Expanded Content - Only show when active */}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex-1 flex flex-col mt-6"
              style={{ willChange: "opacity" }}
            >
              {/* Description */}
              <motion.p 
                className="text-gray-600 leading-relaxed mb-8 text-base"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                {feature.description}
              </motion.p>

              {/* Animation Container */}
              <div className="flex-1 flex items-center justify-center my-8">
                <motion.div 
                  className="w-72 h-72 relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <DotLottieReact
                    src={`/lottie-files/${feature.animation}`}
                    loop
                    autoplay
                    speed={1}
                    style={{ width: "100%", height: "100%" }}
                  />
                </motion.div>
              </div>

              {/* Tag at bottom */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="flex items-center justify-between"
              >
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                  {feature.tag}
                </span>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inactive state hint */}
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-8 left-8 right-8"
          >
            <p className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
              Click to explore →
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function MobileCard({
  feature,
  delay,
}: {
  feature: any;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-5xl font-black text-gray-200">
          {feature.step}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full">
          {feature.tag}
        </span>
      </div>

      <div className="w-28 h-28 mx-auto mb-6">
        <DotLottieReact
          src={`/lottie-files/${feature.animation}`}
          loop
          autoplay
        />
      </div>

      <h3 className="text-xl font-bold text-center mb-3">
        {feature.title}
      </h3>

      <p className="text-gray-600 text-center">
        {feature.description}
      </p>
    </motion.div>
  );
}
