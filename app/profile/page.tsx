'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LogOut, Edit, Save, Bookmark, Settings as SettingsIcon, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useHaptic } from '@/lib/haptic';
import { getAllArtworks } from '@/lib/data-provider';
import type { Artwork } from '@/types/artwork';
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const { onTap } = useHaptic();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [savedArtworks, setSavedArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      setName(user.name);
      setBio(user.bio || '');

      // Load saved artworks
      getAllArtworks().then((allArtworks) => {
        const saved = allArtworks.filter((artwork) =>
          user.savedArtworks.includes(artwork.id)
        );
        setSavedArtworks(saved);
      });
    }
  }, [isAuthenticated, user, router]);

  const handleSave = () => {
    onTap();
    updateProfile({ name, bio });
    setIsEditing(false);
  };

  const handleLogout = () => {
    onTap();
    logout();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  // Generate avatar initials
  const avatarInitials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-blue to-soft-sun pb-32">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong"
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
            Tài Khoản
          </h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5 text-stone-gray" />
          </motion.button>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-6"
        >
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-leaf text-2xl font-bold text-white">
                  {avatarInitials}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl bg-white/50 px-4 py-2 text-stone-gray outline-none transition-all focus:bg-white/70 focus:ring-2 focus:ring-gold-leaf/50"
                    placeholder="Tên của bạn"
                  />
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-xl bg-white/50 px-4 py-2 text-stone-gray outline-none transition-all focus:bg-white/70 focus:ring-2 focus:ring-gold-leaf/50"
                    placeholder="Giới thiệu về bạn..."
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className="flex items-center gap-2 rounded-xl bg-gold-leaf px-4 py-2 text-sm font-semibold text-white"
                    >
                      <Save className="h-4 w-4" />
                      Lưu
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsEditing(false);
                        setName(user.name);
                        setBio(user.bio || '');
                      }}
                      className="rounded-xl bg-white/30 px-4 py-2 text-sm font-semibold text-stone-gray"
                    >
                      Hủy
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-bold text-stone-gray">
                      {user.name}
                    </h2>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        onTap();
                        setIsEditing(true);
                      }}
                      className="rounded-full p-2 transition-colors hover:bg-white/20"
                    >
                      <Edit className="h-4 w-4 text-stone-gray/60" />
                    </motion.button>
                  </div>
                  <p className="mt-1 text-sm text-stone-gray/60">{user.email}</p>
                  {user.bio && (
                    <p className="mt-3 text-stone-gray/80">{user.bio}</p>
                  )}
                  <div className="mt-4 flex gap-4">
                    <div>
                      <p className="text-2xl font-bold text-gold-leaf">
                        {savedArtworks.length}
                      </p>
                      <p className="text-xs text-stone-gray/60">Saved Artworks</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 grid grid-cols-2 gap-4"
        >
          <Link href="/settings" onClick={onTap}>
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="glass rounded-2xl p-4 text-center transition-all hover:bg-white/30"
            >
              <SettingsIcon className="mx-auto mb-2 h-8 w-8 text-gold-leaf" />
              <p className="font-semibold text-stone-gray">Cài Đặt</p>
            </motion.div>
          </Link>

          <motion.div
            whileTap={{ scale: 0.98 }}
            className="glass rounded-2xl p-4 text-center transition-all hover:bg-white/30"
          >
            <Bookmark className="mx-auto mb-2 h-8 w-8 text-gold-leaf" />
            <p className="font-semibold text-stone-gray">Đã Lưu</p>
          </motion.div>
        </motion.div>

        {/* Saved Artworks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h3 className="mb-4 font-display text-2xl font-bold text-stone-gray">
            Tác Phẩm Đã Lưu
          </h3>

          {savedArtworks.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center">
              <Bookmark className="mx-auto mb-4 h-12 w-12 text-stone-gray/30" />
              <p className="text-stone-gray/60">
                Chưa có tác phẩm nào được lưu
              </p>
              <Link href="/" onClick={onTap}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 rounded-xl bg-gold-leaf px-6 py-2 font-semibold text-white"
                >
                  Khám Phá Gallery
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedArtworks.map((artwork, index) => (
                <Link
                  key={artwork.id}
                  href={`/artwork/${artwork.id}`}
                  onClick={onTap}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileTap={{ scale: 0.98 }}
                    className="glass group overflow-hidden rounded-2xl transition-all hover:shadow-xl"
                  >
                    {artwork.thumbnailImage ? (
                      <div className="relative aspect-[3/4] overflow-hidden bg-white/50">
                        <Image
                          src={artwork.thumbnailImage}
                          alt={artwork.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-gold-leaf/20 to-cloud-blue">
                        <User className="h-16 w-16 text-stone-gray/30" />
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="font-display text-lg font-semibold text-stone-gray">
                        {artwork.title}
                      </h4>
                      <p className="text-sm text-stone-gray/60">{artwork.artist}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
