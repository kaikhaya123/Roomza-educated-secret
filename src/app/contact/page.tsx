import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center pt-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12">
              Have questions? We'd love to hear from you. Reach out to us with any inquiries about R.E.S.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-400 text-black font-bold py-3 rounded-lg hover:bg-amber-300 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <p className="text-white/70">contact@roomzaseducatedsecret.com</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                  <p className="text-white/70">+27 (0) XX XXX XXXX</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="text-white/70 hover:text-white transition">Twitter</a>
                    <a href="#" className="text-white/70 hover:text-white transition">Instagram</a>
                    <a href="#" className="text-white/70 hover:text-white transition">TikTok</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
