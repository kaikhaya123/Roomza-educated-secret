'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FiArrowDown } from 'react-icons/fi';

export default function IntroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted + inline attributes for mobile autoplay reliability
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    let mounted = true;

    // Use Intersection Observer for lazy loading - only play when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!mounted || !video) return;
        
        if (entry.isIntersecting) {
          // Video is visible, attempt to play
          video.play().catch((err) => {
            // Autoplay blocked — user interaction required
            console.log('Autoplay blocked, waiting for user interaction');
          });
        } else {
          // Video is not visible, pause to save resources
          video.pause();
        }
      },
      { threshold: 0.25 } // Trigger when 25% of video is visible
    );

    observer.observe(video);

    // Fallback for user interaction (if autoplay is blocked)
    const onUserInteraction = async () => {
      if (!mounted || !video) return;
      try {
        await video.play();
        document.removeEventListener('touchstart', onUserInteraction);
        document.removeEventListener('click', onUserInteraction);
      } catch (err) {
        // Play still failed
      }
    };

    document.addEventListener('touchstart', onUserInteraction, { passive: true });
    document.addEventListener('click', onUserInteraction);

    return () => {
      mounted = false;
      observer.disconnect();
      document.removeEventListener('touchstart', onUserInteraction);
      document.removeEventListener('click', onUserInteraction);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };
  
  return (
    <section className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black">
      
      {/* LEFT SIDE VISUAL */}
      <div className="relative h-[50vh] lg:h-screen overflow-hidden">
        
        {/* Background video - lazy loaded for performance */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-cover scale-110 animate-slowZoom"
        >
          <source src="/Videos/14595546-hd_1920_1080_60fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Scroll indicator - appears on desktop */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/60"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
          <FiArrowDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex items-center justify-center px-8 py-16 lg:p-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-xl w-full space-y-6 lg:space-y-8 text-left"
        >
          {/* Main Headline with Supporting Statement */}
          <div className="space-y-3 border-l-2 border-brand-yellow/40 pl-6 lg:pl-8">
            <motion.span
              variants={itemVariants}
              className="text-xs lg:text-sm font-bold uppercase tracking-widest text-brand-yellow"
            >
              South Africa's First Online Student Competition
            </motion.span>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-black text-white leading-tight"
            >
              The Stage Is Ready
            </motion.h1>
          </div>

          <p className="text-base lg:text-lg text-white/80 leading-relaxed max-w-sm">
            Twenty exceptional students. National voting. One unforgettable journey. 
          </p>

          {/* Visual Separator */}
          <motion.div
            variants={itemVariants}
            className="w-12 h-0.5 bg-gradient-to-r from-brand-yellow to-transparent"
          />

          {/* Quick Proof Points */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4 pt-4"
          >
            <div className="flex gap-4">
              <div className="w-1 bg-brand-yellow/60 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">For Students</h3>
                <p className="text-sm text-white/70 mt-1">A platform to grow, compete, and be seen nationally.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-brand-yellow/60 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">For the Nation</h3>
                <p className="text-sm text-white/70 mt-1">Real opportunities, real recognition, real impact.</p>
              </div>
            </div>
          </motion.div>

          {/* Action - Subtle Directional Cue */}
          <motion.div
            variants={itemVariants}
            className="pt-6"
          >
            <motion.a
              href="#participate"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors group"
              whileHover={{ x: 4 }}
            >
              Discover Your Role
              <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <FiArrowDown className="w-4 h-4 rotate-90" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
