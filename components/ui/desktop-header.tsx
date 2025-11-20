'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogIn, LogOut, Settings, Bookmark, Home, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useHaptic } from '@/lib/haptic';

export function DesktopHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const { onTap } = useHaptic();
  const [showDropdown, setShowDropdown] = useState(false);

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
    setShowDropdown(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 hidden md:block glass-strong"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" onClick={onTap}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-leaf/20">
              <Sparkles className="h-6 w-6 text-gold-leaf" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-stone-gray">
                The Ethereal <span className="text-gold-leaf">Art Gallery</span>
              </h1>
              <p className="text-xs text-stone-gray/60">Nơi trú ẩn cho tâm hồn</p>
            </div>
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link href="/" onClick={onTap}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-stone-gray transition-colors hover:text-gold-leaf"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Gallery</span>
            </motion.div>
          </Link>

          <Link href="/about" onClick={onTap}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-stone-gray transition-colors hover:text-gold-leaf"
            >
              <Bookmark className="h-5 w-5" />
              <span className="font-medium">About</span>
            </motion.div>
          </Link>

          {isAuthenticated && (
            <Link href="/settings" onClick={onTap}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-stone-gray transition-colors hover:text-gold-leaf"
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </motion.div>
            </Link>
          )}
        </nav>

        {/* User Avatar / Login */}
        <div className="relative">
          {isAuthenticated ? (
            <Link href="/settings" onClick={onTap}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 rounded-full bg-white/20 py-2 pl-4 pr-2 transition-all hover:bg-white/30"
              >
                <span className="font-medium text-stone-gray">{user?.name}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-leaf text-sm font-bold text-white">
                  {avatarInitials}
                </div>
              </motion.button>
            </Link>
          ) : (
            <Link href="/login" onClick={onTap}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full bg-gold-leaf px-6 py-2 font-semibold text-white shadow-lg transition-all hover:bg-gold-leaf/90"
              >
                <LogIn className="h-5 w-5" />
                <span>Đăng Nhập</span>
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
