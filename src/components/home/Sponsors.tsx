'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Sponsors() {
  const titleSponsor = {
    name: 'Title Sponsor',
    tier: 'PLATINUM PARTNER',
    description: 'A leading supporter of student innovation in South Africa.',
  };

  const premiumSponsors = [
    { name: 'Premium Partner', industry: 'Technology' },
    { name: 'Premium Partner', industry: 'Finance' },
    { name: 'Premium Partner', industry: 'Telecommunications' },
    { name: 'Premium Partner', industry: 'Retail' }
  ];

  const supportingSponsors = [
    'Supporting Partner',
    'Supporting Partner',
    'Supporting Partner',
    'Supporting Partner',
    'Supporting Partner',
    'Supporting Partner',
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4">
            Our Partners
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trusted brands supporting student innovation and excellence.
          </p>
        </motion.div>

        {/* Title Sponsor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="bg-black text-white p-12 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Logo placeholder */}
              <div className="flex items-center justify-center">
                <div className="bg-white rounded-xl p-10 w-48 h-48 flex items-center justify-center shadow-sm">
                  <div className="text-gray-300 text-6xl font-black">Logo</div>
                </div>
              </div>

              {/* Info */}
              <div>
                <p className="text-xs font-bold tracking-widest mb-4">
                  {titleSponsor.tier}
                </p>
                <h3 className="text-3xl font-black mb-4">
                  {titleSponsor.name}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  {titleSponsor.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Premium Sponsors */}
        <div className="mb-24">
          <h3 className="text-2xl font-black tracking-tight mb-10">
            Premium Partners
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {premiumSponsors.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 border rounded-xl hover:shadow-md transition-all"
              >
                <div className="bg-gray-100 rounded-lg h-24 flex items-center justify-center mb-4">
                  <span className="text-gray-300 text-3xl font-bold">Logo</span>
                </div>
                <h4 className="font-bold text-sm">{s.name}</h4>
                <p className="text-xs text-gray-500">{s.industry}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Supporting Sponsors */}
        <div className="mb-20">
          <h3 className="text-2xl font-black tracking-tight mb-10">
            Supporting Partners
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {supportingSponsors.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border rounded-xl p-4 flex items-center justify-center h-20 bg-white hover:shadow-sm"
              >
                <span className="text-xs font-semibold text-gray-600">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-black mb-4">Become a Partner</h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Join top brands in building the biggest student experience in South Africa.
          </p>

          <button className="px-10 py-4 bg-black text-white font-black tracking-wider text-sm rounded-lg">
            Apply for Partnership
          </button>
        </motion.div>
      </div>
    </section>
  );
}
