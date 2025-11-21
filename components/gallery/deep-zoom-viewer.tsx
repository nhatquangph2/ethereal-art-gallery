'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';
import { useHaptic } from '@/lib/haptic';

// Import OpenSeadragon types
type OpenSeadragonViewer = any;

interface DeepZoomViewerProps {
  imageUrl: string;
  title?: string;
  onClose?: () => void;
}

export function DeepZoomViewer({ imageUrl, title, onClose }: DeepZoomViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const osdViewerRef = useRef<OpenSeadragonViewer | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { onTap } = useHaptic();

  useEffect(() => {
    if (!viewerRef.current) return;

    // Dynamically import OpenSeadragon only on client side
    import('openseadragon').then((OpenSeadragon) => {
      if (!viewerRef.current) return;

      // Initialize OpenSeadragon
      const viewer = OpenSeadragon.default({
      element: viewerRef.current,
      prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@4.1/build/openseadragon/images/',
      tileSources: {
        type: 'image',
        url: imageUrl,
      },
      showNavigationControl: false,
      showNavigator: true,
      navigatorPosition: 'BOTTOM_RIGHT',
      navigatorAutoFade: true,
      minZoomLevel: 0.8,
      maxZoomLevel: 5,
      visibilityRatio: 0.8,
      constrainDuringPan: true,
      animationTime: 1.2,
      springStiffness: 8,
      gestureSettingsMouse: {
        scrollToZoom: true,
        clickToZoom: false,
      },
      gestureSettingsTouch: {
        pinchToZoom: true,
        flickEnabled: true,
      },
    });

      osdViewerRef.current = viewer;
    });

    return () => {
      if (osdViewerRef.current) {
        osdViewerRef.current.destroy();
      }
    };
  }, [imageUrl]);

  const handleZoomIn = () => {
    onTap();
    if (osdViewerRef.current) {
      const currentZoom = osdViewerRef.current.viewport.getZoom();
      osdViewerRef.current.viewport.zoomTo(currentZoom * 1.5);
    }
  };

  const handleZoomOut = () => {
    onTap();
    if (osdViewerRef.current) {
      const currentZoom = osdViewerRef.current.viewport.getZoom();
      osdViewerRef.current.viewport.zoomTo(currentZoom / 1.5);
    }
  };

  const handleReset = () => {
    onTap();
    if (osdViewerRef.current) {
      osdViewerRef.current.viewport.goHome();
    }
  };

  const handleFullscreen = () => {
    onTap();
    if (osdViewerRef.current) {
      if (!isFullscreen) {
        osdViewerRef.current.setFullScreen(true);
        setIsFullscreen(true);
      } else {
        osdViewerRef.current.setFullScreen(false);
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* OpenSeadragon Container */}
      <div
        ref={viewerRef}
        className="h-full w-full rounded-2xl bg-black/5"
        style={{ touchAction: 'none' }}
      />

      {/* Controls Overlay */}
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong flex gap-2 rounded-full px-4 py-2 shadow-xl"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleZoomOut}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/20"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-5 w-5 text-stone-gray" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/20"
            aria-label="Reset zoom"
          >
            <Maximize2 className="h-5 w-5 text-stone-gray" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleZoomIn}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/20"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5 text-stone-gray" />
          </motion.button>
        </motion.div>
      </div>

      {/* Title */}
      {title && (
        <div className="absolute left-4 top-4 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-strong rounded-2xl px-4 py-2 shadow-xl"
          >
            <h3 className="font-display text-lg font-semibold text-stone-gray">
              {title}
            </h3>
          </motion.div>
        </div>
      )}

      {/* Close Button */}
      {onClose && (
        <div className="absolute right-4 top-4 z-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              onTap();
              onClose();
            }}
            className="glass-strong flex h-10 w-10 items-center justify-center rounded-full shadow-xl transition-colors hover:bg-white/20"
            aria-label="Close zoom viewer"
          >
            <X className="h-5 w-5 text-stone-gray" />
          </motion.button>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute left-4 top-20 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="glass rounded-xl px-3 py-2 text-xs text-stone-gray/70"
        >
          <p className="hidden md:block">Scroll to zoom • Drag to pan</p>
          <p className="md:hidden">Pinch to zoom • Drag to pan</p>
        </motion.div>
      </div>
    </div>
  );
}
