'use client';

import useLiveVotes from '@/hooks/useLiveVotes';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LiveVotesBoard() {
  const { votes, loading, error } = useLiveVotes();

  return (
    <div className="p-10 bg-warm-stone-secondary rounded-2xl shadow-xl border border-warm-stone-border">
      <h2 className="text-3xl font-black mb-8">Live Votes</h2>

      {error ? (
        <div className="text-center py-8 text-red-600">
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse p-6 rounded-xl bg-warm-stone-base border border-warm-stone-border">
              <div className="h-6 bg-slate-300 rounded w-3/4 mb-3"></div>
              <div className="h-8 bg-slate-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : votes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {votes.map((contestant, index) => (
            <motion.div
              key={contestant.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-warm-stone-base border border-warm-stone-border hover:shadow-lg transition-shadow"
            >
              {contestant.photoUrl && (
                <div className="relative w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden">
                  <Image
                    src={contestant.photoUrl}
                    alt={contestant.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <p className="font-bold text-xl text-center">{contestant.name}</p>
              <p className="text-3xl font-black mt-2 text-center text-amber-600">
                {contestant.votes.toLocaleString()}
              </p>
              <p className="text-sm text-center text-slate-500 mt-1">votes</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500">
          <p>No voting data available yet</p>
        </div>
      )}
    </div>
  );
}
