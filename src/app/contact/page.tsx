'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

function SocialIcon({
  href,
  src,
  alt,
  label,
}: {
  href: string;
  src: string;
  alt: string;
  label: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-white/70 hover:text-white transition"
    >
      {!errored ? (
        <img
          src={src}
          alt={alt}
          className="w-8 h-8 object-contain"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-xs">
          {label[0]}
        </div>
      )}
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        {/* HERO */}
        <section className="relative pt-28 pb-20 border-b border-white/10">
          {/* Background Image (responsive) */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <Image
              src="/Images/friendly-ougoing-relaxed-africanamerican-woman-casually-pointing-right-conversation-discussin-min.jpg"
              alt="Contact background"
              fill
              sizes="100vw"
              className="object-contain md:object-cover object-center"
              priority
            />
          </div>

          <div className="relative max-w-8xl mx-auto px-8 lg:px-20">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-black/70 max-w-xl">
              Questions, partnerships, media, or support.
              Reach out and our team will respond within 24 hours.
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* LEFT – FORM */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10">
              <h2 className="text-2xl font-black mb-2">
                Get In Touch
              </h2>
              <p className="text-white/60 mb-8">
                Fill out the form below and we will contact you shortly.
              </p>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Full name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Type your message"
                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white resize-none focus:ring-2 focus:ring-brand-yellow outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-yellow text-black font-black py-4 rounded-lg uppercase tracking-wider hover:brightness-110 transition"
                >
                  Send Message
                </button>

                <p className="text-xs text-white/40 text-center">
                  We usually reply within 24 hours.
                </p>
              </form>
            </div>

            {/* RIGHT – INFO */}
            <div className="space-y-10">

              {/* CONTACT INFO */}
              <div>
                <h3 className="text-xl font-black mb-4">
                  Contact Details
                </h3>

                <div className="space-y-4 text-white/70">
                  <div>
                    <p className="text-xs uppercase text-white/40 mb-1">
                      Email
                    </p>
                    <p>contact@roomzaseducatedsecret.com</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-white/40 mb-1">
                      Phone
                    </p>
                    <p>+27 (0) XX XXX XXXX</p>
                  </div>
                </div>
              </div>

              {/* SOCIALS */}
              <div>
                <h3 className="text-xl font-black mb-4">
                  Follow Roomza's Educated Secret
                </h3>

                <div className="space-y-3">
                  <SocialIcon
                    href="#"
                    src="/Icons/instagram(1).png"
                    alt="Instagram"
                    label="Instagram"
                  />
                  <SocialIcon
                    href="#"
                    src="/Icons/video.png"
                    alt="TikTok"
                    label="TikTok"
                  />
                  <SocialIcon
                    href="#"
                    src="/Icons/facebook(1).png"
                    alt="Facebook"
                    label="Facebook"
                  />
                </div>
              </div>

              {/* BRAND CARD */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/70 text-sm leading-relaxed">
                  R.E.S. is a national student platform focused on education,
                  leadership, and opportunity across South Africa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="relative h-[40vh] min-h-[260px] flex items-center justify-center text-center">
          <div className="absolute inset-0 bg-[url('/Images/handsome-modern-black-man-talking-mobile-phone-pointing-left-person-smiling-standing-min.jpg')] bg-cover bg-center opacity-40" />

          <div className="relative z-10 px-6">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              We Are Always Ready
            </h2>
            <p className="text-white/70 mb-6">
              Let us help you build something meaningful.
            </p>
            <Link
              href="#"
              className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-full"
            >
              Get Started
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
