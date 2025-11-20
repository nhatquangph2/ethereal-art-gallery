'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User, UserPlus, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useHaptic } from '@/lib/haptic';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { onTap } = useHaptic();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    onTap();

    // Validation
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(email, password, name);
      if (success) {
        router.push('/profile');
      } else {
        setError('Email đã được sử dụng. Vui lòng chọn email khác.');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-blue to-soft-sun">
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
            Đăng Ký
          </h1>
          <div className="w-10" />
        </div>
      </motion.header>

      {/* Content */}
      <div className="container mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md"
        >
          {/* Logo/Title */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gold-leaf/20"
            >
              <Sparkles className="h-10 w-10 text-gold-leaf" />
            </motion.div>
            <h2 className="font-display text-3xl font-bold text-stone-gray">
              Tạo Tài Khoản
            </h2>
            <p className="mt-2 text-stone-gray/70">
              Bắt đầu hành trình nghệ thuật của bạn
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-600"
              >
                {error}
              </motion.div>
            )}

            {/* Name Field */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-stone-gray">
                Họ và tên
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-gray/50" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  required
                  className="w-full rounded-xl bg-white/50 py-3 pl-12 pr-4 text-stone-gray outline-none transition-all focus:bg-white/70 focus:ring-2 focus:ring-gold-leaf/50"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-stone-gray">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-gray/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-xl bg-white/50 py-3 pl-12 pr-4 text-stone-gray outline-none transition-all focus:bg-white/70 focus:ring-2 focus:ring-gold-leaf/50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-stone-gray">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-gray/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full rounded-xl bg-white/50 py-3 pl-12 pr-4 text-stone-gray outline-none transition-all focus:bg-white/70 focus:ring-2 focus:ring-gold-leaf/50"
                />
              </div>
              <p className="mt-1 text-xs text-stone-gray/60">
                Ít nhất 6 ký tự
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-stone-gray">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-gray/50" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl bg-white/50 py-3 pl-12 pr-4 text-stone-gray outline-none transition-all focus:bg-white/70 focus:ring-2 focus:ring-gold-leaf/50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-leaf py-3 font-semibold text-white shadow-lg transition-all hover:bg-gold-leaf/90 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Đang tạo tài khoản...</span>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Đăng Ký</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-stone-gray/70">
              Đã có tài khoản?{' '}
              <Link
                href="/login"
                onClick={onTap}
                className="font-semibold text-gold-leaf hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
