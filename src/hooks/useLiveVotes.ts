'use client';

import { useEffect, useState } from 'react';

export default function useLiveVotes() {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/votes/stream');

    eventSource.onmessage = event => {
      const data = JSON.parse(event.data);
      setVotes(data.contestants);
    };

    return () => eventSource.close();
  }, []);

  return votes;
}
