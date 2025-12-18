'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CallToAction() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // fallback: navigate to anchor
      window.location.hash = id;
    }
  }, []);

  const btns = [
    { key: 'register', label: 'Register Now', action: () => scrollTo('register') },
    { key: 'vote', label: 'Vote for Contestants', action: () => scrollTo('vote') },
    { key: 'live', label: 'Watch Live', action: () => scrollTo('live') },
  ];

  const secondary = [
    { key: 'challenges', label: 'View Upcoming Challenges', action: () => scrollTo('challenges') },
    { key: 'merch', label: 'Explore Merch', action: () => scrollTo('merch') },
  ];

  return (
    <section className="py-24 pb-32 mb-16 lg:pb-40 lg:mb-24 relative overflow-hidden">
      {/* Background image with lazy loading and quality optimization */}
      <Image
        src="/Images/porter-raab-Ucr4Yp-t364-unsplash.jpg"
        alt="Call to action background"
        fill
        className="absolute inset-0 object-cover"
        quality={75}
        sizes="100vw"
        loading="lazy"
        priority={false}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 section-title">Be Part of the R.E.S. Experience</h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            You can join, vote, watch, and support the biggest student reality show in South Africa. Take your step today.
          </p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4"
          >
            {btns.map((b, i) => (
              <motion.button
                key={b.key}
                onClick={b.action}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full text-base font-semibold shadow-lg transition transform bg-brand-yellow text-black hover:bg-yellow-400 hover:shadow-xl`}
                aria-label={b.label}
              >
                <span>{b.label}</span>
                <ArrowRight size={16} />
              </motion.button>
            ))}
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-base text-gray-300">
            {secondary.map((s) => (
              <button key={s.key} onClick={s.action} className="underline hover:text-white transition">
                {s.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
        {/* Bottom visual divider to keep CTA separate from footer */}
        <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none bg-gradient-to-b from-transparent to-black/90" />
    </section>
  );
}
