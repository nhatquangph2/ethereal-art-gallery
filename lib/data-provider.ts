/**
 * Hybrid Data Provider
 * Switches between static JSON and Sanity CMS based on configuration
 */

import type { Artwork } from '@/types/artwork';

// Check if Sanity is configured
const useSanity =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_DATASET;

/**
 * Get all artworks (hybrid - uses Sanity if configured, else static JSON)
 */
export async function getAllArtworks(): Promise<Artwork[]> {
  if (useSanity) {
    try {
      const { getAllArtworks: getSanityArtworks } = await import(
        './sanity-queries'
      );
      return await getSanityArtworks();
    } catch (error) {
      console.error('Sanity fetch failed, falling back to static data:', error);
      return getStaticArtworks();
    }
  }
  return getStaticArtworks();
}

/**
 * Get single artwork by ID
 */
export async function getArtworkById(id: string): Promise<Artwork | null> {
  if (useSanity) {
    try {
      const { getArtworkById: getSanityArtwork } = await import(
        './sanity-queries'
      );
      return await getSanityArtwork(id);
    } catch (error) {
      console.error('Sanity fetch failed, falling back to static data:', error);
      return getStaticArtworkById(id);
    }
  }
  return getStaticArtworkById(id);
}

/**
 * Get artworks by tag
 */
export async function getArtworksByTag(tag: string): Promise<Artwork[]> {
  if (useSanity) {
    try {
      const { getArtworksByTag: getSanityArtworksByTag } = await import(
        './sanity-queries'
      );
      return await getSanityArtworksByTag(tag);
    } catch (error) {
      console.error('Sanity fetch failed, falling back to static data:', error);
      return getStaticArtworksByTag(tag);
    }
  }
  return getStaticArtworksByTag(tag);
}

/**
 * Get recommended artworks
 */
export async function getRecommendedArtworks(
  currentId: string,
  limit: number = 3
): Promise<Artwork[]> {
  if (useSanity) {
    try {
      const { getRecommendedArtworks: getSanityRecommended } = await import(
        './sanity-queries'
      );
      return await getSanityRecommended(currentId, limit);
    } catch (error) {
      console.error('Sanity fetch failed, falling back to static data:', error);
      return getStaticRecommendedArtworks(currentId, limit);
    }
  }
  return getStaticRecommendedArtworks(currentId, limit);
}

/**
 * Static data fallback functions
 */
function getStaticArtworks(): Artwork[] {
  const { artworks } = require('@/data/artworks');
  return artworks;
}

function getStaticArtworkById(id: string): Artwork | null {
  const { getArtworkById } = require('@/data/artworks');
  return getArtworkById(id) || null;
}

function getStaticArtworksByTag(tag: string): Artwork[] {
  const { getArtworksByTag } = require('@/data/artworks');
  return getArtworksByTag(tag);
}

function getStaticRecommendedArtworks(
  currentId: string,
  limit: number
): Artwork[] {
  const { getRecommendedArtworks } = require('@/data/artworks');
  return getRecommendedArtworks(currentId, limit);
}

/**
 * Check if using Sanity
 */
export function isSanityEnabled(): boolean {
  return Boolean(useSanity);
}
