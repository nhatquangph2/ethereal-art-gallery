'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageEffect } from '@/types/artwork';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Image effect animation configurations
 * Maps effect types to GSAP animation properties
 */
export const imageEffects: Record<
  ImageEffect,
  {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
  }
> = {
  zoom_in_center: {
    from: { scale: 1, transformOrigin: 'center center' },
    to: { scale: 1.15, transformOrigin: 'center center', ease: 'power2.inOut' },
  },
  zoom_out: {
    from: { scale: 1.15, transformOrigin: 'center center' },
    to: { scale: 1, transformOrigin: 'center center', ease: 'power2.inOut' },
  },
  pan_left: {
    from: { x: 0, scale: 1.1 },
    to: { x: '-5%', scale: 1.1, ease: 'power1.inOut' },
  },
  pan_right: {
    from: { x: 0, scale: 1.1 },
    to: { x: '5%', scale: 1.1, ease: 'power1.inOut' },
  },
  pan_up: {
    from: { y: 0, scale: 1.1 },
    to: { y: '-5%', scale: 1.1, ease: 'power1.inOut' },
  },
  pan_down: {
    from: { y: 0, scale: 1.1 },
    to: { y: '5%', scale: 1.1, ease: 'power1.inOut' },
  },
  pan_left_down: {
    from: { x: 0, y: 0, scale: 1.15 },
    to: { x: '-4%', y: '4%', scale: 1.15, ease: 'power1.inOut' },
  },
  pan_right_up: {
    from: { x: 0, y: 0, scale: 1.15 },
    to: { x: '4%', y: '-4%', scale: 1.15, ease: 'power1.inOut' },
  },
  rotate_subtle: {
    from: { rotation: -1, scale: 1.05, transformOrigin: 'center center' },
    to: { rotation: 1, scale: 1.05, transformOrigin: 'center center', ease: 'sine.inOut' },
  },
  scale_breathe: {
    from: { scale: 1 },
    to: { scale: 1.08, ease: 'sine.inOut' },
  },
};

/**
 * Create a scrollytelling animation for an image
 */
export function createImageScrollAnimation(
  imageElement: HTMLElement,
  effect: ImageEffect,
  scrollTriggerConfig: {
    trigger: HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
  }
): ScrollTrigger {
  const animation = imageEffects[effect];

  // Set initial state
  gsap.set(imageElement, animation.from);

  // Create animation
  const tween = gsap.to(imageElement, {
    ...animation.to,
    scrollTrigger: {
      trigger: scrollTriggerConfig.trigger,
      start: scrollTriggerConfig.start || 'top center',
      end: scrollTriggerConfig.end || 'bottom center',
      scrub: scrollTriggerConfig.scrub !== undefined ? scrollTriggerConfig.scrub : 1,
      markers: scrollTriggerConfig.markers || false,
      toggleActions: 'play none none reverse',
    },
  });

  return tween.scrollTrigger!;
}

/**
 * Create a text reveal animation
 */
export function createTextRevealAnimation(
  textElement: HTMLElement,
  scrollTriggerConfig: {
    trigger?: HTMLElement;
    start?: string;
    end?: string;
  }
): ScrollTrigger {
  const trigger = scrollTriggerConfig.trigger || textElement;

  gsap.set(textElement, {
    opacity: 0,
    y: 30,
  });

  const tween = gsap.to(textElement, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger,
      start: scrollTriggerConfig.start || 'top 80%',
      end: scrollTriggerConfig.end || 'top 50%',
      toggleActions: 'play none none reverse',
    },
  });

  return tween.scrollTrigger!;
}

/**
 * Create a sticky image effect (image stays while text scrolls)
 */
export function createStickyImageEffect(
  imageContainer: HTMLElement,
  contentContainer: HTMLElement
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: contentContainer,
    start: 'top top',
    end: 'bottom bottom',
    pin: imageContainer,
    pinSpacing: false,
  });
}

/**
 * Create a progress indicator animation
 */
export function createProgressAnimation(
  progressElement: HTMLElement,
  container: HTMLElement
): ScrollTrigger {
  gsap.set(progressElement, {
    scaleX: 0,
    transformOrigin: 'left center',
  });

  const tween = gsap.to(progressElement, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
    },
  });

  return tween.scrollTrigger!;
}

/**
 * Batch refresh all ScrollTriggers (useful after layout changes)
 */
export function refreshScrollTriggers(): void {
  ScrollTrigger.refresh();
}

/**
 * Kill all ScrollTriggers (cleanup)
 */
export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Create a parallax effect
 */
export function createParallaxEffect(
  element: HTMLElement,
  speed: number = 0.5,
  trigger?: HTMLElement
): ScrollTrigger {
  const tween = gsap.to(element, {
    y: (i, target) => {
      const elementHeight = target.offsetHeight;
      return -elementHeight * speed;
    },
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });

  return tween.scrollTrigger!;
}

/**
 * Create a fade in/out on scroll effect
 */
export function createFadeOnScroll(
  element: HTMLElement,
  scrollTriggerConfig: {
    trigger?: HTMLElement;
    start?: string;
    end?: string;
    fadeIn?: boolean;
  }
): ScrollTrigger {
  const trigger = scrollTriggerConfig.trigger || element;
  const fadeIn = scrollTriggerConfig.fadeIn !== false;

  gsap.set(element, {
    opacity: fadeIn ? 0 : 1,
  });

  const tween = gsap.to(element, {
    opacity: fadeIn ? 1 : 0,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger,
      start: scrollTriggerConfig.start || 'top 75%',
      end: scrollTriggerConfig.end || 'top 25%',
      scrub: 1,
    },
  });

  return tween.scrollTrigger!;
}

/**
 * Create a timeline for complex scroll animations
 */
export function createScrollTimeline(
  trigger: HTMLElement,
  animations: Array<{
    target: HTMLElement;
    from?: gsap.TweenVars;
    to: gsap.TweenVars;
    position?: string;
  }>,
  config?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
  }
): gsap.core.Timeline {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: config?.start || 'top center',
      end: config?.end || 'bottom center',
      scrub: config?.scrub !== undefined ? config.scrub : 1,
    },
  });

  animations.forEach(({ target, from, to, position }) => {
    if (from) {
      gsap.set(target, from);
    }
    timeline.to(target, to, position);
  });

  return timeline;
}
