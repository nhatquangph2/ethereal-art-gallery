'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, Zap, Globe, Moon, Play, User, Home, Bookmark, LogOut, Shield, Palette } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useHaptic } from '@/lib/haptic';
import { useTheme } from '@/lib/theme-context';

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, isArtist, logout } = useAuth();
  const { onTap } = useHaptic();
  const { darkMode, setDarkMode } = useTheme();

  // Settings state
  const [volume, setVolume] = useState(70);
  const [smoothScroll, setSmoothScroll] = useState(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [hapticFeedback, setHapticFeedback] = useState(true);

  // Load user preferences on mount
  useEffect(() => {
    if (user?.preferences) {
      setVolume(user.preferences.volume);
      setSmoothScroll(user.preferences.smoothScroll);
      setAutoPlayAudio(user.preferences.autoPlayAudio);
      setLanguage(user.preferences.language);
      setHapticFeedback(user.preferences.hapticFeedback);
    }
  }, [user]);

  // Generate avatar initials
  const avatarInitials = user
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  const handleLogout = () => {
    onTap();
    logout();
    router.push('/');
  };

  const handleToggle = (setter: (val: boolean) => void, currentValue: boolean) => {
    onTap();
    setter(!currentValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-blue to-soft-sun">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 glass-strong"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" onClick={onTap}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              aria-label="Back to gallery"
            >
              <ArrowLeft className="h-5 w-5 text-stone-gray" />
            </motion.button>
          </Link>
          <h1 className="font-display text-xl font-semibold text-stone-gray">
            Settings
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </motion.header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 pb-32">
        {/* User Profile Section */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-6 glass rounded-3xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-leaf text-xl font-bold text-white">
                {avatarInitials}
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl font-bold text-stone-gray">
                  {user?.name}
                </h2>
                <p className="text-sm text-stone-gray/60">{user?.email}</p>
              </div>
              <Link href="/profile" onClick={onTap}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-white/30 px-4 py-2 text-sm font-semibold text-stone-gray transition-all hover:bg-white/40"
                >
                  Xem Profile
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          <Link href="/" onClick={onTap}>
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="glass rounded-2xl p-4 text-center transition-all hover:bg-white/30"
            >
              <Home className="mx-auto mb-2 h-8 w-8 text-gold-leaf" />
              <p className="text-sm font-semibold text-stone-gray">Gallery</p>
            </motion.div>
          </Link>

          {isAuthenticated && (
            <Link href="/profile" onClick={onTap}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="glass rounded-2xl p-4 text-center transition-all hover:bg-white/30"
              >
                <User className="mx-auto mb-2 h-8 w-8 text-gold-leaf" />
                <p className="text-sm font-semibold text-stone-gray">Profile</p>
              </motion.div>
            </Link>
          )}

          <Link href="/about" onClick={onTap}>
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="glass rounded-2xl p-4 text-center transition-all hover:bg-white/30"
            >
              <Bookmark className="mx-auto mb-2 h-8 w-8 text-gold-leaf" />
              <p className="text-sm font-semibold text-stone-gray">About</p>
            </motion.div>
          </Link>

          {isAdmin && (
            <Link href="/admin/users" onClick={onTap}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="glass rounded-2xl p-4 text-center transition-all hover:bg-white/30"
              >
                <Shield className="mx-auto mb-2 h-8 w-8 text-gold-leaf" />
                <p className="text-sm font-semibold text-stone-gray">Admin</p>
              </motion.div>
            </Link>
          )}

          {isArtist && (
            <Link href="/artist" onClick={onTap}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="glass rounded-2xl p-4 text-center transition-all hover:bg-white/30"
              >
                <Palette className="mx-auto mb-2 h-8 w-8 text-purple-500" />
                <p className="text-sm font-semibold text-stone-gray">Artist</p>
              </motion.div>
            </Link>
          )}

          {isAuthenticated && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="glass rounded-2xl p-4 text-center transition-all hover:bg-red-500/10"
            >
              <LogOut className="mx-auto mb-2 h-8 w-8 text-red-500" />
              <p className="text-sm font-semibold text-red-500">Đăng Xuất</p>
            </motion.button>
          )}
        </motion.div>

        {/* Audio Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-6"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-leaf/20">
              <Volume2 className="h-6 w-6 text-gold-leaf" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-stone-gray">
                Audio
              </h2>
              <p className="text-sm text-stone-gray/60">Cài đặt âm thanh</p>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-stone-gray">
                Master Volume
              </label>
              <span className="text-sm font-semibold text-gold-leaf">
                {volume}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="h-2 w-full appearance-none rounded-full bg-white/30 outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-leaf [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>

          {/* Auto-play Toggle */}
          <div className="flex items-center justify-between border-t border-white/20 pt-4">
            <div>
              <p className="font-medium text-stone-gray">Auto-play Audio</p>
              <p className="text-xs text-stone-gray/60">Tự động phát nhạc khi xem tác phẩm</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleToggle(setAutoPlayAudio, autoPlayAudio)}
              className={`relative h-8 w-14 rounded-full transition-colors ${
                autoPlayAudio ? 'bg-gold-leaf' : 'bg-white/30'
              }`}
            >
              <motion.div
                animate={{ x: autoPlayAudio ? 24 : 2 }}
                className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Performance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 glass rounded-3xl p-6"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-leaf/20">
              <Zap className="h-6 w-6 text-gold-leaf" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-stone-gray">
                Performance
              </h2>
              <p className="text-sm text-stone-gray/60">Hiệu suất & hoạt ảnh</p>
            </div>
          </div>

          {/* Smooth Scroll Toggle */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-stone-gray">Smooth Scrolling</p>
              <p className="text-xs text-stone-gray/60">Cuộn mượt mà với Lenis</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleToggle(setSmoothScroll, smoothScroll)}
              className={`relative h-8 w-14 rounded-full transition-colors ${
                smoothScroll ? 'bg-gold-leaf' : 'bg-white/30'
              }`}
            >
              <motion.div
                animate={{ x: smoothScroll ? 24 : 2 }}
                className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
              />
            </motion.button>
          </div>

          {/* Haptic Feedback Toggle */}
          <div className="flex items-center justify-between border-t border-white/20 pt-4">
            <div>
              <p className="font-medium text-stone-gray">Haptic Feedback</p>
              <p className="text-xs text-stone-gray/60">Rung khi tương tác (chỉ mobile)</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleToggle(setHapticFeedback, hapticFeedback)}
              className={`relative h-8 w-14 rounded-full transition-colors ${
                hapticFeedback ? 'bg-gold-leaf' : 'bg-white/30'
              }`}
            >
              <motion.div
                animate={{ x: hapticFeedback ? 24 : 2 }}
                className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 glass rounded-3xl p-6"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-leaf/20">
              <Moon className="h-6 w-6 text-gold-leaf" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-stone-gray">
                Appearance
              </h2>
              <p className="text-sm text-stone-gray/60">Giao diện & ngôn ngữ</p>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-stone-gray">Dark Mode</p>
              <p className="text-xs text-stone-gray/60">Chế độ tối</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleToggle(setDarkMode, darkMode)}
              className={`relative h-8 w-14 rounded-full transition-colors ${
                darkMode ? 'bg-gold-leaf' : 'bg-white/30'
              }`}
            >
              <motion.div
                animate={{ x: darkMode ? 24 : 2 }}
                className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
              />
            </motion.button>
          </div>

          {/* Language Selection */}
          <div className="border-t border-white/20 pt-4">
            <div className="mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-stone-gray/60" />
              <p className="font-medium text-stone-gray">Language / Ngôn ngữ</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onTap();
                  setLanguage('vi');
                }}
                className={`rounded-xl px-4 py-3 font-medium transition-all ${
                  language === 'vi'
                    ? 'bg-gold-leaf text-white shadow-lg'
                    : 'bg-white/30 text-stone-gray'
                }`}
              >
                🇻🇳 Tiếng Việt
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onTap();
                  setLanguage('en');
                }}
                className={`rounded-xl px-4 py-3 font-medium transition-all ${
                  language === 'en'
                    ? 'bg-gold-leaf text-white shadow-lg'
                    : 'bg-white/30 text-stone-gray'
                }`}
              >
                🇬🇧 English
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-stone-gray/50">
            The Ethereal Art Gallery v1.0.0
          </p>
          <p className="mt-1 text-xs text-stone-gray/40">
            Built with ❤️ using Next.js 15
          </p>
        </motion.div>
      </div>
    </div>
  );
}
