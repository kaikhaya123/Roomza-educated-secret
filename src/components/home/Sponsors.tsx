'use client';

import { motion } from 'framer-motion';

export default function Sponsors() {
  // Mock sponsor data - simplified for cleaner design
  const sponsors = [
    { name: 'VODACOM', type: 'TELECOMMUNICATIONS' },
    { name: 'CAPITEC', type: 'FINANCIAL SERVICES' },
    { name: 'SAMSUNG', type: 'TECHNOLOGY' },
    { name: 'SHOPRITE', type: 'RETAIL' },
    { name: 'NEDBANK', type: 'BANKING' },
    { name: 'COCA-COLA', type: 'BEVERAGES' },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase">
              WORK WITH
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
            Our partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Building the future of South African student competition with industry-leading brands.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-12 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                {/* Logo Placeholder */}
                <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                </div>
                
                {/* Company Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                  {sponsor.name}
                </h3>
                
                {/* Divider */}
                <div className="w-12 h-px bg-gray-300 mx-auto mb-3"></div>
                
                {/* Industry Type */}
                <p className="text-sm font-medium text-gray-500 tracking-wider uppercase">
                  {sponsor.type}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-600 mb-8">
            Ready to make an impact with South Africa's brightest minds?
          </p>
          <a
            href="/sponsors/partner"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Partner with us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
