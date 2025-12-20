import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function VotePage() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center pt-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
            Cast Your Vote
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Your voice matters. Vote for your favorite contestant up to 100 times daily.
          </p>
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 max-w-md mx-auto backdrop-blur-sm">
            <p className="text-white text-lg">
              Coming Soon - Voting Portal
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
