'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Heart, Palette } from 'lucide-react';
import Link from 'next/link';
import { useHaptic } from '@/lib/haptic';

export default function AboutPage() {
  const { onTap } = useHaptic();

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
            About
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </motion.header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
          <h2 className="font-display text-5xl font-bold text-stone-gray">
            The Ethereal <span className="text-gold-leaf">Art Gallery</span>
          </h2>
          <p className="mt-4 font-display text-xl text-stone-gray/70">
            Nơi trú ẩn cho tâm hồn
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-6"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-leaf/20">
              <Sparkles className="h-8 w-8 text-gold-leaf" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-stone-gray">
              Scrollytelling
            </h3>
            <p className="mt-3 text-stone-gray/70">
              Trải nghiệm kể chuyện tương tác với hiệu ứng cuộn mượt mà, lấy cảm hứng từ NYT và Guardian.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-3xl p-6"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-leaf/20">
              <Heart className="h-8 w-8 text-gold-leaf" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-stone-gray">
              Adaptive Audio
            </h3>
            <p className="mt-3 text-stone-gray/70">
              Âm thanh đa lớp thích ứng với vị trí cuộn, tạo không gian âm thanh phong phú cho mỗi tác phẩm.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-3xl p-6"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-leaf/20">
              <Palette className="h-8 w-8 text-gold-leaf" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-stone-gray">
              Deep Zoom
            </h3>
            <p className="mt-3 text-stone-gray/70">
              Khám phá từng chi tiết nhỏ nhất của tác phẩm với công nghệ zoom sâu, lấy cảm hứng từ Rijksmuseum.
            </p>
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass rounded-3xl p-8 text-center"
        >
          <h3 className="font-display text-3xl font-semibold text-stone-gray">
            Sứ Mệnh Của Chúng Tôi
          </h3>
          <p className="mt-6 text-lg leading-relaxed text-stone-gray/80">
            The Ethereal Art Gallery được tạo ra với niềm tin rằng nghệ thuật không chỉ để ngắm nhìn,
            mà còn để trải nghiệm. Chúng tôi kết hợp công nghệ hiện đại với cảm xúc con người,
            tạo nên không gian nơi mỗi tác phẩm có thể kể câu chuyện riêng của mình.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-stone-gray/80">
            Được thiết kế tối ưu cho mobile, gallery của chúng tôi mang nghệ thuật đến gần hơn với bạn -
            bất cứ nơi đâu, bất cứ lúc nào. Hãy để tâm hồn được nghỉ ngơi trong không gian thiên đàng này.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-stone-gray/50">
            Built With
          </h4>
          <p className="mt-3 text-stone-gray/60">
            Next.js 15 • GSAP • Framer Motion • Lenis • Howler.js • OpenSeadragon • Sanity CMS
          </p>
        </motion.div>

        {/* Back to Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Link href="/" onClick={onTap}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="glass-strong rounded-full px-8 py-4 font-display text-lg font-semibold text-stone-gray transition-all hover:bg-white/30"
            >
              Khám Phá Gallery
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="h-24 md:h-0" />
    </div>
  );
}
