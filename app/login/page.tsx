'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useHaptic } from '@/lib/haptic';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { onTap } = useHaptic();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    onTap();

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/profile');
      } else {
        setError('Email hoặc mật khẩu không đúng');
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
            Đăng Nhập
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
              Chào Mừng Trở Lại
            </h2>
            <p className="mt-2 text-stone-gray/70">
              Đăng nhập để tiếp tục trải nghiệm
            </p>
          </div>

          {/* Login Form */}
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
            <div className="mb-6">
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
                <span>Đang đăng nhập...</span>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Đăng Nhập</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-stone-gray/70">
              Chưa có tài khoản?{' '}
              <Link
                href="/register"
                onClick={onTap}
                className="font-semibold text-gold-leaf hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Demo Account Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 glass rounded-2xl p-4"
          >
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-stone-gray/50">
              Demo Account
            </p>
            <p className="text-center text-sm text-stone-gray/70">
              Email: <span className="font-mono">demo@ethereal.art</span>
              <br />
              Password: <span className="font-mono">demo123</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
