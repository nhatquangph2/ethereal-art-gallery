'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Advanced GSAP scroll animations hook
 * Provides sophisticated scrollytelling effects
 */
export function useGSAPScroll() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Smooth scroll configuration
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    // Parallax effect for hero images
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute('data-parallax-speed') || '0.5';
      gsap.to(element, {
        y: () => window.innerHeight * parseFloat(speed),
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // Fade in with stagger for cards
    const cards = document.querySelectorAll('[data-gsap-card]');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Pin and scale effect for stats section
    const statsSection = document.querySelector('[data-gsap-stats]');
    if (statsSection) {
      gsap.to(statsSection, {
        scrollTrigger: {
          trigger: statsSection,
          start: 'top top',
          end: 'bottom center',
          pin: true,
          pinSpacing: false,
          scrub: 1,
        },
      });
    }

    // Text reveal animations
    const textReveals = document.querySelectorAll('[data-gsap-reveal]');
    textReveals.forEach((element) => {
      const words = element.textContent?.split(' ') || [];
      element.innerHTML = words
        .map((word) => `<span class="inline-block">${word}</span>`)
        .join(' ');

      const wordSpans = element.querySelectorAll('span');
      gsap.fromTo(
        wordSpans,
        {
          opacity: 0,
          y: 50,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Image zoom effect on scroll
    const zoomImages = document.querySelectorAll('[data-gsap-zoom]');
    zoomImages.forEach((image) => {
      gsap.fromTo(
        image,
        {
          scale: 1.2,
          filter: 'brightness(0.7)',
        },
        {
          scale: 1,
          filter: 'brightness(1)',
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'top center',
            scrub: 1,
          },
        }
      );
    });

    // Horizontal scroll section
    const horizontalSection = document.querySelector('[data-gsap-horizontal]');
    if (horizontalSection) {
      const scrollContent = horizontalSection.querySelector('[data-gsap-horizontal-content]');
      if (scrollContent) {
        const scrollWidth = scrollContent.scrollWidth - window.innerWidth;

        gsap.to(scrollContent, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalSection,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }
    }

    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('[data-gsap-magnetic]');
    magneticElements.forEach((element) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = (element as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        });
      };

      element.addEventListener('mousemove', handleMouseMove as EventListener);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Refresh ScrollTrigger on window resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
}

/**
 * Custom timeline-based animation hook
 */
export function useGSAPTimeline(
  targets: string,
  animations: gsap.TweenVars[],
  scrollTriggerConfig?: ScrollTrigger.Vars
) {
  useEffect(() => {
    const elements = document.querySelectorAll(targets);
    if (elements.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
    });

    animations.forEach((animation) => {
      tl.to(elements, animation);
    });

    return () => {
      tl.kill();
    };
  }, [targets, animations, scrollTriggerConfig]);
}

/**
 * Parallax layers effect
 */
export function useParallaxLayers(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!containerRef.current) return;

    const layers = containerRef.current.querySelectorAll('[data-parallax-layer]');

    layers.forEach((layer, index) => {
      const speed = 0.2 + index * 0.1; // Increasing speed for each layer

      gsap.to(layer, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [containerRef]);
}
