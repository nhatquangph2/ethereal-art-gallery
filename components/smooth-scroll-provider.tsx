'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    smooth?: boolean;
    smoothTouch?: boolean;
  };
}

/**
 * SmoothScrollProvider - Wraps the app with Lenis smooth scrolling
 * Integrates with GSAP ScrollTrigger for seamless animations
 */
export function SmoothScrollProvider({
  children,
  options = {},
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: options.duration || 1.2,
      easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: options.smooth !== false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis instance globally for GSAP
    (window as any).lenis = lenis;

    // Cleanup
    return () => {
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, [options]);

  return <>{children}</>;
}

/**
 * Hook to access Lenis instance
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = (window as any).lenis || null;
  }, []);

  return lenisRef.current;
}

/**
 * Hook to scroll to element smoothly
 */
export function useScrollTo() {
  const lenis = useLenis();

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (!lenis) {
      console.warn('Lenis not initialized');
      return;
    }

    lenis.scrollTo(target, {
      offset: options?.offset || 0,
      duration: options?.duration,
      immediate: false,
    });
  };

  const scrollToTop = (duration?: number) => {
    if (!lenis) {
      console.warn('Lenis not initialized');
      return;
    }
    lenis.scrollTo(0, { duration });
  };

  return { scrollTo, scrollToTop };
}
