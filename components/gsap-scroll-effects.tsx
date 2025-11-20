'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

/**
 * Global GSAP scroll effects provider
 * Adds smooth scrolling and magnetic cursor effects
 */
export function GSAPScrollEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll configuration (lightweight version without ScrollSmoother plugin)
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    // Magnetic cursor effect
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    // Magnetic effect on interactive elements
    const magneticElements = document.querySelectorAll(
      'button, a, [role="button"], [data-magnetic]'
    );

    magneticElements.forEach((element) => {
      const handleMouseEnter = () => {
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', moveCursor);

    // Parallax background decorations
    const decorations = document.querySelectorAll('[data-parallax-decoration]');
    decorations.forEach((decoration, index) => {
      const speed = 0.3 + index * 0.1;
      gsap.to(decoration, {
        y: () => -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: decoration,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('[data-gsap-fade]');
    fadeElements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Zoom in images on scroll
    const zoomImages = document.querySelectorAll('[data-gsap-zoom-scroll]');
    zoomImages.forEach((image) => {
      gsap.fromTo(
        image,
        {
          scale: 1.3,
          filter: 'brightness(0.7) blur(5px)',
        },
        {
          scale: 1,
          filter: 'brightness(1) blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    });

    // Rotate elements on scroll
    const rotateElements = document.querySelectorAll('[data-gsap-rotate]');
    rotateElements.forEach((element) => {
      gsap.to(element, {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold-leaf opacity-50 mix-blend-difference lg:block"
      />
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-leaf opacity-80 mix-blend-difference lg:block"
      />
    </>
  );
}

/**
 * Smooth scroll wrapper component
 */
export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    // Enable smooth scrolling
    const ctx = gsap.context(() => {
      // Smooth scroll behavior
      gsap.to(window, {
        scrollBehavior: 'smooth',
      });
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scrollRef} className="relative">
      {children}
    </div>
  );
}

/**
 * Scroll progress indicator
 */
export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === progressRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-white/10">
      <div
        ref={progressRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-gold-leaf via-purple-500 to-blue-500"
      />
    </div>
  );
}
