'use client';

import { useEffect } from 'react';
import type { User } from '@/types/user';

export function TestAccountsInit() {
  useEffect(() => {
    // Create test accounts on mount (client-side only)
    const existingUsers = localStorage.getItem('ethereal_users');
    const users = existingUsers ? JSON.parse(existingUsers) : {};

    let updated = false;

    // Admin Account
    if (!users['admin@ethereal.art']) {
      const adminUser: User = {
        id: 'user_admin',
        email: 'admin@ethereal.art',
        name: 'Admin User',
        role: 'admin',
        bio: 'Quản trị viên hệ thống. Có quyền quản lý users và toàn bộ nội dung.',
        savedArtworks: ['art_01', 'art_02'],
        preferences: {
          volume: 80,
          autoPlayAudio: true,
          smoothScroll: true,
          hapticFeedback: true,
          language: 'vi',
          darkMode: false,
        },
        createdAt: new Date().toISOString(),
      };

      users['admin@ethereal.art'] = {
        password: 'admin123',
        user: adminUser,
      };
      updated = true;
    }

    // Artist Account
    if (!users['artist@ethereal.art']) {
      const artistUser: User = {
        id: 'user_artist',
        email: 'artist@ethereal.art',
        name: 'Nguyễn Văn Nghệ',
        role: 'artist',
        artistName: 'Nguyễn Văn Nghệ',
        bio: 'Họa sĩ chuyên nghiệp. Sáng tác các tác phẩm về thiên nhiên và tâm linh.',
        savedArtworks: ['art_03', 'art_04', 'art_05'],
        artworkIds: ['art_01', 'art_03'],
        preferences: {
          volume: 75,
          autoPlayAudio: false,
          smoothScroll: true,
          hapticFeedback: true,
          language: 'vi',
          darkMode: false,
        },
        createdAt: new Date().toISOString(),
      };

      users['artist@ethereal.art'] = {
        password: 'artist123',
        user: artistUser,
      };
      updated = true;
    }

    // Regular User Account
    if (!users['user@ethereal.art']) {
      const regularUser: User = {
        id: 'user_regular',
        email: 'user@ethereal.art',
        name: 'Trần Thị Bình',
        role: 'user',
        bio: 'Người yêu nghệ thuật. Thích khám phá các tác phẩm mới.',
        savedArtworks: ['art_02', 'art_05', 'art_06'],
        preferences: {
          volume: 60,
          autoPlayAudio: false,
          smoothScroll: true,
          hapticFeedback: true,
          language: 'vi',
          darkMode: false,
        },
        createdAt: new Date().toISOString(),
      };

      users['user@ethereal.art'] = {
        password: 'user123',
        user: regularUser,
      };
      updated = true;
    }

    if (updated) {
      localStorage.setItem('ethereal_users', JSON.stringify(users));
      console.log('✅ Test accounts created!');
      console.log('📧 Admin: admin@ethereal.art / admin123');
      console.log('🎨 Artist: artist@ethereal.art / artist123');
      console.log('👤 User: user@ethereal.art / user123');
    }
  }, []);

  return null;
}
