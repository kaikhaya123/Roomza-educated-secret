'use client';

import React, { useRef } from 'react';

interface Card {
  id: number;
  image: string;
  name: string;
  votes: number;
  rank: number;
}

interface ArchCarouselProps {
  cards: Card[];
}

export default function ArchCarousel({ cards }: ArchCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (offset: number) => {
    containerRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <button
          aria-label="Previous"
          onClick={() => scrollBy(-300)}
          className="hidden sm:inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-full hover:bg-white/20 transition"
        >
          ‹
        </button>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth py-4 px-2 no-scrollbar"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="min-w-[220px] bg-white/5 rounded-xl p-3 flex-shrink-0 hover:scale-105 transition"
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="mt-3 text-center">
                <div className="font-semibold text-sm">{card.name}</div>
                <div className="text-xs text-white/60">
                  Rank {card.rank} • {card.votes} votes
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          aria-label="Next"
          onClick={() => scrollBy(300)}
          className="hidden sm:inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-full hover:bg-white/20 transition"
        >
          ›
        </button>
      </div>
    </div>
  );
}
