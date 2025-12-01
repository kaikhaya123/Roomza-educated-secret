'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RippleEffectProps {
  imageUrl: string;
  intensity?: number;
  rippleCount?: number;
  rippleSize?: number;
  rippleInterval?: number;
  interactive?: boolean;
  className?: string;
}

interface Ripple {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  id: number;
}

export default function RippleEffect({
  imageUrl,
  intensity = 0.5,
  rippleCount = 3,
  rippleSize = 100,
  rippleInterval = 2000,
  interactive = true,
  className = '',
}: RippleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  // Add ripple function
  const addRipple = (x: number, y: number, offsetLeft: number = 0, offsetTop: number = 0) => {
    console.log('Adding ripple at:', x, y, 'with offset:', offsetLeft, offsetTop);
    const newRipple: Ripple = {
      x: x + offsetLeft, // Convert to viewport coordinates
      y: y + offsetTop,
      age: 0,
      maxAge: 60,
      id: rippleIdRef.current++
    };

    setRipples(prev => {
      const updated = [...prev.slice(-rippleCount), newRipple];
      console.log('Current ripples:', updated.length);
      return updated;
    });
  };

  // Handle click
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log('Click at hero coordinates:', x, y);
    addRipple(x, y, rect.left, rect.top);
  };

  // Auto ripples
  useEffect(() => {
    // Wait a bit for component to mount and get proper dimensions
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        const container = containerRef.current;
        if (!container) return;

        // Get the hero section dimensions
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        console.log('Auto ripple at:', x, y, 'hero size:', rect.width, rect.height);
        addRipple(x, y, rect.left, rect.top);
      }, rippleInterval);

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(startDelay);
  }, [rippleInterval, rippleCount]);

  // Animate ripples
  useEffect(() => {
    if (ripples.length === 0) return;

    const animationFrame = requestAnimationFrame(() => {
      setRipples(prev => 
        prev
          .map(ripple => ({ ...ripple, age: ripple.age + 1 }))
          .filter(ripple => ripple.age < ripple.maxAge)
      );
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [ripples]);

  return (
    <>
      {/* Background image container */}
      <div className={`relative overflow-hidden ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
          }}
        />
        
        {/* Ripple container - covers the hero section */}
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full cursor-pointer"
          onClick={handleClick}
          style={{ 
            pointerEvents: interactive ? 'auto' : 'none',
          }}
        />
      </div>
      
      {/* Ripples rendered at viewport level but positioned within hero bounds */}
      {ripples.map((ripple) => {
        const progress = ripple.age / ripple.maxAge;
        const scale = 0.5 + (progress * (rippleSize / 30));
        const opacity = Math.max(0, (1 - progress) * intensity);

        return (
          <div
            key={ripple.id}
            className="fixed rounded-full border-4 border-white"
            style={{
              left: ripple.x - 30,
              top: ripple.y - 30,
              width: 60,
              height: 60,
              transform: `scale(${scale})`,
              opacity: opacity,
              backgroundColor: `rgba(255, 255, 255, ${Math.min(0.3, opacity * 0.4)})`,
              boxShadow: `0 0 30px rgba(255, 255, 255, ${Math.min(0.8, opacity)})`,
              pointerEvents: 'none',
              zIndex: 15,
              transition: 'none',
            }}
          />
        );
      })}
    </>
  );
}