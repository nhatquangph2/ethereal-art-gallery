'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { DesktopHeader } from '@/components/ui/desktop-header';
import { ArtworkCard } from '@/components/gallery/artwork-card';
import { FeaturedCarousel } from '@/components/home/featured-carousel';
import { HorizontalGallery } from '@/components/home/horizontal-gallery';
import { StatsCounter } from '@/components/home/stats-counter';
import { GSAPScrollEffects, ScrollProgress } from '@/components/gsap-scroll-effects';
import { artworks } from '@/data/artworks';
import { getAudioManager } from '@/lib/audio-manager';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionTitleRef = useRef<HTMLDivElement>(null);

  const handleToggleMute = () => {
    const audioManager = getAudioManager();
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (newVolume: number) => {
    const audioManager = getAudioManager();
    audioManager.setMasterVolume(newVolume);
    setVolume(newVolume);
  };

  // GSAP Scroll animations for artwork grid
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('[data-artwork-card]');

    // Stagger animation for cards
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotateX: 15,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'start',
          ease: 'power2.out',
        },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Text reveal animation for section title
    if (sectionTitleRef.current) {
      const title = sectionTitleRef.current.querySelector('h2');
      const subtitle = sectionTitleRef.current.querySelector('p');

      if (title) {
        gsap.fromTo(
          title,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionTitleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (subtitle) {
        gsap.fromTo(
          subtitle,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionTitleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    const totalViews = artworks.reduce((sum, art) => sum + (art.views || 0), 0);
    const totalReactions = artworks.reduce((sum, art) => {
      const reactions = art.reactions || [];
      return sum + reactions.reduce((s, r) => s + r.count, 0);
    }, 0);
    const uniqueArtists = new Set(artworks.map(art => art.artist)).size;

    return {
      artworkCount: artworks.length,
      artistCount: uniqueArtists,
      totalViews,
      totalReactions,
    };
  }, []);

  // Featured artworks (top 3 by views)
  const featuredArtworks = useMemo(() => {
    return [...artworks]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 3);
  }, []);

  return (
    <SmoothScrollProvider>
      <GSAPScrollEffects />
      <ScrollProgress />
      <DesktopHeader />
      <div className="min-h-screen">
        {/* Featured Carousel Hero */}
        <FeaturedCarousel artworks={featuredArtworks} />

        {/* Stats Counter */}
        <StatsCounter
          artworkCount={stats.artworkCount}
          artistCount={stats.artistCount}
          totalViews={stats.totalViews}
          totalReactions={stats.totalReactions}
        />

        {/* Horizontal Gallery */}
        <HorizontalGallery title="Explore Our Collection" artworks={artworks} />

        {/* All Artworks Grid Section */}
        <section className="container mx-auto px-6 py-20">
          <div
            ref={sectionTitleRef}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-4xl font-semibold text-stone-gray md:text-5xl">
              All Artworks
            </h2>
            <p className="mt-4 text-stone-gray/60">
              Browse our complete collection of {artworks.length} artworks
            </p>
          </div>

          {/* Artwork Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            style={{ perspective: '1000px' }}
          >
            {artworks.map((artwork, index) => (
              <div key={artwork.id} data-artwork-card>
                <ArtworkCard artwork={artwork} index={index} />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-stone-gray/10 py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="font-display text-sm text-stone-gray/50">
              © 2024 The Ethereal Art Gallery
            </p>
            <p className="mt-2 text-xs text-stone-gray/40">
              Experience art through sound and motion
            </p>
          </div>
        </footer>

        {/* Bottom Navigation */}
        <BottomNavigation
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onVolumeChange={handleVolumeChange}
          currentVolume={volume}
        />
      </div>
    </SmoothScrollProvider>
  );
}
