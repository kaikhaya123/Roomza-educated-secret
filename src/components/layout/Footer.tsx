import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold font-display">R</span>
              </div>
              <div>
                <div className="font-display font-bold text-lg">R.E.S.</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              South Africa's first large-scale student-focused reality show that merges entertainment, education, and social impact.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/contestants" className="text-gray-400 hover:text-white transition">Contestants</Link></li>
              <li><Link href="/vote" className="text-gray-400 hover:text-white transition">Vote Now</Link></li>
              <li><Link href="/quiz" className="text-gray-400 hover:text-white transition">Daily Quiz</Link></li>
              <li><Link href="/nominate" className="text-gray-400 hover:text-white transition">Nominate</Link></li>
              <li><Link href="/stream" className="text-gray-400 hover:text-white transition">Live Stream</Link></li>
            </ul>
          </div>

          {/* Sponsors */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Sponsors</h3>
            <ul className="space-y-2">
              <li><Link href="/sponsors" className="text-gray-400 hover:text-white transition">Our Sponsors</Link></li>
              <li><Link href="/sponsors/partner" className="text-gray-400 hover:text-white transition">Become a Partner</Link></li>
              <li><Link href="/sponsors/packages" className="text-gray-400 hover:text-white transition">Sponsorship Packages</Link></li>
              <li><Link href="/sponsors/impact" className="text-gray-400 hover:text-white transition">Impact Report</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@res-show.co.za</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+27 (0) 11 123 4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Johannesburg, Gauteng<br />South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Roomza's Educated Secret. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
