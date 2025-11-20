'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getAudioManager, destroyAudioManager } from './audio-manager';
import { Artwork } from '@/types/artwork';

interface UseAdaptiveAudioOptions {
  artwork: Artwork;
  autoPlay?: boolean;
  ambientVolume?: number;
  layerVolume?: number;
}

interface UseAdaptiveAudioReturn {
  playAmbient: () => void;
  stopAmbient: () => void;
  playLayer: (segmentId: string) => void;
  stopLayer: (segmentId: string) => void;
  stopAllLayers: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  isMuted: boolean;
  volume: number;
  isReady: boolean;
}

/**
 * React hook for managing adaptive audio in artwork components
 * Handles ambient loops and segment-based audio layers with scroll synchronization
 */
export function useAdaptiveAudio({
  artwork,
  autoPlay = false,
  ambientVolume = 0.3,
  layerVolume = 0.5,
}: UseAdaptiveAudioOptions): UseAdaptiveAudioReturn {
  const audioManager = useRef(getAudioManager());
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(1.0);
  const [isReady, setIsReady] = useState(false);

  // Preload all audio assets
  useEffect(() => {
    const manager = audioManager.current;

    // Preload ambient if available
    if (artwork.audioAmbient) {
      // Ambient will be loaded when playAmbient is called
      if (autoPlay) {
        manager.loadAmbient(artwork.audioAmbient, ambientVolume);
      }
    }

    // Preload all segment layers
    const layersToPreload = artwork.storySegments
      .filter((segment) => segment.audioLayer)
      .map((segment) => ({
        id: segment.id,
        src: segment.audioLayer!,
        volume: layerVolume,
      }));

    manager.preloadLayers(layersToPreload);

    // Mark as ready after a short delay to ensure preloading
    setTimeout(() => {
      setIsReady(true);
    }, 500);

    // Cleanup on unmount
    return () => {
      manager.stopAmbient();
      manager.stopAllLayers();
    };
  }, [artwork, autoPlay, ambientVolume, layerVolume]);

  const playAmbient = useCallback(() => {
    if (artwork.audioAmbient) {
      audioManager.current.loadAmbient(artwork.audioAmbient, ambientVolume);
    }
  }, [artwork.audioAmbient, ambientVolume]);

  const stopAmbient = useCallback(() => {
    audioManager.current.stopAmbient();
  }, []);

  const playLayer = useCallback(
    (segmentId: string) => {
      const segment = artwork.storySegments.find((s) => s.id === segmentId);
      if (segment?.audioLayer) {
        audioManager.current.playLayer(segmentId, layerVolume);
      }
    },
    [artwork.storySegments, layerVolume]
  );

  const stopLayer = useCallback((segmentId: string) => {
    audioManager.current.stopLayer(segmentId);
  }, []);

  const stopAllLayers = useCallback(() => {
    audioManager.current.stopAllLayers();
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    audioManager.current.setMasterVolume(newVolume);
    setVolumeState(newVolume);
  }, []);

  const toggleMute = useCallback(() => {
    const muted = audioManager.current.toggleMute();
    setIsMuted(muted);
  }, []);

  return {
    playAmbient,
    stopAmbient,
    playLayer,
    stopLayer,
    stopAllLayers,
    setVolume,
    toggleMute,
    isMuted,
    volume,
    isReady,
  };
}

/**
 * Hook for scroll-triggered audio layers
 * Automatically plays/stops audio layers based on scroll position
 */
export function useScrollAudio(
  segmentId: string,
  audioControl: UseAdaptiveAudioReturn,
  isInView: boolean
) {
  const prevInView = useRef(isInView);

  useEffect(() => {
    // Only trigger on state change
    if (isInView && !prevInView.current) {
      // Entering view - play layer
      audioControl.playLayer(segmentId);
    } else if (!isInView && prevInView.current) {
      // Leaving view - stop layer
      audioControl.stopLayer(segmentId);
    }

    prevInView.current = isInView;
  }, [isInView, segmentId, audioControl]);
}
