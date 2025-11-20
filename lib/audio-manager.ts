import { Howl, Howler } from 'howler';
import { AudioLayer } from '@/types/artwork';

/**
 * AudioManager - Manages multi-layered adaptive audio for artworks
 * Handles ambient loops and story segment audio layers with smooth transitions
 */
export class AudioManager {
  private ambientSound: Howl | null = null;
  private audioLayers: Map<string, Howl> = new Map();
  private activeLayers: Set<string> = new Set();
  private fadeDuration: number = 1500; // ms
  private masterVolume: number = 1.0;

  constructor() {
    // Set global Howler settings
    Howler.volume(this.masterVolume);
  }

  /**
   * Load and play ambient background loop
   */
  loadAmbient(src: string, volume: number = 0.3): void {
    if (this.ambientSound) {
      this.stopAmbient();
    }

    this.ambientSound = new Howl({
      src: [src],
      loop: true,
      volume: 0,
      html5: true, // Use HTML5 Audio for better mobile support
      preload: true,
    });

    this.ambientSound.play();
    this.ambientSound.fade(0, volume, this.fadeDuration);
  }

  /**
   * Stop ambient sound with fade out
   */
  stopAmbient(): void {
    if (!this.ambientSound) return;

    this.ambientSound.fade(this.ambientSound.volume(), 0, this.fadeDuration);
    setTimeout(() => {
      this.ambientSound?.stop();
      this.ambientSound?.unload();
      this.ambientSound = null;
    }, this.fadeDuration);
  }

  /**
   * Load an audio layer (preload for performance)
   */
  loadLayer(id: string, src: string, volume: number = 0.5): void {
    if (this.audioLayers.has(id)) return;

    const layer = new Howl({
      src: [src],
      loop: false,
      volume: 0,
      html5: true,
      preload: true,
    });

    this.audioLayers.set(id, layer);
  }

  /**
   * Play and fade in a layer
   */
  playLayer(id: string, targetVolume: number = 0.5): void {
    const layer = this.audioLayers.get(id);
    if (!layer) {
      console.warn(`Audio layer "${id}" not found. Make sure to load it first.`);
      return;
    }

    // If already playing, don't restart
    if (this.activeLayers.has(id) && layer.playing()) {
      return;
    }

    this.activeLayers.add(id);
    layer.volume(0);
    layer.play();
    layer.fade(0, targetVolume, this.fadeDuration);
  }

  /**
   * Fade out and stop a layer
   */
  stopLayer(id: string): void {
    const layer = this.audioLayers.get(id);
    if (!layer || !this.activeLayers.has(id)) return;

    const currentVolume = layer.volume();
    layer.fade(currentVolume, 0, this.fadeDuration);

    setTimeout(() => {
      layer.stop();
      this.activeLayers.delete(id);
    }, this.fadeDuration);
  }

  /**
   * Stop all active layers
   */
  stopAllLayers(): void {
    this.activeLayers.forEach((id) => {
      this.stopLayer(id);
    });
  }

  /**
   * Set master volume (affects all sounds)
   */
  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    Howler.volume(this.masterVolume);
  }

  /**
   * Get master volume
   */
  getMasterVolume(): number {
    return this.masterVolume;
  }

  /**
   * Mute/unmute all audio
   */
  toggleMute(): boolean {
    const isMuted = Howler.volume() === 0;
    if (isMuted) {
      Howler.volume(this.masterVolume);
      return false;
    } else {
      Howler.volume(0);
      return true;
    }
  }

  /**
   * Check if audio is muted
   */
  isMuted(): boolean {
    return Howler.volume() === 0;
  }

  /**
   * Clean up all audio resources
   */
  cleanup(): void {
    this.stopAmbient();
    this.stopAllLayers();

    this.audioLayers.forEach((layer) => {
      layer.unload();
    });

    this.audioLayers.clear();
    this.activeLayers.clear();
  }

  /**
   * Preload multiple layers at once
   */
  preloadLayers(layers: Array<{ id: string; src: string; volume?: number }>): void {
    layers.forEach(({ id, src, volume }) => {
      this.loadLayer(id, src, volume);
    });
  }

  /**
   * Get current state for debugging
   */
  getState(): {
    ambientPlaying: boolean;
    activeLayers: string[];
    totalLayers: number;
    masterVolume: number;
    isMuted: boolean;
  } {
    return {
      ambientPlaying: this.ambientSound?.playing() || false,
      activeLayers: Array.from(this.activeLayers),
      totalLayers: this.audioLayers.size,
      masterVolume: this.masterVolume,
      isMuted: this.isMuted(),
    };
  }
}

// Singleton instance for global use
let audioManagerInstance: AudioManager | null = null;

/**
 * Get or create AudioManager singleton instance
 */
export function getAudioManager(): AudioManager {
  if (!audioManagerInstance) {
    audioManagerInstance = new AudioManager();
  }
  return audioManagerInstance;
}

/**
 * Clean up singleton instance
 */
export function destroyAudioManager(): void {
  if (audioManagerInstance) {
    audioManagerInstance.cleanup();
    audioManagerInstance = null;
  }
}
