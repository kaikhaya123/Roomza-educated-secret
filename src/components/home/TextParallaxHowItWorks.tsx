'use client';

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

interface StepProps {
  imgUrl: string;
  step: string;
  title: string;
  description: string;
  cta?: boolean;
}

const steps: StepProps[] = [
  {
    imgUrl: "/Images/vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless-min.jpg",
    step: "Step 1",
    title: "Register and Verify",
    description:
      "Create your account. Verify your identity. This ensures fair play, real people, and a trusted national platform."
  },
  {
    imgUrl: "/Images/person-pressing-buzzer-min.jpg",
    step: "Step 2",
    title: "Apply or Get Nominated",
    description:
      "Apply directly or get nominated by the public. Your story, ambition, and drive put you in the spotlight."
  },
  {
    imgUrl: "/Images/front-view-women-pressing-buzzer-min.jpg",
    step: "Step 3",
    title: "Vote and Play Daily",
    description:
      "Engage every day. Free votes, quizzes, and live rankings. Every action shapes the leaderboard."
  },
  {
    imgUrl: "/Images/african-american-woman-watching-streaming-service.jpg",
    step: "Step 4",
    title: "Watch Live. Vote Live.",
    description:
      "The show streams in real time. The nation votes in real time. Decisions happen live."
  },
  {
    imgUrl: "/Images/still-life-betrayal-concept-min.jpg",
    step: "Step 5",
    title: "Growth Beyond Elimination",
    description:
      "No one leaves empty-handed. Contestants transition into leadership development, mentorship, and skills training."
  },
  {
    imgUrl: "/Images/cheerful-women-holding-trophy-icon-min.jpg",
    step: "Step 6",
    title: "Win and Create Impact",
    description:
      "Finalists earn bursaries, exposure, and funding to launch projects that uplift communities.",
    cta: true
  }
];

export default function HowItWorksSection() {
  return (
    <div className="bg-black">
      {steps.map((item, index) => (
        <StepSection key={index} {...item} index={index} />
      ))}

      <TrustSection />
    </div>
  );
}

function StepSection({ imgUrl, step, title, description, cta, index }: StepProps & { index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={ref} className="relative h-[110vh] px-4">
      <motion.div
        style={{ scale }}
        className="sticky top-6 h-[90vh] rounded-3xl overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
        <div className="absolute inset-0 bg-black/65" />
      </motion.div>

      <div className="relative z-10 flex h-screen items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <p className="text-brand-yellow font-bold tracking-widest mb-4">{step}</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10">
            {description}
          </p>

          {cta && (
            <a
              href="/challenges"
              className="inline-flex items-center gap-3 bg-brand-yellow px-10 py-4 text-black font-bold rounded-lg hover:opacity-90 transition"
            >
              Start Your Journey
              <FiArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="bg-brand-yellow px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-black mb-10">
          Built on Trust
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          <div>
            <h3 className="text-xl font-bold text-black mb-3">
              Verified and Secure
            </h3>
            <p className="text-black/80">
              Identity verification, fraud prevention, and transparent systems protect every vote and every participant.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-3">
              Transparent by Design
            </h3>
            <p className="text-black/80">
              Public rules. Public outcomes. No manipulation. Leadership earned in the open.
            </p>
          </div>
        </div>

        <div className="border-t border-black/20 pt-8">
          <p className="text-2xl font-black text-black">
            Your voice shapes the future.
          </p>
          <p className="text-lg text-black font-semibold">
            This is more than a show. It is a national movement.
          </p>
        </div>
      </div>
    </section>
  );
}
