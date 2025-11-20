'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  FileText,
  Music,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useHaptic } from '@/lib/haptic';
import type { Artwork, StorySegment, ImageEffect } from '@/types/artwork';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { FileUpload } from '@/components/ui/file-upload';

const IMAGE_EFFECTS: { value: ImageEffect; label: string }[] = [
  { value: 'zoom_in_center', label: 'Zoom In (Center)' },
  { value: 'zoom_out', label: 'Zoom Out' },
  { value: 'pan_left', label: 'Pan Left' },
  { value: 'pan_right', label: 'Pan Right' },
  { value: 'pan_up', label: 'Pan Up' },
  { value: 'pan_down', label: 'Pan Down' },
  { value: 'pan_left_down', label: 'Pan Left Down' },
  { value: 'pan_right_up', label: 'Pan Right Up' },
  { value: 'rotate_subtle', label: 'Rotate (Subtle)' },
  { value: 'scale_breathe', label: 'Scale Breathe' },
];

export default function StoryBuilderPage() {
  const router = useRouter();
  const params = useParams();
  const artworkId = params?.id as string;
  const { user, isArtist } = useAuth();
  const { onTap } = useHaptic();

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [segments, setSegments] = useState<StorySegment[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Load artwork
  useEffect(() => {
    if (!artworkId) return;

    const storedArtworks = localStorage.getItem('ethereal_artworks');
    if (storedArtworks) {
      const allArtworks: Artwork[] = JSON.parse(storedArtworks);
      const foundArtwork = allArtworks.find((a) => a.id === artworkId);
      if (foundArtwork) {
        setArtwork(foundArtwork);
        setSegments(foundArtwork.storySegments || []);
      }
    }
  }, [artworkId]);

  // Redirect if not artist or no artwork found
  useEffect(() => {
    if (!isArtist) {
      router.push('/');
    }
  }, [isArtist, router]);

  const handleAddSegment = () => {
    onTap();
    const newSegment: StorySegment = {
      id: `segment_${Date.now()}`,
      text: '',
      audioLayer: '',
      imageEffect: 'zoom_in_center',
      duration: 10,
    };
    setSegments([...segments, newSegment]);
  };

  const handleUpdateSegment = (index: number, field: keyof StorySegment, value: any) => {
    const updated = [...segments];
    updated[index] = { ...updated[index], [field]: value };
    setSegments(updated);
  };

  const handleDeleteSegment = (index: number) => {
    onTap();
    if (confirm('Xóa segment này?')) {
      setSegments(segments.filter((_, i) => i !== index));
    }
  };

  const handleMoveSegment = (index: number, direction: 'up' | 'down') => {
    onTap();
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === segments.length - 1)
    ) {
      return;
    }

    const updated = [...segments];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    setSegments(updated);
  };

  const handleSave = () => {
    onTap();

    if (!artwork) return;

    const updatedArtwork: Artwork = {
      ...artwork,
      storySegments: segments,
    };

    // Save to localStorage
    const storedArtworks = localStorage.getItem('ethereal_artworks');
    if (storedArtworks) {
      const allArtworks: Artwork[] = JSON.parse(storedArtworks);
      const updatedArtworks = allArtworks.map((a) =>
        a.id === artwork.id ? updatedArtwork : a
      );
      localStorage.setItem('ethereal_artworks', JSON.stringify(updatedArtworks));

      alert('Đã lưu story segments!');
      router.push('/artist');
    }
  };

  if (!isArtist || !artwork) {
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
          <Link href="/artist" onClick={onTap}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              aria-label="Back to artist dashboard"
            >
              <ArrowLeft className="h-5 w-5 text-stone-gray" />
            </motion.button>
          </Link>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <h1 className="font-display text-xl font-semibold text-stone-gray">
                Story Builder
              </h1>
            </div>
            <p className="text-xs text-stone-gray/60">{artwork.title}</p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onTap();
                setShowPreview(!showPreview);
              }}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                showPreview ? 'bg-gold-leaf text-white' : 'bg-white/20 text-stone-gray hover:bg-white/30'
              }`}
              aria-label="Toggle preview"
            >
              <Eye className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white transition-colors hover:bg-purple-600"
              aria-label="Save story"
            >
              <Save className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={[
            { label: 'Settings', href: '/settings' },
            { label: 'Artist Dashboard', href: '/artist' },
            { label: 'Story Builder' }
          ]} />
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6 glass rounded-3xl p-6"
        >
          <h2 className="mb-2 font-display text-2xl font-bold text-stone-gray">
            {artwork.title}
          </h2>
          <p className="text-sm text-stone-gray/60">
            {artwork.artist} • {artwork.year}
          </p>
          <p className="mt-3 text-sm text-stone-gray/80">{artwork.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div>
              <span className="text-stone-gray/60">Segments: </span>
              <span className="font-semibold text-purple-500">{segments.length}</span>
            </div>
            {artwork.audioAmbient && (
              <div>
                <Music className="inline h-4 w-4 text-stone-gray/60" />
                <span className="ml-1 text-stone-gray/60">Ambient audio</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Add Segment Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddSegment}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-500 px-6 py-4 font-semibold text-white transition-all hover:bg-purple-600"
          >
            <Plus className="h-5 w-5" />
            Thêm Story Segment
          </motion.button>
        </motion.div>

        {/* Preview Mode */}
        <AnimatePresence>
          {showPreview && segments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 glass rounded-3xl p-6"
            >
              <h3 className="mb-4 font-display text-xl font-semibold text-stone-gray">
                Preview
              </h3>
              <div className="space-y-4">
                {segments.map((segment, index) => (
                  <div key={segment.id} className="rounded-2xl bg-white/30 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm text-stone-gray/60">
                      <span className="font-semibold">#{index + 1}</span>
                      {segment.imageEffect && (
                        <span className="rounded-full bg-gold-leaf/20 px-2 py-0.5 text-xs font-semibold text-gold-leaf">
                          {IMAGE_EFFECTS.find((e) => e.value === segment.imageEffect)?.label}
                        </span>
                      )}
                      {segment.duration && (
                        <span className="text-xs">{segment.duration}s</span>
                      )}
                    </div>
                    <p className="text-stone-gray">{segment.text || '(No text)'}</p>
                    {segment.audioLayer && (
                      <p className="mt-2 text-xs text-stone-gray/60">
                        <Music className="inline h-3 w-3" /> {segment.audioLayer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Segments List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          {segments.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center">
              <FileText className="mx-auto mb-4 h-16 w-16 text-purple-500/30" />
              <p className="text-stone-gray/60">
                Chưa có story segment nào. Nhấn nút "Thêm Story Segment" để bắt đầu!
              </p>
            </div>
          ) : (
            segments.map((segment, index) => (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="glass rounded-3xl p-6"
              >
                {/* Segment Header */}
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold text-stone-gray">
                    Segment #{index + 1}
                  </h3>
                  <div className="flex gap-2">
                    {/* Move Up */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMoveSegment(index, 'up')}
                      disabled={index === 0}
                      className="rounded-lg bg-white/30 p-2 transition-all hover:bg-white/40 disabled:opacity-30"
                    >
                      <ChevronUp className="h-4 w-4 text-stone-gray" />
                    </motion.button>
                    {/* Move Down */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMoveSegment(index, 'down')}
                      disabled={index === segments.length - 1}
                      className="rounded-lg bg-white/30 p-2 transition-all hover:bg-white/40 disabled:opacity-30"
                    >
                      <ChevronDown className="h-4 w-4 text-stone-gray" />
                    </motion.button>
                    {/* Delete */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteSegment(index)}
                      className="rounded-lg bg-red-500/10 p-2 transition-all hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </motion.button>
                  </div>
                </div>

                {/* Segment Fields */}
                <div className="space-y-4">
                  {/* Text */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-stone-gray">
                      <FileText className="inline h-4 w-4" /> Narrative Text
                    </label>
                    <textarea
                      value={segment.text}
                      onChange={(e) => handleUpdateSegment(index, 'text', e.target.value)}
                      rows={3}
                      className="w-full rounded-2xl bg-white/30 px-4 py-3 text-stone-gray outline-none transition-all focus:bg-white/40"
                      placeholder="Nhập nội dung câu chuyện cho segment này..."
                    />
                  </div>

                  {/* Image Effect & Duration */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-stone-gray">
                        <Sparkles className="inline h-4 w-4" /> Image Effect
                      </label>
                      <select
                        value={segment.imageEffect || ''}
                        onChange={(e) =>
                          handleUpdateSegment(index, 'imageEffect', e.target.value as ImageEffect)
                        }
                        className="w-full rounded-2xl bg-white/30 px-4 py-3 text-stone-gray outline-none transition-all focus:bg-white/40"
                      >
                        <option value="">No effect</option>
                        {IMAGE_EFFECTS.map((effect) => (
                          <option key={effect.value} value={effect.value}>
                            {effect.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-stone-gray">
                        Duration (seconds)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={segment.duration || 10}
                        onChange={(e) =>
                          handleUpdateSegment(index, 'duration', parseInt(e.target.value))
                        }
                        className="w-full rounded-2xl bg-white/30 px-4 py-3 text-stone-gray outline-none transition-all focus:bg-white/40"
                      />
                    </div>
                  </div>

                  {/* Audio Layer */}
                  <FileUpload
                    type="audio"
                    accept="audio/*"
                    label="Audio Layer (Optional)"
                    currentFile={segment.audioLayer}
                    onFileSelect={(path) => handleUpdateSegment(index, 'audioLayer', path)}
                  />
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Save Button (Bottom) */}
        {segments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-500 px-6 py-4 font-semibold text-white transition-all hover:bg-purple-600"
            >
              <Save className="h-5 w-5" />
              Lưu Story ({segments.length} segments)
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
