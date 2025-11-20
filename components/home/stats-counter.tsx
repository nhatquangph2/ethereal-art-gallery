'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Image, Users, Eye, Heart } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItemProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
  color: string;
}

function StatItem({ value, label, icon, suffix = '', color }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState(0);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });

    return unsubscribe;
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative"
    >
      <div className="glass rounded-3xl p-8 transition-all duration-300 hover:bg-white/40">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${color} mb-4`}
        >
          {icon}
        </motion.div>

        {/* Number */}
        <motion.div
          className="font-display text-5xl font-bold text-stone-gray md:text-6xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {displayValue.toLocaleString()}
          {suffix}
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-2 text-lg text-stone-gray/70"
        >
          {label}
        </motion.p>

        {/* Decorative Glow */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-gold-leaf/0 via-gold-leaf/0 to-gold-leaf/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}

interface StatsCounterProps {
  artworkCount: number;
  artistCount: number;
  totalViews: number;
  totalReactions: number;
}

export function StatsCounter({
  artworkCount,
  artistCount,
  totalViews,
  totalReactions,
}: StatsCounterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // GSAP text reveal animation
  useEffect(() => {
    if (!titleRef.current) return;

    // Split text into words for animation
    const text = titleRef.current.textContent || '';
    const words = text.split(' ');
    titleRef.current.innerHTML = words
      .map((word) => `<span class="inline-block" style="opacity: 0">${word}</span>`)
      .join(' ');

    const wordElements = titleRef.current.querySelectorAll('span');

    gsap.to(wordElements, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === titleRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" data-gsap-stats>
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/2 h-64 w-64 rounded-full bg-soft-sun opacity-20 blur-[100px]" />
        <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-cloud-blue opacity-30 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 ref={titleRef} className="font-display text-4xl font-bold text-stone-gray md:text-5xl">
            The Ethereal Gallery in Numbers
          </h2>
          <p className="mt-4 text-lg text-stone-gray/70">
            A growing community celebrating art and creativity
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatItem
            value={artworkCount}
            label="Tác phẩm nghệ thuật"
            icon={<Image className="h-8 w-8 text-purple-500" />}
            color="bg-purple-500/20"
          />
          <StatItem
            value={artistCount}
            label="Nghệ sĩ tài năng"
            icon={<Users className="h-8 w-8 text-blue-500" />}
            color="bg-blue-500/20"
          />
          <StatItem
            value={totalViews}
            label="Lượt xem"
            icon={<Eye className="h-8 w-8 text-gold-leaf" />}
            suffix="+"
            color="bg-gold-leaf/20"
          />
          <StatItem
            value={totalReactions}
            label="Cảm xúc chia sẻ"
            icon={<Heart className="h-8 w-8 text-red-500" />}
            color="bg-red-500/20"
          />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-stone-gray/60">
            Tham gia cộng đồng yêu nghệ thuật của chúng tôi
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gold-leaf px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-gold-leaf/90"
            >
              Đăng ký ngay
            </motion.a>
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass rounded-full px-8 py-3 font-semibold text-stone-gray transition-all hover:bg-white/40"
            >
              Tìm hiểu thêm
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
