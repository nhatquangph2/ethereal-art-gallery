'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Volume2, VolumeX, Menu, Bookmark, X, User, LogIn, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useHaptic } from '@/lib/haptic';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

interface BottomNavigationProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onVolumeChange?: (volume: number) => void;
  currentVolume?: number;
}

export function BottomNavigation({
  isMuted,
  onToggleMute,
  onVolumeChange,
  currentVolume = 1,
}: BottomNavigationProps) {
  const { onTap } = useHaptic();
  const { user, isAuthenticated, logout } = useAuth();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Generate avatar initials
  const avatarInitials = user
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  const handleMuteToggle = () => {
    onTap();
    onToggleMute();
  };

  const handleVolumeIconClick = () => {
    onTap();
    setShowVolumeSlider(!showVolumeSlider);
  };

  const handleMenuToggle = () => {
    onTap();
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      >
        <div className="glass-strong mx-4 mb-4 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Home */}
            <Link href="/" onClick={onTap}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-white/20"
                aria-label="Go to home"
              >
                <Home className="h-6 w-6 text-stone-gray" />
              </motion.button>
            </Link>

            {/* Audio Control */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleVolumeIconClick}
              className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-white/20"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="h-6 w-6 text-stone-gray" />
              ) : (
                <Volume2 className="h-6 w-6 text-stone-gray" />
              )}
            </motion.button>

            {/* Saved/Bookmarks */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onTap}
              className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-white/20"
              aria-label="Saved artworks"
            >
              <Bookmark className="h-6 w-6 text-stone-gray" />
            </motion.button>

            {/* User Avatar / Login */}
            {isAuthenticated ? (
              <Link href="/settings" onClick={onTap}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-leaf font-bold text-white transition-all hover:bg-gold-leaf/90"
                  aria-label="Settings"
                >
                  {avatarInitials}
                </motion.button>
              </Link>
            ) : (
              <Link href="/login" onClick={onTap}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-white/20"
                  aria-label="Login"
                >
                  <LogIn className="h-6 w-6 text-stone-gray" />
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Volume Slider Popup */}
      <AnimatePresence>
        {showVolumeSlider && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 md:hidden"
          >
            <div className="glass-strong rounded-3xl px-6 py-4 shadow-xl">
              <div className="mb-2 text-center text-sm font-medium text-stone-gray">
                Volume
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleMuteToggle}
                  className="rounded-full p-2 transition-colors hover:bg-white/20"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5 text-stone-gray" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-stone-gray" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentVolume * 100}
                  onChange={(e) => {
                    const volume = parseInt(e.target.value) / 100;
                    onVolumeChange?.(volume);
                  }}
                  className="h-2 w-32 appearance-none rounded-full bg-white/30 outline-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-leaf [&::-webkit-slider-thumb]:shadow-md"
                />
                <span className="min-w-[3ch] text-sm text-stone-gray">
                  {Math.round(currentVolume * 100)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
