// Test demo account creation
console.log('🧪 Testing demo account...\n');

// Simulate demo account creation
const demoUser = {
  id: 'user_demo',
  email: 'demo@ethereal.art',
  name: 'Demo User',
  bio: 'Welcome to The Ethereal Art Gallery!',
  savedArtworks: ['art_01', 'art_03'],
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

const users = {
  'demo@ethereal.art': {
    password: 'demo123',
    user: demoUser,
  },
};

console.log('✅ Demo account data:');
console.log('Email:', users['demo@ethereal.art'].user.email);
console.log('Password:', users['demo@ethereal.art'].password);
console.log('Name:', users['demo@ethereal.art'].user.name);
console.log('\n📋 Login credentials:');
console.log('Email: demo@ethereal.art');
console.log('Password: demo123');
console.log('\n✨ Copy these exactly into the login form!');
