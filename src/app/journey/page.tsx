'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, Lightbulb, Target, Rocket } from 'lucide-react';

const weeks = [
  {
    number: 1,
    title: "THE BLUFF WEEK",
    theme: "Welcome to the RES House",
    subtitle: "Introduction & Bonding",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    contestants: 20,
    evictions: 0,
    activities: [
      "Orientation & house rules",
      "Ice-breaker challenges (cultural quiz, teamwork games)",
      "Heritage storytelling sessions inspired by our country's diversity"
    ],
    audience: "Contestant profiles released, early 'favourite contestant' poll opens",
    inspired: "Part Eight: Robben Island - The Dark Years"
  },
  {
    number: 2,
    title: "THE SURVIVAL WEEK",
    theme: "Survival of the Smartest",
    subtitle: "First Taste of Pressure",
    icon: Target,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    contestants: 20,
    evictions: 0,
    activities: [
      "Business pitch challenge: innovative student entrepreneurship solutions",
      "Cultural knowledge quiz with a heritage twist",
      "Testing teamwork and general knowledge about the country and its history"
    ],
    audience: "Voting opens for favourite contestant to head the house and team captains",
    inspired: "Part Eight: Robben Island - The Dark Years"
  },
  {
    number: 3,
    title: "ATTACK WEEK",
    theme: "Lead or Follow",
    subtitle: "Innovation & Creativity",
    icon: Lightbulb,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    contestants: 20,
    evictions: 2,
    activities: [
      "Leadership role-play in community scenarios (student accommodation crisis solutions)",
      "Testing individual innovation, consulting and leadership skills",
      "Mini hackathon solving a social issue"
    ],
    audience: "Public votes + judges determine evictions",
    inspired: "Part Nine: Robben Island - Beginning to Hope"
  },
  {
    number: 4,
    title: "HOLDER'S WEEK",
    theme: "Innovators' Lab",
    subtitle: "Innovation & Creativity",
    icon: Rocket,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    contestants: 18,
    evictions: 3,
    activities: [
      "Design-thinking challenge: prototype low-cost student solutions",
      "Housing, food, mental health support innovations",
      "Cultural talent showcase (song, dance, poetry)"
    ],
    audience: "Public votes, judges save one contestant",
    inspired: "Part Ten: Talking with the Enemy"
  },
  {
    number: 5,
    title: "VICTOR VERSTER WEEK",
    theme: "From Idea to Action",
    subtitle: "Entrepreneurship & Impact",
    icon: Trophy,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    contestants: 15,
    evictions: 4,
    activities: [
      "Teams scale their business concept from Week 2",
      "Pitch event to entrepreneurs & youth funding agencies",
      "Real-world validation of entrepreneurial ideas"
    ],
    audience: "Public votes + pitch immunity",
    inspired: "Part Ten: Talking with the Enemy"
  },
  {
    number: 6,
    title: "FREEDOM DAY",
    theme: "The Final Push",
    subtitle: "Semi-Finals to Finals",
    icon: Calendar,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    contestants: 11,
    evictions: 5,
    activities: [
      "Community-driven project design (implementable post-show)",
      "Final personal branding & future plan presentations",
      "Grand Finale - 6 finalists compete for the ultimate prize"
    ],
    audience: "Live voting close on day 4, Grand Finale event on final day",
    inspired: "Part Eleven: Freedom"
  }
];

export default function JourneyPage() {
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
              The 6-Week Journey
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              From darkness to freedom - a transformative leadership experience<br />
              inspired by Nelson Mandela's "Long Walk to Freedom"
            </p>
            <div className="flex items-center justify-center space-x-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400">20</div>
                <div className="text-gray-400 text-sm">Contestants Start</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400">6</div>
                <div className="text-gray-400 text-sm">Weeks</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-400">6</div>
                <div className="text-gray-400 text-sm">Finalists</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Daily Structure */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Daily Episode Structure
              </h2>
              <p className="text-xl text-gray-600">
                Every day designed to promote growth, health, and leadership
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-100"
              >
                <div className="text-4xl mb-4">🏃‍♂️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Morning Exercise</h3>
                <p className="text-gray-600">
                  Days start with group exercise promoting healthy lifestyle and positive energy
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-accent-50 to-purple-50 rounded-xl p-6 border border-accent-100"
              >
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Daily Challenges</h3>
                <p className="text-gray-600">
                  Games and challenges testing different character elements and leadership qualities
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100"
              >
                <div className="text-4xl mb-4">🗳️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Viewer Interaction</h3>
                <p className="text-gray-600">
                  Real-time comments, daily competition voting, and behavioral point assessments
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Week by Week Breakdown */}
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
                Week-by-Week Breakdown
              </h2>
              <p className="text-xl text-gray-600">
                Following Nelson Mandela's journey from confinement to freedom
              </p>
            </motion.div>

            <div className="space-y-8">
              {weeks.map((week, index) => {
                const Icon = week.icon;
                return (
                  <motion.div
                    key={week.number}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`${week.bgColor} rounded-2xl p-8 border-2 ${week.borderColor}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                      {/* Week Number & Icon */}
                      <div className="flex-shrink-0 mb-6 md:mb-0">
                        <div className={`w-24 h-24 bg-gradient-to-br ${week.color} rounded-xl flex items-center justify-center mb-4`}>
                          <Icon className="text-white" size={48} />
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-900">Week {week.number}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {week.contestants} Contestants
                          </div>
                        </div>
                      </div>

                      {/* Week Content */}
                      <div className="flex-grow">
                        <div className="mb-4">
                          <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">
                            {week.title}
                          </h3>
                          <p className="text-xl font-semibold text-gray-700 mb-1">
                            {week.theme}
                          </p>
                          <p className="text-gray-600 italic">{week.subtitle}</p>
                        </div>

                        {/* Inspired By */}
                        <div className="bg-white/50 rounded-lg p-3 mb-4 border border-gray-200">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">📖 Inspired by:</span> {week.inspired}
                          </p>
                        </div>

                        {/* Activities */}
                        <div className="mb-4">
                          <h4 className="font-bold text-gray-900 mb-3">Activities & Challenges:</h4>
                          <ul className="space-y-2">
                            {week.activities.map((activity, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Audience & Evictions */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-4">
                            <h5 className="font-semibold text-gray-900 mb-2">👥 Audience Interaction:</h5>
                            <p className="text-sm text-gray-700">{week.audience}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <h5 className="font-semibold text-gray-900 mb-2">🎭 Evictions:</h5>
                            <p className="text-sm text-gray-700">
                              {week.evictions === 0 ? (
                                <span className="text-green-600 font-semibold">No evictions this week</span>
                              ) : (
                                <span className="text-red-600 font-semibold">{week.evictions} contestants evicted</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership House */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-purple-900 text-white rounded-2xl p-8 md:p-12"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-white/20 p-4 rounded-xl">
                  <Trophy className="text-white" size={48} />
                </div>
                <h2 className="text-4xl font-display font-bold">The Leadership House</h2>
              </div>
              <p className="text-xl text-gray-300 mb-8">
                Eviction is not rejection - it's transformation
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">What Happens Here:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="bg-accent-500 p-1 rounded mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span>Short leadership courses and training</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="bg-accent-500 p-1 rounded mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span>Personal development sessions</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="bg-accent-500 p-1 rounded mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span>Networking and mentorship opportunities</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Promise:</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Every player leaves R.E.S. as a leader. The show doesn't just entertain - it's a launching pad for future changemakers. Whether you're in the main house or leadership house, you're on a journey to transform South Africa.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the next generation of South African leaders
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/apply"
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-full hover:shadow-xl transition transform hover:scale-105"
              >
                Apply Now
              </a>
              <a
                href="/contestants"
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition"
              >
                Meet the Contestants
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
