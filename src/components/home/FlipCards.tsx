'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Card = {
  id: number;
  image: string;
  name: string;
  votes: number;
  rank: number;
};

export default function FlipCards({ cards }: { cards: Card[] }) {
  const [stack, setStack] = useState<Card[]>(cards);
  const swipeThreshold = 80;

  function rotateStack() {
    setStack((prev) => {
      const next = [...prev];
      const [first, ...rest] = next;
      return [...rest, first];
    });
  }

  function handleDragEnd(info: any) {
    if (Math.abs(info.offset.y) > swipeThreshold) {
      rotateStack();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full h-[420px] md:h-[540px] flex items-center justify-center"
    >
      {stack
        .slice()
        .reverse()
        .map((card, i) => {
          const idx = stack.length - 1 - i;

          return (
            <motion.div
              key={card.id}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => handleDragEnd(info)}
              whileTap={{ scale: 0.97 }}
              initial={{
                y: idx * 10,
                scale: 1 - idx * 0.04,
                rotate: idx % 2 === 0 ? -2 : 2,
                opacity: 0
              }}
              animate={{
                y: 0,
                scale: 1 - idx * 0.04,
                rotate: 0,
                opacity: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 34,
                mass: 0.6
              }}
              className="absolute w-[300px] md:w-[420px] h-[420px] md:h-[540px] rounded-2xl bg-black shadow-2xl overflow-hidden cursor-grab"
              style={{ zIndex: 100 - idx }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm md:text-base">{card.name}</p>
                      <p className="text-xs text-white/70">
                        {card.votes.toLocaleString()} votes
                      </p>
                    </div>
                    <div className="text-sm font-black">#{card.rank}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
    </motion.div>
  );
}
