'use client';

import { useEffect, useState } from 'react';

interface Contestant {
  id: string;
  name: string;
  votes: number;
  photoUrl?: string;
}

export default function useLiveVotes() {
  const [votes, setVotes] = useState<Contestant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await fetch('/api/votes/stream');
        
        if (!response.ok) {
          throw new Error('Failed to fetch vote data');
        }
        
        const data = await response.json();
        setVotes(data.contestants || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching votes:', err);
        setError('Failed to load vote data');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchVotes();

    // Poll for updates every 10 seconds
    const interval = setInterval(fetchVotes, 10000);

    return () => clearInterval(interval);
  }, []);

  return { votes, loading, error };
}
