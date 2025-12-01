'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Heart, Users, Target, Award, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-24 mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              About R.E.S.
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Roomza's Educated Secret - Where Education Meets Entertainment
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Robben Island Inspiration */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Inspired by Robben Island
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The courage and resilience of South Africa's political prisoners who transformed<br />
                their confinement into a university of leadership and freedom
              </p>
            </motion.div>

            {/* Quote Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 mb-8 border border-primary-100"
            >
              <BookOpen className="text-primary-600 mb-4" size={48} />
              <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 italic leading-relaxed">
                "Robben Island was a university. We went in as young men and came out prepared to lead a country."
              </blockquote>
              <p className="text-gray-600 text-lg">— Ahmed Kathrada</p>
            </motion.div>

            {/* Quote Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-purple-900 text-white rounded-2xl p-8 md:p-12 mb-12"
            >
              <Award className="text-accent-400 mb-4" size={48} />
              <blockquote className="text-2xl md:text-3xl font-medium mb-6 italic leading-relaxed">
                "Robben Island was meant to break our spirit, but instead it strengthened our resolve and our commitment to the freedom of our people."
              </blockquote>
              <p className="text-gray-300 text-lg">— Nelson Mandela</p>
            </motion.div>

            {/* Long Walk to Freedom Connection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <BookOpen className="text-primary-600" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Influenced by "Long Walk to Freedom"</h3>
                  <p className="text-gray-600">
                    Our show structure follows Nelson Mandela's autobiography, focusing on the transformative Robben Island chapters
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Part 8: The Dark Years (Week 1-2)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Part 9: Beginning to Hope (Week 3)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Part 10: Talking with the Enemy (Week 4-5)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Part 11: Freedom (Week 6)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Show Concept */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Our Purpose & Mission
              </h2>
              <p className="text-xl text-gray-600">
                More than entertainment - a transformative journey creating South Africa's future leaders
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Purpose Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Student Support</h3>
                <p className="text-gray-600">
                  Intervening in daily challenges students face. Proceeds support student assistance projects, accommodation solutions, and financial literacy programs.
                </p>
              </motion.div>

              {/* Purpose Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition"
              >
                <div className="bg-accent-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Users className="text-accent-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Leadership Development</h3>
                <p className="text-gray-600">
                  Testing socializing skills, leadership qualities, and character through daily challenges. Creating future leaders, business partners, and community champions.
                </p>
              </motion.div>

              {/* Purpose Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition"
              >
                <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Target className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Community Impact</h3>
                <p className="text-gray-600">
                  Players return to communities with innovative projects, leadership skills, and development initiatives. Real change beyond entertainment.
                </p>
              </motion.div>
            </div>

            {/* What Makes Us Different */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white"
            >
              <div className="flex items-center space-x-4 mb-8">
                <Lightbulb size={48} />
                <h3 className="text-3xl font-bold">What Makes R.E.S. Different</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Educational Journey</h4>
                    <p className="text-white/90 text-sm">Not just fun and games - innovative projects, teamwork, and leadership courses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Leadership House</h4>
                    <p className="text-white/90 text-sm">Evicted players receive leadership training - no rejection, only growth</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Documented Impact</h4>
                    <p className="text-white/90 text-sm">Shedding light on student challenges through authentic conversations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Career Launchpad</h4>
                    <p className="text-white/90 text-sm">Opportunities for jobs, business projects, and permanent employment</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Be Part of the Journey
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join us in creating South Africa's next generation of leaders
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/journey"
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-full hover:shadow-xl transition transform hover:scale-105"
              >
                Explore the 6-Week Journey
              </Link>
              <Link
                href="/apply"
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition"
              >
                Apply to Join
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
