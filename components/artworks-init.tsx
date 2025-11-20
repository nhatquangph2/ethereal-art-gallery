'use client';

import { useEffect } from 'react';
import { artworks } from '@/data/artworks';

export function ArtworksInit() {
  useEffect(() => {
    // Initialize artworks in localStorage if not exists
    const storedArtworks = localStorage.getItem('ethereal_artworks');

    if (!storedArtworks) {
      // First time - save all artworks from data file
      localStorage.setItem('ethereal_artworks', JSON.stringify(artworks));
      console.log('✅ Initialized artworks in localStorage:', artworks.length, 'artworks');
    } else {
      // Check if we need to update with new artworks
      const existing = JSON.parse(storedArtworks);
      const existingIds = existing.map((a: any) => a.id);

      // Add any new artworks from data file that don't exist yet
      const newArtworks = artworks.filter(a => !existingIds.includes(a.id));

      if (newArtworks.length > 0) {
        const updated = [...existing, ...newArtworks];
        localStorage.setItem('ethereal_artworks', JSON.stringify(updated));
        console.log('✅ Added', newArtworks.length, 'new artworks to localStorage');
      }
    }
  }, []);

  return null;
}
