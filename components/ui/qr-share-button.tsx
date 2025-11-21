'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Share2, X, Download, Copy, Check } from 'lucide-react';
import { useHaptic } from '@/lib/haptic';

interface QRShareButtonProps {
  url: string;
  title: string;
  artist?: string;
  className?: string;
}

export function QRShareButton({ url, title, artist, className = '' }: QRShareButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const { onTap } = useHaptic();

  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${url}`
    : url;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      onTap();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      ctx?.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-${title.replace(/\s+/g, '-').toLowerCase()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();

      onTap();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleShare = async () => {
    // Always show QR modal for better UX
    setShowModal(true);
    onTap();
  };

  return (
    <>
      {/* Share Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className={`glass-strong flex items-center gap-2 rounded-full px-6 py-3 shadow-xl transition-all hover:scale-105 ${className}`}
        aria-label="Chia sẻ tác phẩm"
      >
        <Share2 className="h-5 w-5 text-stone-gray" />
        <span className="font-medium text-stone-gray hidden sm:inline">Chia sẻ</span>
      </motion.button>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative max-w-md w-full rounded-3xl p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-black/10"
                aria-label="Đóng"
              >
                <X className="h-5 w-5 text-stone-gray" />
              </button>

              {/* Header */}
              <div className="mb-6 text-center">
                <h3 className="font-display text-2xl font-bold text-stone-gray">
                  Chia sẻ tác phẩm
                </h3>
                <p className="mt-2 text-sm text-stone-gray/60">
                  {title}
                  {artist && <span className="block mt-1">bởi {artist}</span>}
                </p>
              </div>

              {/* QR Code */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={fullUrl}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
              </div>

              {/* URL Display */}
              <div className="mb-6 rounded-xl bg-stone-gray/5 p-4">
                <p className="break-all text-center text-sm text-stone-gray/70">
                  {fullUrl}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-2 rounded-xl bg-stone-gray/10 px-4 py-3 font-medium text-stone-gray transition-colors hover:bg-stone-gray/20"
                >
                  {copied ? (
                    <>
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-green-600">Đã copy!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      <span>Copy link</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownloadQR}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gold-leaf px-4 py-3 font-medium text-white transition-colors hover:bg-gold-leaf/90"
                >
                  <Download className="h-5 w-5" />
                  <span>Tải QR</span>
                </motion.button>
              </div>

              {/* Info Text */}
              <p className="mt-4 text-center text-xs text-stone-gray/50">
                Quét mã QR để xem tác phẩm trên thiết bị di động
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
