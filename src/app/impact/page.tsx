'use client';

import { motion } from 'framer-motion';
import { Home, BookOpen, Briefcase, Users, TrendingUp, Heart, DollarSign, GraduationCap } from 'lucide-react';

export default function ImpactPage() {
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
              Social Impact
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Real change beyond entertainment - addressing South Africa's student challenges
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400">20+</div>
                <div className="text-gray-400 text-sm">Communities</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400">200+</div>
                <div className="text-gray-400 text-sm">Youth Upskilled</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400">9M+</div>
                <div className="text-gray-400 text-sm">Viewers Reached</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400">2</div>
                <div className="text-gray-400 text-sm">Housing Projects</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Accommodation Crisis */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block bg-red-100 p-4 rounded-full mb-6">
                <Home className="text-red-600" size={48} />
              </div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Student Accommodation Crisis
              </h2>
              <p className="text-xl text-gray-600">
                Addressing South Africa's 500,000+ bed shortage
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* The Problem */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-red-50 rounded-xl p-8 border-2 border-red-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">The Crisis</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-500 p-1 rounded mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">500,000+ bed shortage</p>
                      <p className="text-gray-600 text-sm">Across South African tertiary institutions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-500 p-1 rounded mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">R3,500 - R5,500/month</p>
                      <p className="text-gray-600 text-sm">Private rental costs, unaffordable for NSFAS students</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-500 p-1 rounded mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Unsafe housing</p>
                      <p className="text-gray-600 text-sm">Many live in overcrowded, unsafe conditions affecting performance</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* R.E.S. Response */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8 border-2 border-primary-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">R.E.S. Response</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary-500 p-1 rounded mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">National Awareness</p>
                      <p className="text-gray-600 text-sm">Highlighting the crisis to millions of viewers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary-500 p-1 rounded mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Innovation Challenge</p>
                      <p className="text-gray-600 text-sm">'Student Housing Innovation Challenge' with industry partners</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary-500 p-1 rounded mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Investment Mobilization</p>
                      <p className="text-gray-600 text-sm">Public-private partnerships for housing solutions</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Housing Initiative Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <Home size={48} />
                <div>
                  <h3 className="text-3xl font-bold">Student Housing Innovation Challenge</h3>
                  <p className="text-white/90">Week 3 & 4 of the show</p>
                </div>
              </div>
              <p className="text-lg mb-6">
                Contestants develop practical, scalable solutions to the student accommodation crisis. Winners receive funding and mentorship to implement their innovations.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="font-semibold">💡 Goal: Launch 2 pilot housing projects by end of Season 1</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Financing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block bg-green-100 p-4 rounded-full mb-6">
                <DollarSign className="text-green-600" size={48} />
              </div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Student Financing Challenges
              </h2>
              <p className="text-xl text-gray-600">
                Breaking the R16 billion debt cycle
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">The Problem</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• NSFAS coverage gaps</li>
                  <li>• Payment delays</li>
                  <li>• Hidden costs (food, transport, books)</li>
                  <li>• R16B+ combined student debt</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="text-primary-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">R.E.S. Solutions</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Financial literacy mini-series</li>
                  <li>• Dedicated education episodes</li>
                  <li>• Money management workshops</li>
                  <li>• Access to financial advisors</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Prizes & Support</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Bursaries for contestants</li>
                  <li>• Startup capital prizes</li>
                  <li>• Scholarship opportunities</li>
                  <li>• Business funding access</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Outreach */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block bg-purple-100 p-4 rounded-full mb-6">
                <Users className="text-purple-600" size={48} />
              </div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Community Outreach Projects
              </h2>
              <p className="text-xl text-gray-600">
                Every team runs an impactful community project
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Adult Literacy Programs",
                  description: "Teaching reading and writing skills to communities",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: Briefcase,
                  title: "Digital Skills Training",
                  description: "Equipping unemployed youth with tech skills",
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: Heart,
                  title: "Agricultural Innovation",
                  description: "Sustainable farming workshops for communities",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  icon: TrendingUp,
                  title: "Career Guidance",
                  description: "Mentoring sessions for students and youth",
                  color: "from-purple-500 to-pink-500"
                }
              ].map((project, index) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Commitment Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-br from-gray-900 to-purple-900 text-white rounded-2xl p-8 md:p-12 text-center"
            >
              <h3 className="text-3xl font-bold mb-6">Our Commitment</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Students apply learning to real community challenges. Every project is designed for post-show implementation, ensuring lasting impact beyond the cameras.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-accent-400 mb-2">100%</div>
                  <div className="text-gray-400">Of proceeds go to student support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-400 mb-2">Every</div>
                  <div className="text-gray-400">Contestant receives assistance</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-400 mb-2">Lasting</div>
                  <div className="text-gray-400">Community partnerships formed</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expected Impact */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Season 1 Expected Impact
              </h2>
              <p className="text-xl text-gray-600">
                Measurable change in South African communities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { number: "20+", label: "Communities Impacted", icon: Users },
                { number: "200+", label: "Young People Upskilled", icon: TrendingUp },
                { number: "9M+", label: "Viewers Reached", icon: Heart },
                { number: "2", label: "Housing Projects Funded", icon: Home },
                { number: "100s", label: "Financial Aid Opportunities", icon: DollarSign },
                { number: "∞", label: "Lives Changed Forever", icon: GraduationCap }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-8 shadow-lg text-center"
                  >
                    <Icon className="text-primary-600 mx-auto mb-4" size={48} />
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Be Part of the Solution
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Every vote, every view, every share contributes to changing lives
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/vote"
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-full hover:shadow-xl transition transform hover:scale-105"
              >
                Vote for Change
              </a>
              <a
                href="/apply"
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition"
              >
                Apply to Join
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
