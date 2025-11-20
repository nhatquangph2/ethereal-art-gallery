'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image, Music, FileCheck } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  accept: string;
  label: string;
  type: 'image' | 'audio';
  onFileSelect: (filePath: string) => void;
  currentFile?: string;
}

export function FileUpload({ accept, label, type, onFileSelect, currentFile }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentFile || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file type
    const fileType = file.type.split('/')[0];
    if (type === 'image' && fileType !== 'image') {
      toast.error('Vui lòng chọn file ảnh!');
      return;
    }
    if (type === 'audio' && fileType !== 'audio') {
      toast.error('Vui lòng chọn file âm thanh!');
      return;
    }

    // Validate file size (max 10MB for images, 50MB for audio)
    const maxSize = type === 'image' ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File quá lớn! Tối đa ${type === 'image' ? '10MB' : '50MB'}`);
      return;
    }

    setUploading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      // Upload file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();

      // Set preview
      if (type === 'image') {
        setPreview(data.url);
      } else {
        setPreview(file.name);
      }

      // Call callback with the file path
      onFileSelect(data.url);
      toast.success('Tải file thành công!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Lỗi khi tải file!');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileSelect('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const Icon = type === 'image' ? Image : Music;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-stone-gray/80">{label}</label>

      {preview ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-leaf/20">
                <FileCheck className="h-6 w-6 text-gold-leaf" />
              </div>
              <div>
                {type === 'image' ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div>
                    <p className="text-sm font-medium text-stone-gray">{preview}</p>
                    <p className="text-xs text-stone-gray/60">Audio file</p>
                  </div>
                )}
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-500 transition-colors hover:bg-red-500/30"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`glass relative cursor-pointer rounded-2xl border-2 border-dashed p-8 transition-all ${
            isDragging
              ? 'border-gold-leaf bg-gold-leaf/10'
              : 'border-stone-gray/20 hover:border-gold-leaf/50 hover:bg-white/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-leaf/20">
              {uploading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold-leaf border-t-transparent" />
              ) : (
                <Icon className="h-8 w-8 text-gold-leaf" />
              )}
            </div>

            {uploading ? (
              <p className="text-sm font-medium text-stone-gray">Đang tải lên...</p>
            ) : (
              <>
                <div>
                  <p className="text-sm font-medium text-stone-gray">
                    Kéo thả file vào đây hoặc nhấn để chọn
                  </p>
                  <p className="mt-1 text-xs text-stone-gray/60">
                    {type === 'image'
                      ? 'PNG, JPG, WebP (tối đa 10MB)'
                      : 'MP3, WAV, OGG (tối đa 50MB)'}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-gold-leaf/10 px-4 py-2">
                  <Upload className="h-4 w-4 text-gold-leaf" />
                  <span className="text-xs font-medium text-gold-leaf">
                    Chọn file
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
