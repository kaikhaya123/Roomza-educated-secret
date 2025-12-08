'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: 'Vote for Contestants',
      description: 'Use your account to vote for your favourite contestant in real time.',
      image: '/Images/VOTE (1).jpg',
      lottie: 'Election concept Lottie JSON animation.lottie'
    },
    {
      id: 2,
      title: 'Watch Live Streaming',
      description: 'Catch daily live feeds and stay updated with drama and highlights.',
      image: '/Images/Live Neon Sign, Live LED Light, Live Logo Neon Wall Art, Broadcast Wall Art, Live Show LED Sign, Custom Neon Sign, News Channel Wall Art,.png',
      lottie: 'Live Streaming.lottie'
    },
    {
      id: 3,
      title: 'Participate in Challenges',
      description: 'Compete in weekly challenges and boost your chances to win rewards.',
      image: '/Images/download (18).png',
      lottie: 'Rewards Programme.lottie'
    },
    {
      id: 4,
      title: 'Nominate a Contestant',
      description: 'Refer your friends and nominate them as contestants in the competition.',
      image: '/Images/KSENIIA FAST.png',
      lottie: 'referral.lottie'
    },
    {
      id: 5,
      title: 'Take the Quiz',
      description: 'Test your knowledge with fun trivia and win extra points.',
      image: '/Images/download (17) (1).jpg',
      lottie: 'Funny brain.lottie'
    },
    {
      id: 6,
      title: 'Win Exclusive Prizes',
      description: 'Stand a chance to win exclusive prizes by completing tasks.',
      image: '/Images/Download UEFA Champion Celebration Design for free.png',
      lottie: 'Champion.lottie'
    }
  ];

  const [active, setActive] = useState(features[0]);

  return (
    <section className="w-full py-20 px-6 md:px-16">
      <h2 className="text-4xl font-black mb-3">
        How You Participate
      </h2>
      <p className="text-gray-600 text-base mb-10 max-w-2xl">
        Explore every way you can join, vote, compete and win inside the platform.
      </p>

      <div className="flex gap-14 items-stretch">
        
        {/* LEFT SIDE LIST */}
        <div className="space-y-5 flex-1">
          {features.map(feature => (
            <motion.div
              key={feature.id}
              onClick={() => setActive(feature)}
              whileHover={{ scale: 1.02 }}
              className={`p-5 rounded-2xl cursor-pointer transition-all border 
                ${active.id === feature.id ? 'border-black bg-gray-100' : 'border-gray-300'}`}
            >
              <div className="flex items-center gap-4">
                
                {/* Small micro Lottie icon */}
                <div className="w-12 h-12">
                  <DotLottieReact
                    src={`/lottie-files/${feature.lottie}`}
                    autoplay
                    loop
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT SIDE IMAGE - FULL HEIGHT BORDERLESS */}
        <div className="relative flex-1 h-auto min-h-[550px] rounded-none overflow-hidden shadow-none">
          <Image
            src={active.image}
            alt="Feature"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
