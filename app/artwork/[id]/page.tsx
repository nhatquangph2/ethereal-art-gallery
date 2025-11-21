'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ZoomIn, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { DesktopHeader } from '@/components/ui/desktop-header';
import { QRShareButton } from '@/components/ui/qr-share-button';
import { DeepZoomViewer } from '@/components/gallery/deep-zoom-viewer';
import { getArtworkById, getRecommendedArtworks } from '@/data/artworks';
import { ArtworkCard } from '@/components/gallery/artwork-card';
import { useAdaptiveAudio, useScrollAudio } from '@/lib/use-adaptive-audio';
import { useImageScrollAnimation, useInView, useTextReveal } from '@/lib/use-scrollytelling';
import { useHaptic } from '@/lib/haptic';
import { StorySegment } from '@/types/artwork';

function StorySegmentComponent({
  segment,
  index,
  audioControl,
}: {
  segment: StorySegment;
  index: number;
  audioControl: any;
}) {
  const segmentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView<HTMLDivElement>(segmentRef, { start: 'top 60%', end: 'bottom 40%' });

  // Trigger audio when segment comes into view
  useScrollAudio(segment.id, audioControl, isInView);

  // Text reveal animation
  useTextReveal(textRef, segmentRef);

  return (
    <div ref={segmentRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-3xl"
      >
        <div className="glass-strong rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-gold-leaf" />
            <span className="text-sm font-medium text-stone-gray/60">
              Đoạn {index + 1}
            </span>
          </div>
          <p
            ref={textRef}
            className="font-display text-2xl leading-relaxed text-stone-gray md:text-3xl"
          >
            {segment.text}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ArtworkPage() {
  const params = useParams();
  const router = useRouter();
  const { onTap } = useHaptic();
  const [showZoomViewer, setShowZoomViewer] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);

  const artwork = getArtworkById(params.id as string);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!artwork) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-stone-gray">
            Artwork not found
          </h1>
          <button
            onClick={() => router.push('/')}
            className="mt-6 rounded-full bg-stone-gray px-6 py-3 text-white"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  const audioControl = useAdaptiveAudio({
    artwork,
    autoPlay: true,
    ambientVolume: 0.3,
    layerVolume: 0.5,
  });

  const recommendedArtworks = getRecommendedArtworks(artwork.id);

  useEffect(() => {
    // Start ambient audio on mount
    if (audioControl.isReady) {
      audioControl.playAmbient();
    }

    return () => {
      audioControl.stopAmbient();
      audioControl.stopAllLayers();
    };
  }, [audioControl.isReady]);

  const handleToggleMute = () => {
    audioControl.toggleMute();
    setIsMuted(audioControl.isMuted);
  };

  const handleVolumeChange = (newVolume: number) => {
    audioControl.setVolume(newVolume);
    setVolume(newVolume);
  };

  return (
    <SmoothScrollProvider>
      <DesktopHeader />
      <div className="min-h-screen">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed left-6 top-24 z-40 hidden md:block"
        >
          <button
            onClick={() => {
              onTap();
              router.push('/');
            }}
            className="glass-strong flex items-center gap-2 rounded-full px-6 py-3 shadow-xl transition-all hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 text-stone-gray" />
            <span className="font-medium text-stone-gray">Gallery</span>
          </button>
        </motion.div>

        {/* Action Buttons (Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed right-6 top-24 z-40 hidden md:flex md:flex-col md:gap-3"
        >
          <QRShareButton
            url={`/artwork/${artwork.id}`}
            title={artwork.title}
            artist={artwork.artist}
          />
          <button
            onClick={() => {
              onTap();
              setShowZoomViewer(true);
            }}
            className="glass-strong flex items-center gap-2 rounded-full px-6 py-3 shadow-xl transition-all hover:scale-105"
          >
            <ZoomIn className="h-5 w-5 text-stone-gray" />
            <span className="font-medium text-stone-gray">Deep Zoom</span>
          </button>
        </motion.div>

        {/* Mobile Share Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-6 z-40 md:hidden"
        >
          <QRShareButton
            url={`/artwork/${artwork.id}`}
            title={artwork.title}
            artist={artwork.artist}
          />
        </motion.div>

        {/* Hero Section with Sticky Image */}
        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Sticky Image Container */}
            <div className="sticky top-0 h-screen w-full">
              <div ref={imageRef} className="relative h-full w-full">
                <Image
                  src={artwork.baseImage}
                  alt={artwork.title}
                  fill
                  className="object-cover gpu-accelerated"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
              </div>
            </div>

            {/* Scrolling Content */}
            <div ref={contentRef} className="relative bg-cloud-blue/80 backdrop-blur-sm">
              {/* Title Section */}
              <div className="min-h-screen flex items-center justify-center px-6 py-20">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="max-w-2xl text-center"
                >
                  <h1 className="font-display text-5xl font-bold text-stone-gray md:text-6xl lg:text-7xl">
                    {artwork.title}
                  </h1>
                  <p className="mt-6 text-xl text-stone-gray/70 md:text-2xl">
                    {artwork.artist}
                  </p>
                  {artwork.year && (
                    <p className="mt-3 text-lg text-stone-gray/50">{artwork.year}</p>
                  )}
                  {artwork.medium && (
                    <p className="mt-2 text-base text-stone-gray/60">{artwork.medium}</p>
                  )}
                  {artwork.dimensions && (
                    <p className="mt-1 text-sm text-stone-gray/50">{artwork.dimensions}</p>
                  )}

                  <div className="mt-12">
                    <p className="mx-auto max-w-xl text-lg leading-relaxed text-stone-gray/70">
                      {artwork.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {artwork.tags && artwork.tags.length > 0 && (
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      {artwork.tags.map((tag) => (
                        <span
                          key={tag}
                          className="glass rounded-full px-4 py-2 text-sm font-medium text-stone-gray/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Story Segments */}
              {artwork.storySegments.map((segment, index) => (
                <StorySegmentComponent
                  key={segment.id}
                  segment={segment}
                  index={index}
                  audioControl={audioControl}
                />
              ))}

              {/* Closing Section */}
              <div className="min-h-screen flex items-center justify-center px-6 py-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="max-w-2xl text-center"
                >
                  <div className="glass-strong rounded-3xl p-12">
                    <h2 className="font-display text-3xl font-semibold text-stone-gray md:text-4xl">
                      Cảm ơn bạn đã trải nghiệm
                    </h2>
                    <p className="mt-4 text-lg text-stone-gray/60">
                      Mỗi tác phẩm là một hành trình. Hãy khám phá thêm những câu chuyện khác.
                    </p>
                    <button
                      onClick={() => {
                        onTap();
                        router.push('/');
                      }}
                      className="mt-8 rounded-full bg-stone-gray px-8 py-4 font-medium text-white transition-all hover:scale-105 hover:bg-midnight-depth"
                    >
                      Back to Gallery
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Artworks */}
        {recommendedArtworks.length > 0 && (
          <section className="border-t border-stone-gray/10 bg-white py-20">
            <div className="container mx-auto px-6">
              <h2 className="mb-12 text-center font-display text-4xl font-semibold text-stone-gray">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recommendedArtworks.map((rec, index) => (
                  <ArtworkCard key={rec.id} artwork={rec} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Navigation */}
        <BottomNavigation
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onVolumeChange={handleVolumeChange}
          currentVolume={volume}
        />

        {/* Deep Zoom Modal */}
        <AnimatePresence>
          {showZoomViewer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90"
            >
              <DeepZoomViewer
                imageUrl={artwork.baseImage}
                title={artwork.title}
                onClose={() => setShowZoomViewer(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScrollProvider>
  );
}
