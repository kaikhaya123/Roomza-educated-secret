'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ImpactPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="w-full bg-black text-white p-8">Impact Page Content</div>
      </main>
      <Footer />
    </div>
  );
}
