'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FiArrowDown } from 'react-icons/fi';

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: 'Where Students Compete',
    subtitle: 'A national digital stage built for talent and growth.',
    image: '/Images/bottom-view-four-schoolkids-min.jpg',
  },
  {
    id: 2,
    title: 'Real Challenges',
    subtitle: 'Leadership, skill, pressure, and performance.',
    image: '/Images/horizontal-image-interracial-couple-pulling-tricks-each-other-posing-isolated-against-blank-orange-wall-looking-suspicious-planning-trick-prank-rubbing-hands-min.jpg',
  },
  {
    id: 3,
    title: 'Public Impact',
    subtitle: 'Votes, visibility, and real world opportunity.',
    image: '/Images/authentic-small-youthful-marketing-agency-min.jpg',
  },
];

export default function IntroStorySections() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [assetIssues, setAssetIssues] = useState<string[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.setAttribute('playsinline', '');

    // Autoplay only on non-touch / larger screens to avoid mobile data and autoplay blocks
    const shouldAutoplay = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(min-width: 640px)').matches;
    if (shouldAutoplay) {
      video.play().catch(() => {});
    } else {
      // ensure video is paused on mobile — we'll show a static fallback image instead
      try {
        video.pause();
      } catch (e) {}
    }

    // Quick runtime checks to help diagnose production asset issues
    const checks: Promise<void>[] = [];
    const checkAsset = async (url: string, label: string) => {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (!res.ok) {
          setAssetIssues((s) => [...s, `${label} returned ${res.status}`]);
          console.error(`${label} load failed:`, url, res.status);
        } else {
          console.log(`${label} available:`, url);
        }
      } catch (err) {
        setAssetIssues((s) => [...s, `${label} fetch error`]);
        console.error(`${label} fetch error:`, url, err);
      }
    };

    checks.push(checkAsset('/Videos/14595546-hd_1920_1080_60fps.mp4', 'Hero video'));
    checks.push(checkAsset('/Images/vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless-min-opt.jpg', 'Hero poster'));
    Promise.all(checks).catch(() => {});
  }, []);

  return (
    <section ref={containerRef} className="relative bg-black text-white">

      {/* Diagnostic banner when asset fetch checks fail (visible in production for debugging) */}
      {assetIssues.length > 0 && (
        <div className="fixed top-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-lg text-sm max-w-sm">
          <strong className="block font-semibold">Media load issues:</strong>
          <ul className="list-disc list-inside mt-1">
            {assetIssues.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      {/* INTRO HERO */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0">
          {/* Mobile fallback: use a static, optimized image for small screens */}
          <div
            className="absolute inset-0 bg-cover bg-center sm:hidden"
            style={{
              backgroundImage: "url('/Images/vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless-min-opt.jpg')",
            }}
            aria-hidden="true"
          />

          {/* Video only visible on sm and up to avoid mobile autoplay/data usage */}
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            poster="/Images/vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless-min-opt.jpg"
            preload="none"
            className="hidden sm:block w-full h-full object-cover scale-[1.08]"
            aria-hidden="true"
          >
            <source src="/Videos/14595546-hd_1920_1080_60fps.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/40" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 max-w-xl px-6 lg:px-16 space-y-8 text-left ml-6 lg:ml-16">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-brand-white">
              National Student Reality Platform
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black leading-[1.05] tracking-tight">
            Where Students
            <br />
            Compete.
            <br />
            Grow.
            <br />
            Rise.
          </h1>

          <p className="text-base lg:text-lg text-white/80 leading-relaxed">
            A national digital stage unlocking leadership, opportunity,
            and measurable impact for South African students.
          </p>

          <motion.a
            href="#story"
            whileHover={{ x: 6 }}
            className="inline-flex items-center justify-center gap-3 text-sm font-semibold tracking-wide group pt-4 px-5 py-3 bg-white/6 rounded-full touch-manipulation"
            aria-label="Explore the story"
          >
            Explore the Story
            <span className="w-8 h-px bg-brand-white transition-all group-hover:w-12" />
          </motion.a>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/50"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase">
            Scroll
          </span>
          <FiArrowDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* STORY SECTIONS */}
      <section
        id="story"
        className="relative h-[300vh]"
      >
        {slides.map((slide, index) => {
          const start = index / slides.length;
          const end = (index + 1) / slides.length;

          const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
          const scale = useTransform(scrollYProgress, [start, end], [1.08, 1]);

          return (
            <motion.section
              key={slide.id}
              style={{ opacity }}
              className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
            >
              <motion.div
                style={{ scale }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50" />
              </motion.div>

              <div className="relative z-10 max-w-3xl px-6 lg:px-16 text-center space-y-6">
                <h2 className="text-4xl lg:text-6xl font-black tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-lg lg:text-xl text-white/80">
                  {slide.subtitle}
                </p>
              </div>
            </motion.section>
          );
        })}
      </section>
    </section>
  );
}
