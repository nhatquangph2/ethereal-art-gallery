'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  createImageScrollAnimation,
  createTextRevealAnimation,
  createStickyImageEffect,
  refreshScrollTriggers,
  killAllScrollTriggers,
} from './scrollytelling';
import { ImageEffect } from '@/types/artwork';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for image scrollytelling animations
 */
export function useImageScrollAnimation(
  imageRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  effect: ImageEffect,
  options?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
  }
) {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!imageRef.current || !triggerRef.current) return;

    scrollTriggerRef.current = createImageScrollAnimation(
      imageRef.current,
      effect,
      {
        trigger: triggerRef.current,
        start: options?.start,
        end: options?.end,
        scrub: options?.scrub,
      }
    );

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [imageRef, triggerRef, effect, options?.start, options?.end, options?.scrub]);

  return scrollTriggerRef;
}

/**
 * Hook for text reveal animations
 */
export function useTextReveal<T extends HTMLElement = HTMLElement>(
  textRef: RefObject<T | null>,
  triggerRef?: RefObject<HTMLElement | null>,
  options?: {
    start?: string;
    end?: string;
  }
) {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    scrollTriggerRef.current = createTextRevealAnimation(textRef.current, {
      trigger: triggerRef?.current || undefined,
      start: options?.start,
      end: options?.end,
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [textRef, triggerRef, options?.start, options?.end]);

  return scrollTriggerRef;
}

/**
 * Hook for sticky image effect
 */
export function useStickyImage(
  imageContainerRef: RefObject<HTMLElement | null>,
  contentContainerRef: RefObject<HTMLElement | null>
) {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!imageContainerRef.current || !contentContainerRef.current) return;

    scrollTriggerRef.current = createStickyImageEffect(
      imageContainerRef.current,
      contentContainerRef.current
    );

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [imageContainerRef, contentContainerRef]);

  return scrollTriggerRef;
}

/**
 * Hook to detect if element is in viewport
 * Useful for triggering audio layers
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>,
  options?: {
    threshold?: number;
    start?: string;
    end?: string;
  }
): boolean {
  const [isInView, setIsInView] = React.useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: elementRef.current,
      start: options?.start || 'top 75%',
      end: options?.end || 'bottom 25%',
      onEnter: () => setIsInView(true),
      onLeave: () => setIsInView(false),
      onEnterBack: () => setIsInView(true),
      onLeaveBack: () => setIsInView(false),
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [elementRef, options?.start, options?.end]);

  return isInView;
}

/**
 * Hook to refresh ScrollTrigger on layout changes
 */
export function useScrollTriggerRefresh(dependencies: any[] = []) {
  useEffect(() => {
    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      refreshScrollTriggers();
    }, 100);

    return () => clearTimeout(timer);
  }, dependencies);
}

/**
 * Hook for cleanup on unmount
 */
export function useScrollTriggerCleanup() {
  useEffect(() => {
    return () => {
      killAllScrollTriggers();
    };
  }, []);
}

/**
 * Hook for scroll progress tracking
 */
export function useScrollProgress(
  containerRef: RefObject<HTMLElement>
): number {
  const [progress, setProgress] = React.useState(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [containerRef]);

  return progress;
}

/**
 * Import React for useState
 */
import * as React from 'react';
