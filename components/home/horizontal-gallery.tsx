'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Artwork } from '@/types/artwork';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalGalleryProps {
  title: string;
  artworks: Artwork[];
}

export function HorizontalGallery({ title, artworks }: HorizontalGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const x = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate cards with parallax effect as they scroll into view
    const cards = sectionRef.current.querySelectorAll('[data-horizontal-card]');

    cards.forEach((card, index) => {
      // Fade in and slide up animation
      gsap.fromTo(
        card,
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
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image zoom effect on hover
      const image = card.querySelector('img');
      if (image) {
        card.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.15,
            duration: 0.6,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [artworks]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold text-stone-gray md:text-5xl">
              {title}
            </h2>
            <p className="mt-2 text-stone-gray/60">
              Scroll horizontally to explore • {artworks.length} artworks
            </p>
          </motion.div>

          {/* Navigation Buttons (Desktop) */}
          <div className="hidden md:flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full glass transition-all hover:bg-white/40 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-stone-gray" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="flex h-12 w-12 items-center justify-center rounded-full glass transition-all hover:bg-white/40 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-stone-gray" />
            </motion.button>
          </div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div
          ref={scrollContainerRef}
          className="relative -mx-6 overflow-x-auto px-6 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <motion.div
            className="flex gap-6 pb-4"
            {...(!isMobile && {
              drag: "x",
              dragConstraints: scrollContainerRef,
              onDragStart: () => setIsDragging(true),
              onDragEnd: () => setIsDragging(false),
              style: { x: xSpring }
            })}
          >
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                data-horizontal-card
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex-shrink-0"
                style={{ width: '400px' }}
              >
                <Link
                  href={`/artwork/${artwork.id}`}
                  className={isDragging ? 'pointer-events-none' : ''}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl glass-strong bg-stone-gray/5">
                    {/* Image - Preserve aspect ratio with object-contain */}
                    <img
                      src={artwork.thumbnailImage}
                      alt={artwork.title}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Info Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <h3 className="font-display text-2xl font-bold text-white">
                        {artwork.title}
                      </h3>
                      <p className="mt-1 text-white/80">
                        {artwork.artist} • {artwork.year}
                      </p>

                      {/* Tags */}
                      {artwork.tags && artwork.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {artwork.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Stats */}
                      <div className="mt-4 flex items-center gap-4 text-white/80">
                        {artwork.views && (
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">{artwork.views}</span>
                          </div>
                        )}
                        {artwork.reactions && artwork.reactions.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">
                              {artwork.reactions.reduce((sum, r) => sum + r.count, 0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-gold-leaf opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Title Below (Always Visible) */}
                  <div className="mt-4 px-2">
                    <h4 className="font-display text-lg font-semibold text-stone-gray line-clamp-1">
                      {artwork.title}
                    </h4>
                    <p className="text-sm text-stone-gray/60">
                      {artwork.artist}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* End Spacer */}
            <div className="w-px flex-shrink-0" />
          </motion.div>
        </div>

        {/* Mobile Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 text-center text-sm text-stone-gray/50 md:hidden"
        >
          ← Swipe to explore →
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
