import { client, urlFor, getFileUrl } from './sanity';
import type { Artwork } from '@/types/artwork';

/**
 * GROQ queries for fetching artwork data from Sanity
 */

const artworkQuery = `
  *[_type == "artwork" && published == true] | order(order asc) {
    _id,
    title,
    "id": slug.current,
    artist,
    year,
    medium,
    dimensions,
    description,
    baseImage,
    thumbnailImage,
    audioAmbient,
    tags,
    dominantColors,
    storySegments[] {
      text,
      audioLayer,
      imageEffect,
      duration
    }
  }
`;

const singleArtworkQuery = `
  *[_type == "artwork" && slug.current == $slug && published == true][0] {
    _id,
    title,
    "id": slug.current,
    artist,
    year,
    medium,
    dimensions,
    description,
    baseImage,
    thumbnailImage,
    audioAmbient,
    tags,
    dominantColors,
    storySegments[] {
      text,
      audioLayer,
      imageEffect,
      duration
    }
  }
`;

/**
 * Transform Sanity artwork to app Artwork type
 */
function transformArtwork(sanityArtwork: any): Artwork {
  return {
    id: sanityArtwork.id,
    title: sanityArtwork.title,
    artist: sanityArtwork.artist,
    year: sanityArtwork.year,
    medium: sanityArtwork.medium,
    dimensions: sanityArtwork.dimensions,
    description: sanityArtwork.description,
    baseImage: sanityArtwork.baseImage
      ? urlFor(sanityArtwork.baseImage).width(2000).url()
      : '',
    thumbnailImage: sanityArtwork.thumbnailImage
      ? urlFor(sanityArtwork.thumbnailImage).width(600).height(800).url()
      : '',
    audioAmbient: sanityArtwork.audioAmbient?.asset?._ref
      ? getFileUrl(sanityArtwork.audioAmbient.asset._ref)
      : undefined,
    tags: sanityArtwork.tags || [],
    dominantColors: sanityArtwork.dominantColors?.map((c: any) => c.hex) || [],
    storySegments: (sanityArtwork.storySegments || []).map((segment: any, index: number) => ({
      id: `seg_${index + 1}`,
      text: segment.text,
      audioLayer: segment.audioLayer?.asset?._ref
        ? getFileUrl(segment.audioLayer.asset._ref)
        : undefined,
      imageEffect: segment.imageEffect,
      duration: segment.duration,
    })),
  };
}

/**
 * Get all published artworks
 */
export async function getAllArtworks(): Promise<Artwork[]> {
  const artworks = await client.fetch<any[]>(artworkQuery);
  return artworks.map(transformArtwork);
}

/**
 * Get single artwork by slug/ID
 */
export async function getArtworkById(id: string): Promise<Artwork | null> {
  const artwork = await client.fetch<any>(singleArtworkQuery, { slug: id } as any);
  return artwork ? transformArtwork(artwork) : null;
}

/**
 * Get artworks by tag (for mood-based filtering)
 */
export async function getArtworksByTag(tag: string): Promise<Artwork[]> {
  const query = `
    *[_type == "artwork" && published == true && $tag in tags] | order(order asc) {
      _id,
      title,
      "id": slug.current,
      artist,
      year,
      medium,
      dimensions,
      description,
      baseImage,
      thumbnailImage,
      audioAmbient,
      tags,
      dominantColors,
      storySegments[] {
        text,
        audioLayer,
        imageEffect,
        duration
      }
    }
  `;
  const artworks = await client.fetch<any[]>(query, { tag } as any);
  return artworks.map(transformArtwork);
}

/**
 * Get recommended artworks based on current artwork
 */
export async function getRecommendedArtworks(
  currentId: string,
  limit: number = 3
): Promise<Artwork[]> {
  // First get the current artwork to find its tags
  const currentArtwork = await getArtworkById(currentId);
  if (!currentArtwork || !currentArtwork.tags?.length) {
    // Return random artworks if no tags
    const allArtworks = await getAllArtworks();
    return allArtworks.filter((a) => a.id !== currentId).slice(0, limit);
  }

  // Find artworks with similar tags
  const query = `
    *[_type == "artwork" && published == true && slug.current != $currentId && count((tags[])[@ in $tags]) > 0] | order(count((tags[])[@ in $tags]) desc) [0...${limit}] {
      _id,
      title,
      "id": slug.current,
      artist,
      year,
      medium,
      dimensions,
      description,
      baseImage,
      thumbnailImage,
      audioAmbient,
      tags,
      dominantColors,
      storySegments[] {
        text,
        audioLayer,
        imageEffect,
        duration
      }
    }
  `;

  const artworks = await client.fetch<any[]>(query, {
    currentId,
    tags: currentArtwork.tags,
  } as any);
  return artworks.map(transformArtwork);
}
