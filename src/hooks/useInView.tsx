'use client';

import { useEffect, useRef, useState } from 'react';

type Options = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

export default function useInView<T extends Element = Element>(options?: Options) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (options?.once ?? true) observer.disconnect();
          } else {
            if (!(options?.once ?? true)) setInView(false);
          }
        });
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '0px',
        threshold: options?.threshold ?? 0.15,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return { ref, inView } as { ref: React.RefObject<T>; inView: boolean };
}
