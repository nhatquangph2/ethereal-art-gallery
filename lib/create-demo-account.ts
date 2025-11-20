import type { User } from '@/types/user';

/**
 * Create demo account for testing
 * Email: demo@ethereal.art
 * Password: demo123
 */
export function createDemoAccount() {
  if (typeof window === 'undefined') return;

  const existingUsers = localStorage.getItem('ethereal_users');
  const users = existingUsers ? JSON.parse(existingUsers) : {};

  // Check if demo account already exists
  if (users['demo@ethereal.art']) {
    return;
  }

  // Create demo user with ADMIN role
  const demoUser: User = {
    id: 'user_demo',
    email: 'demo@ethereal.art',
    name: 'Demo Admin',
    role: 'admin', // Admin role for testing
    bio: 'Welcome to The Ethereal Art Gallery! This is a demo ADMIN account.',
    savedArtworks: ['art_01', 'art_03'], // Pre-saved artworks
    preferences: {
      volume: 70,
      autoPlayAudio: true,
      smoothScroll: true,
      hapticFeedback: true,
      language: 'vi',
      darkMode: false,
    },
    createdAt: new Date().toISOString(),
  };

  users['demo@ethereal.art'] = {
    password: 'demo123',
    user: demoUser,
  };

  localStorage.setItem('ethereal_users', JSON.stringify(users));
  console.log('✅ Demo account created!');
}

// Auto-create demo account on first load
if (typeof window !== 'undefined') {
  createDemoAccount();
}
