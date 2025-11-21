'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Artwork } from '@/types/artwork';
import { useHaptic } from '@/lib/haptic';

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

export function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const { onTap } = useHaptic();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="group"
    >
      <Link
        href={`/artwork/${artwork.id}`}
        onClick={onTap}
        className="block"
      >
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl">
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-gray/5">
            <Image
              src={artwork.thumbnailImage}
              alt={artwork.title}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Hover Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-all duration-500 group-hover:opacity-100"
            >
              <p className="text-sm font-medium">{artwork.artist}</p>
              {artwork.year && (
                <p className="mt-1 text-xs opacity-80">{artwork.year}</p>
              )}
            </motion.div>
          </div>

          {/* Card Info */}
          <div className="p-4">
            <h3 className="font-display text-xl font-semibold text-stone-gray line-clamp-1">
              {artwork.title}
            </h3>
            <p className="mt-2 text-sm text-stone-gray/70 line-clamp-2">
              {artwork.description}
            </p>

            {/* Tags */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {artwork.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-cloud-blue px-3 py-1 text-xs font-medium text-stone-gray/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Light Bloom Effect on Hover */}
          <div className="pointer-events-none absolute -inset-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <div className="absolute inset-0 rounded-full bg-soft-sun blur-[60px]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
