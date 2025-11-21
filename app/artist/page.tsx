'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Edit, Trash2, Image, Music, FileText, Save, X, Palette, Sparkles, Copy, Eye, Search } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useHaptic } from '@/lib/haptic';
import type { Artwork } from '@/types/artwork';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { FileUpload } from '@/components/ui/file-upload';

export default function ArtistDashboardPage() {
  const router = useRouter();
  const { user, isArtist } = useAuth();
  const { onTap } = useHaptic();

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [autoSaving, setAutoSaving] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterMedium, setFilterMedium] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'views'>('date');

  // Form state - load from localStorage if exists
  const [formData, setFormData] = useState<Partial<Artwork>>(() => {
    if (typeof window !== 'undefined') {
      const savedForm = localStorage.getItem('ethereal_artist_form_draft');
      if (savedForm) {
        try {
          return JSON.parse(savedForm);
        } catch (e) {
          console.error('Failed to parse saved form:', e);
        }
      }
    }
    return {
      title: '',
      artist: user?.artistName || user?.name || '',
      year: new Date().getFullYear().toString(),
      medium: '',
      dimensions: '',
      description: '',
      baseImage: '',
      thumbnailImage: '',
      audioAmbient: '',
      tags: [],
      dominantColors: [],
      storySegments: [],
    };
  });

  // Redirect if not artist
  useEffect(() => {
    if (!isArtist) {
      router.push('/');
    }
  }, [isArtist, router]);

  // Load artworks from localStorage
  useEffect(() => {
    const storedArtworks = localStorage.getItem('ethereal_artworks');
    if (storedArtworks) {
      try {
        const allArtworks = JSON.parse(storedArtworks);
        // Filter to only show artworks by this user
        const userArtworks = allArtworks.filter((a: Artwork) =>
          user?.artworkIds?.includes(a.id)
        );
        setArtworks(userArtworks);
      } catch (error) {
        console.error('Failed to load artworks:', error);
      }
    }
  }, [user]);

  // Show toast if form was restored from draft
  useEffect(() => {
    if (showCreateForm) {
      const hasDraft = localStorage.getItem('ethereal_artist_form_draft');
      if (hasDraft && formData.title) {
        toast.info('Đã khôi phục bản nháp của bạn', {
          description: 'Dữ liệu form đã được tự động lưu trước đó',
        });
      }
    }
  }, [showCreateForm]);

  // Auto-save form data to localStorage when it changes (debounced)
  useEffect(() => {
    if (showCreateForm && (formData.title || formData.description)) {
      setAutoSaving(true);
      const timer = setTimeout(() => {
        localStorage.setItem('ethereal_artist_form_draft', JSON.stringify(formData));
        setAutoSaving(false);
      }, 1000); // Debounce 1s

      return () => clearTimeout(timer);
    }
  }, [formData, showCreateForm]);

  const handleInputChange = (field: keyof Artwork, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveArtwork = () => {
    onTap();

    if (!formData.title || !formData.description) {
      alert('Vui lòng điền tiêu đề và mô tả');
      return;
    }

    const newArtwork: Artwork = {
      id: editingArtwork?.id || `art_${Date.now()}`,
      title: formData.title || '',
      artist: formData.artist || user?.name || '',
      year: formData.year,
      medium: formData.medium,
      dimensions: formData.dimensions,
      description: formData.description || '',
      baseImage: formData.baseImage || '/images/artworks/placeholder.jpg',
      thumbnailImage: formData.thumbnailImage || '/images/artworks/placeholder.jpg',
      audioAmbient: formData.audioAmbient,
      storySegments: formData.storySegments || [],
      tags: formData.tags || [],
      dominantColors: formData.dominantColors || [],
    };

    // Save to localStorage
    const storedArtworks = localStorage.getItem('ethereal_artworks');
    let allArtworks: Artwork[] = storedArtworks ? JSON.parse(storedArtworks) : [];

    if (editingArtwork) {
      // Update existing artwork
      allArtworks = allArtworks.map((a) => (a.id === editingArtwork.id ? newArtwork : a));
    } else {
      // Add new artwork
      allArtworks.push(newArtwork);

      // Update user's artworkIds
      if (user) {
        const updatedUser = {
          ...user,
          artworkIds: [...(user.artworkIds || []), newArtwork.id],
        };

        // Update user in localStorage
        localStorage.setItem('ethereal_user', JSON.stringify(updatedUser));

        // Update in users collection
        const usersData = localStorage.getItem('ethereal_users');
        if (usersData) {
          const users = JSON.parse(usersData);
          if (users[user.email]) {
            users[user.email].user = updatedUser;
            localStorage.setItem('ethereal_users', JSON.stringify(users));
          }
        }
      }
    }

    localStorage.setItem('ethereal_artworks', JSON.stringify(allArtworks));

    // Clear draft from localStorage
    localStorage.removeItem('ethereal_artist_form_draft');

    // Refresh artworks list
    const userArtworks = allArtworks.filter((a) => user?.artworkIds?.includes(a.id) || a.id === newArtwork.id);
    setArtworks(userArtworks);

    // Show success message
    toast.success(editingArtwork ? 'Đã cập nhật tác phẩm!' : 'Đã tạo tác phẩm mới!', {
      description: 'Dữ liệu đã được lưu thành công',
    });

    // Reset form
    setShowCreateForm(false);
    setEditingArtwork(null);
    setFormData({
      title: '',
      artist: user?.artistName || user?.name || '',
      year: new Date().getFullYear().toString(),
      medium: '',
      dimensions: '',
      description: '',
      baseImage: '',
      thumbnailImage: '',
      audioAmbient: '',
      tags: [],
      dominantColors: [],
      storySegments: [],
    });
  };

  const handleEditArtwork = (artwork: Artwork) => {
    onTap();
    setEditingArtwork(artwork);
    setFormData(artwork);
    setShowCreateForm(true);
  };

  const handleDeleteArtwork = (artworkId: string) => {
    onTap();

    const storedArtworks = localStorage.getItem('ethereal_artworks');
    if (!storedArtworks) return;

    const allArtworks: Artwork[] = JSON.parse(storedArtworks);
    const updatedArtworks = allArtworks.filter((a) => a.id !== artworkId);

    localStorage.setItem('ethereal_artworks', JSON.stringify(updatedArtworks));

    // Update user's artworkIds
    if (user && user.artworkIds) {
      const updatedUser = {
        ...user,
        artworkIds: user.artworkIds.filter((id) => id !== artworkId),
      };

      localStorage.setItem('ethereal_user', JSON.stringify(updatedUser));

      const usersData = localStorage.getItem('ethereal_users');
      if (usersData) {
        const users = JSON.parse(usersData);
        if (users[user.email]) {
          users[user.email].user = updatedUser;
          localStorage.setItem('ethereal_users', JSON.stringify(users));
        }
      }
    }

    setArtworks(updatedArtworks.filter((a) => user?.artworkIds?.includes(a.id)));
    toast.success('Đã xóa tác phẩm!');
  };

  const handleCloneArtwork = (artwork: Artwork) => {
    onTap();

    const storedArtworks = localStorage.getItem('ethereal_artworks');
    if (!storedArtworks) return;

    const allArtworks: Artwork[] = JSON.parse(storedArtworks);
    const clonedArtwork: Artwork = {
      ...artwork,
      id: `art_${Date.now()}`,
      title: `${artwork.title} (Copy)`,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    allArtworks.push(clonedArtwork);
    localStorage.setItem('ethereal_artworks', JSON.stringify(allArtworks));

    // Update user's artworkIds
    if (user) {
      const updatedUser = {
        ...user,
        artworkIds: [...(user.artworkIds || []), clonedArtwork.id],
      };

      localStorage.setItem('ethereal_user', JSON.stringify(updatedUser));

      const usersData = localStorage.getItem('ethereal_users');
      if (usersData) {
        const users = JSON.parse(usersData);
        if (users[user.email]) {
          users[user.email].user = updatedUser;
          localStorage.setItem('ethereal_users', JSON.stringify(users));
        }
      }
    }

    // Refresh artworks list
    const userArtworks = allArtworks.filter((a) => user?.artworkIds?.includes(a.id) || a.id === clonedArtwork.id);
    setArtworks(userArtworks);
    toast.success('Đã nhân bản tác phẩm!');
  };

  const handleCancel = () => {
    onTap();

    // Clear draft from localStorage
    localStorage.removeItem('ethereal_artist_form_draft');

    setShowCreateForm(false);
    setEditingArtwork(null);
    setFormData({
      title: '',
      artist: user?.artistName || user?.name || '',
      year: new Date().getFullYear().toString(),
      medium: '',
      dimensions: '',
      description: '',
      baseImage: '',
      thumbnailImage: '',
      audioAmbient: '',
      tags: [],
      dominantColors: [],
      storySegments: [],
    });
  };

  if (!isArtist) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-blue to-soft-sun pb-32">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 glass-strong"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/settings" onClick={onTap}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              aria-label="Back to settings"
            >
              <ArrowLeft className="h-5 w-5 text-stone-gray" />
            </motion.button>
          </Link>
          <div className="flex items-center gap-2">
            <Palette className="h-6 w-6 text-purple-500" />
            <h1 className="font-display text-xl font-semibold text-stone-gray">
              Artist Dashboard
            </h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              onTap();
              setShowCreateForm(true);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white transition-colors hover:bg-purple-600"
            aria-label="Create new artwork"
          >
            <Plus className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={[
            { label: 'Settings', href: '/settings' },
            { label: 'Artist Dashboard' }
          ]} />
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6 glass rounded-3xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-stone-gray">
                {artworks.length}
              </h2>
              <p className="text-sm text-stone-gray/60">Tác phẩm của bạn</p>
            </div>
            <Palette className="h-12 w-12 text-purple-500/30" />
          </div>
        </motion.div>

        {/* Create/Edit Form */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 glass rounded-3xl p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-2xl font-semibold text-stone-gray">
                    {editingArtwork ? 'Chỉnh sửa tác phẩm' : 'Tác phẩm mới'}
                  </h2>
                  <AnimatePresence>
                    {autoSaving && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1"
                      >
                        <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500" />
                        <span className="text-xs text-purple-600">Đang lưu...</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="rounded-full p-2 transition-colors hover:bg-white/30"
                >
                  <X className="h-5 w-5 text-stone-gray" />
                </motion.button>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-gray">
                    Tiêu đề *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full rounded-2xl bg-white/30 px-4 py-3 text-stone-gray outline-none transition-all focus:bg-white/40"
                    placeholder="Nhập tiêu đề tác phẩm..."
                  />
                </div>

                {/* Artist, Year, Medium - Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-stone-gray">
                      Nghệ sĩ
                    </label>
                    <input
                      type="text"
                      value={formData.artist}
                      onChange={(e) => handleInputChange('artist', e.target.value)}
                      className="w-full rounded-2xl bg-white/30 px-4 py-3 text-stone-gray outline-none transition-all focus:bg-white/40"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-stone-gray">
                      Năm
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="w-full rounded-2xl bg-white/30 px-4 py-3 text-stone-gray outline-none transition-all focus:bg-white/40"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-stone-gray">
                      Chất liệu
                    </label>
                    <input
                      type="text"
                      value={formData.medium}
                      onChange={(e) => handleInputChange('medium', e.target.value)}
                      className="w-full rounded-2xl bg-white/30 px-4 py-3 text-stone-gray outline-none transition-all focus:bg-white/40"
                      placeholder="Sơn dầu, acrylic..."
                    />
                  </div>
                </div>

                {/* Dimensions */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-gray">
                    Kích thước
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    className="w-full rounded-2xl bg-white/30 px-4 py-3 text-stone-gray outline-none transition-all focus:bg-white/40"
                    placeholder="100 x 150 cm"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-gray">
                    Mô tả *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full rounded-2xl bg-white/30 px-4 py-3 text-stone-gray outline-none transition-all focus:bg-white/40"
                    placeholder="Mô tả tác phẩm của bạn..."
                  />
                </div>

                {/* File Uploads */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FileUpload
                    type="image"
                    accept="image/*"
                    label="Ảnh chính (Base Image)"
                    currentFile={formData.baseImage}
                    onFileSelect={(path) => handleInputChange('baseImage', path)}
                  />
                  <FileUpload
                    type="image"
                    accept="image/*"
                    label="Ảnh thumbnail"
                    currentFile={formData.thumbnailImage}
                    onFileSelect={(path) => handleInputChange('thumbnailImage', path)}
                  />
                </div>

                {/* Audio Upload */}
                <FileUpload
                  type="audio"
                  accept="audio/*"
                  label="Nhạc nền (Audio Ambient)"
                  currentFile={formData.audioAmbient}
                  onFileSelect={(path) => handleInputChange('audioAmbient', path)}
                />

                {/* Tags */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-gray">
                    Tags (phân cách bằng dấu phẩy)
                  </label>
                  <input
                    type="text"
                    value={formData.tags?.join(', ')}
                    onChange={(e) =>
                      handleInputChange(
                        'tags',
                        e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      )
                    }
                    className="w-full rounded-2xl bg-white/30 px-4 py-3 text-stone-gray outline-none transition-all focus:bg-white/40"
                    placeholder="hopeful, melancholic, peaceful"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveArtwork}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-purple-500 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-600"
                  >
                    <Save className="h-5 w-5" />
                    {editingArtwork ? 'Cập nhật' : 'Lưu tác phẩm'}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="rounded-2xl bg-white/30 px-6 py-3 font-semibold text-stone-gray transition-all hover:bg-white/40"
                  >
                    Hủy
                  </motion.button>
                </div>

                <p className="text-xs text-stone-gray/60">
                  <FileText className="inline h-3 w-3" /> Để thêm story segments, vui lòng sử dụng Story Builder sau khi lưu tác phẩm.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search & Filter */}
        {!showCreateForm && artworks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm theo tên, mô tả, tags..."
                  className="w-full rounded-2xl bg-white/30 px-4 py-3 text-sm text-stone-gray outline-none transition-all placeholder:text-stone-gray/50 focus:bg-white/40"
                />
              </div>

              {/* Filter Year */}
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="rounded-2xl bg-white/30 px-4 py-3 text-sm text-stone-gray outline-none transition-all focus:bg-white/40"
              >
                <option value="all">Tất cả năm</option>
                {Array.from(new Set(artworks.map(a => a.year))).sort().reverse().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              {/* Filter Medium */}
              <select
                value={filterMedium}
                onChange={(e) => setFilterMedium(e.target.value)}
                className="rounded-2xl bg-white/30 px-4 py-3 text-sm text-stone-gray outline-none transition-all focus:bg-white/40"
              >
                <option value="all">Tất cả chất liệu</option>
                {Array.from(new Set(artworks.map(a => a.medium).filter(Boolean))).sort().map(medium => (
                  <option key={medium} value={medium}>{medium}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'views')}
                className="rounded-2xl bg-white/30 px-4 py-3 text-sm text-stone-gray outline-none transition-all focus:bg-white/40"
              >
                <option value="date">Mới nhất</option>
                <option value="title">Tên A-Z</option>
                <option value="views">Lượt xem</option>
              </select>
            </div>
          </motion.div>
        )}

        {/* Artworks List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          {(() => {
            // Filter artworks
            let filtered = artworks.filter((artwork) => {
              const matchesSearch =
                searchQuery === '' ||
                artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                artwork.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                artwork.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

              const matchesYear = filterYear === 'all' || artwork.year === filterYear;
              const matchesMedium = filterMedium === 'all' || artwork.medium === filterMedium;

              return matchesSearch && matchesYear && matchesMedium;
            });

            // Sort artworks
            filtered.sort((a, b) => {
              if (sortBy === 'date') {
                return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
              } else if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
              } else if (sortBy === 'views') {
                return (b.views || 0) - (a.views || 0);
              }
              return 0;
            });

            return filtered.length === 0 ? (
              artworks.length === 0 ? (
                <div className="glass rounded-3xl p-12 text-center">
                  <Palette className="mx-auto mb-4 h-16 w-16 text-purple-500/30" />
                  <p className="text-stone-gray/60">
                    Bạn chưa có tác phẩm nào. Nhấn nút <Plus className="inline h-4 w-4" /> để tạo tác phẩm đầu tiên!
                  </p>
                </div>
              ) : (
                <div className="glass rounded-3xl p-12 text-center">
                  <Search className="mx-auto mb-4 h-16 w-16 text-stone-gray/30" />
                  <p className="text-stone-gray/60">Không tìm thấy tác phẩm phù hợp</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterYear('all');
                      setFilterMedium('all');
                    }}
                    className="mt-4 rounded-xl bg-gold-leaf/20 px-4 py-2 text-sm font-semibold text-gold-leaf transition-all hover:bg-gold-leaf/30"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )
            ) : (
              filtered.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                className="glass rounded-3xl p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  {/* Artwork Info */}
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-stone-gray">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-stone-gray/60">
                      {artwork.artist} • {artwork.year}
                    </p>
                    {artwork.medium && (
                      <p className="mt-1 text-sm text-stone-gray/60">{artwork.medium}</p>
                    )}
                    <p className="mt-3 text-sm text-stone-gray/80">{artwork.description}</p>
                    {artwork.tags && artwork.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {artwork.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/artist/story-builder/${artwork.id}`} onClick={onTap}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 rounded-xl bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-500 transition-all hover:bg-purple-500/30"
                      >
                        <Sparkles className="h-4 w-4" />
                        Story
                      </motion.button>
                    </Link>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditArtwork(artwork)}
                      className="flex items-center gap-2 rounded-xl bg-white/30 px-4 py-2 text-sm font-semibold text-stone-gray transition-all hover:bg-white/40"
                    >
                      <Edit className="h-4 w-4" />
                      Sửa
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCloneArtwork(artwork)}
                      className="flex items-center gap-2 rounded-xl bg-gold-leaf/20 px-4 py-2 text-sm font-semibold text-gold-leaf transition-all hover:bg-gold-leaf/30"
                    >
                      <Copy className="h-4 w-4" />
                      Nhân bản
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (confirm(`Xóa "${artwork.title}"?`)) {
                          handleDeleteArtwork(artwork.id);
                        }
                      }}
                      className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      Xóa
                    </motion.button>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 border-t border-white/20 pt-4">
                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <div>
                      <span className="text-stone-gray/60">Story segments: </span>
                      <span className="font-semibold text-purple-500">
                        {artwork.storySegments.length}
                      </span>
                    </div>
                    {artwork.audioAmbient && (
                      <div>
                        <Music className="inline h-4 w-4 text-stone-gray/60" />
                        <span className="ml-1 text-stone-gray/60">Có nhạc nền</span>
                      </div>
                    )}
                    {artwork.views !== undefined && (
                      <div>
                        <Eye className="inline h-4 w-4 text-stone-gray/60" />
                        <span className="ml-1 text-stone-gray/60">{artwork.views} lượt xem</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
            );
          })()}
        </motion.div>
      </div>
    </div>
  );
}
