# 🎨 The Ethereal Art Gallery

> **Nơi trú ẩn cho tâm hồn** - A sophisticated, immersive art gallery platform with advanced scrollytelling, adaptive audio, and comprehensive CMS features.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green)](https://greensock.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A world-class web application that transforms art viewing into a multi-sensory journey, inspired by prestigious institutions like Rijksmuseum, MoMA, Van Gogh Museum, and The New York Times' storytelling approach.

---

## ✨ Features

### 🎭 Core Art Experience
- **🎬 Advanced Scrollytelling**: NYT/Guardian-style narrative scrolling with GSAP ScrollTrigger
- **🎵 Adaptive Audio System**: Multi-layered audio that responds to scroll position using Howler.js
- **🔍 Deep Zoom**: Rijksmuseum-inspired high-resolution image viewing with OpenSeadragon
- **📱 Mobile-First Design**: 90% optimized for mobile with gesture controls and haptic feedback
- **✨ Advanced GSAP Animations**:
  - Parallax effects on carousel
  - Scroll-triggered reveals with stagger
  - Magnetic cursor effects
  - Pin/unpin sections
  - Text split animations

### 👥 User Management
- **🔐 Authentication System**: Login, Register, Profile management
- **👤 Role-Based Access Control**:
  - Regular Users (view and react)
  - Artists (upload artworks, create stories)
  - Admins (full control, user management)
- **📊 User Profiles**: Avatar upload, bio, preferences

### 🎨 Artist Dashboard
- **📤 Artwork Upload**: Drag & drop file upload for images and audio
- **🎬 Story Builder**: Create narrative segments with:
  - Synchronized audio layers
  - Image effects (zoom, pan, rotate)
  - Duration control
  - Drag & drop audio upload
- **🔍 Search & Filter**: Search by title, tags, filter by year/medium
- **📈 Analytics**: View counts, reactions, engagement metrics
- **✏️ Edit & Delete**: Full CRUD operations on artworks

### 🛠️ Admin Panel
- **👥 User Management**: Approve artists, manage roles
- **🎨 Artwork Moderation**: Review and approve submissions
- **📊 Dashboard Analytics**: Platform statistics and insights
- **🔧 System Settings**: Platform configuration

### 💬 Social Features
- **❤️ Reactions System**: 4 reaction types
  - Love (Heart)
  - Inspiring (Sparkles)
  - Thoughtful (Brain)
  - Beautiful (Star)
- **💭 Comments**: Full commenting system with likes
- **📊 Engagement Tracking**: View counts, reaction counts

### 🏠 Enhanced Home Page
- **🎠 Featured Carousel**: Auto-rotating showcase with parallax effects
- **📊 Animated Stats Counter**: Real-time counting with spring physics
- **🎞️ Horizontal Gallery**: Van Gogh Museum-style scrolling gallery
- **🎯 Scroll Progress Indicator**: Visual scroll tracking
- **✨ Magnetic Cursor**: Interactive hover effects (desktop)

### 🎨 Design System
- **Heavenly Palette**:
  - Cloud Blue (#f0f9ff)
  - Soft Sun (#fdf6e3)
  - Porcelain White (#fefefe)
  - Stone Gray (#333333)
  - Gold Leaf (#d4af37)
- **Typography**:
  - Display: Cormorant Garamond
  - Body: Inter
- **Effects**:
  - Glassmorphism UI
  - Light blooms and gradients
  - GPU-accelerated animations
  - Smooth transitions

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router + Server Components)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS v4
- **Animations**:
  - GSAP 3.12 (ScrollTrigger, ScrollSmoother)
  - Framer Motion (UI interactions)
  - Lenis (smooth scroll)
- **Audio**: Howler.js
- **Deep Zoom**: OpenSeadragon
- **Icons**: Lucide React
- **Notifications**: Sonner

### Backend & Storage
- **API Routes**: Next.js API Routes
- **Storage**: LocalStorage (client-side persistence)
- **File Upload**: FormData + File System API
- **Authentication**: Custom JWT-like system

### Developer Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript strict mode
- **Hot Reload**: Next.js Fast Refresh

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ethereal-art-gallery.git
   cd ethereal-art-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up demo data** (optional)
   ```bash
   node setup-with-placeholders.js
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Test Accounts

The app comes with pre-configured demo accounts:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| Admin | admin@ethereal.art | admin123 | Full system access |
| Artist | artist@ethereal.art | artist123 | Upload & manage artworks |
| User | user@ethereal.art | user123 | View & interact |

---

## 📁 Project Structure

```
ethereal-art-gallery/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Home page with carousel & galleries
│   ├── artwork/[id]/            # Dynamic artwork pages
│   ├── artist/                  # Artist dashboard
│   │   ├── page.tsx            # Artwork management
│   │   ├── upload/             # Upload new artwork
│   │   └── story-builder/      # Story segment editor
│   ├── admin/                   # Admin dashboard
│   ├── login/                   # Authentication
│   ├── register/               # User registration
│   ├── profile/                # User profile
│   ├── settings/               # User settings
│   ├── about/                  # About page
│   └── api/                    # API routes
│       └── upload/             # File upload endpoint
├── components/                  # React components
│   ├── ui/                     # Reusable UI components
│   │   ├── bottom-navigation.tsx
│   │   ├── desktop-header.tsx
│   │   ├── breadcrumbs.tsx
│   │   ├── file-upload.tsx
│   │   └── skeleton.tsx
│   ├── home/                   # Home page components
│   │   ├── featured-carousel.tsx
│   │   ├── horizontal-gallery.tsx
│   │   └── stats-counter.tsx
│   ├── gallery/                # Gallery components
│   │   └── artwork-card.tsx
│   ├── artwork/                # Artwork detail components
│   │   ├── scrollytelling-viewer.tsx
│   │   └── comments-section.tsx
│   ├── audio/                  # Audio components
│   │   └── audio-player.tsx
│   └── gsap-scroll-effects.tsx # GSAP animations
├── lib/                        # Utilities & hooks
│   ├── audio-manager.ts       # Audio system
│   ├── auth-context.tsx       # Authentication
│   ├── scrollytelling.ts      # Scrollytelling logic
│   ├── use-gsap-scroll.ts     # GSAP hooks
│   ├── use-keyboard-shortcuts.ts
│   └── haptic.ts              # Haptic feedback
├── types/                      # TypeScript definitions
│   └── artwork.ts             # Data models
├── data/                       # Static data
│   └── artworks.ts            # Artwork content
├── public/                     # Static assets
│   ├── images/artworks/       # Artwork images
│   └── audio/                 # Audio files
│       ├── ambient/           # Background loops
│       └── layers/            # Story segment audio
└── README.md                  # This file
```

---

## 🎨 Using the Platform

### For Users
1. **Browse Gallery**: Explore artworks on the home page
2. **View Artwork**: Click any artwork for immersive experience
3. **React & Comment**: Share your thoughts (login required)
4. **Create Account**: Register to unlock social features

### For Artists
1. **Request Artist Role**: Contact admin after registration
2. **Upload Artwork**: Use Artist Dashboard → Upload
   - Upload images (up to 10MB)
   - Add audio layers (up to 50MB)
   - Set metadata (title, description, tags)
3. **Build Story**: Use Story Builder to create narrative segments
   - Add text for each segment
   - Upload audio layers
   - Choose image effects
   - Set durations
4. **Manage Portfolio**: Edit, delete, or clone artworks

### For Admins
1. **User Management**: Approve artist applications
2. **Content Moderation**: Review artwork submissions
3. **Analytics**: Monitor platform engagement

---

## 📤 File Upload System

### Supported Formats
- **Images**: JPG, PNG (max 10MB)
- **Audio**: MP3, WAV, OGG (max 50MB)

### Auto-Organization
Files are automatically organized:
```
public/
├── images/artworks/          # Uploaded artwork images
└── audio/
    ├── ambient/             # Ambient background audio
    └── layers/              # Story segment audio
```

### Usage
```tsx
<FileUpload
  type="image"
  accept="image/*"
  label="Upload Artwork"
  onFileSelect={(path) => setImagePath(path)}
/>
```

---

## 🎬 Advanced Animations

### GSAP Effects Available

**Parallax Layers**
```tsx
data-parallax
data-parallax-speed="0.5"
```

**Fade In on Scroll**
```tsx
data-gsap-fade
```

**Zoom & Blur Effect**
```tsx
data-gsap-zoom-scroll
```

**Rotate on Scroll**
```tsx
data-gsap-rotate
```

**Magnetic Hover**
```tsx
data-magnetic
```

### Custom Animations
See `/lib/use-gsap-scroll.ts` for animation hooks

---

## 🎵 Audio System

### Features
- Multi-layered audio playback
- Smooth fade in/out
- Volume control
- Mute functionality
- Synchronized with scroll position

### Adding Audio
```typescript
{
  audioAmbient: '/audio/ambient/morning-birds.mp3',
  storySegments: [
    {
      audioLayer: '/audio/layers/piano-gentle.mp3',
      // ...
    }
  ]
}
```

---

## ⚙️ Configuration

### Environment Variables
Create `.env.local`:
```bash
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# Optional: Error tracking
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Customization

**Colors** - Edit `app/globals.css`:
```css
:root {
  --cloud-blue: #f0f9ff;
  --soft-sun: #fdf6e3;
  --gold-leaf: #d4af37;
}
```

**Fonts** - Edit `app/layout.tsx`:
```tsx
import { Inter, Cormorant_Garamond } from 'next/font/google';
```

**Content** - Edit `data/artworks.ts` to add/modify artworks

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Deploy automatically

### Self-Hosting

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup
- Node.js 18+
- 1GB RAM minimum
- 10GB storage for assets

---

## 📱 Mobile Optimization

### Features
- Touch gestures (swipe, pinch-to-zoom)
- Haptic feedback
- Bottom navigation for thumb-friendly access
- Optimized images (lazy loading)
- Service worker (offline support)

### Testing on Mobile
1. Find your local IP: `ifconfig | grep inet`
2. Access from mobile: `http://YOUR_IP:3000`
3. Or generate QR code for easy access

---

## 🔧 Development Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

---

## 🐛 Troubleshooting

### Common Issues

**Audio not playing**
- Check browser autoplay policies
- Ensure user interaction before playback
- Verify file paths in `/data/artworks.ts`
- Check browser console for errors

**Images not loading**
- Verify file paths match exactly (case-sensitive)
- Check file exists in `/public/images/artworks/`
- Clear Next.js cache: `rm -rf .next`

**Animations not working**
- Ensure GSAP is installed: `npm install gsap`
- Check for JavaScript errors in console
- Verify ScrollTrigger is registered

**Upload failing**
- Check file size (10MB images, 50MB audio)
- Verify write permissions on `/public` directory
- Check browser console for errors

---

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Framer Motion](https://www.framer.com/motion/)
- [Howler.js](https://howlerjs.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🎨 Inspiration & Credits

### Inspired By
- **Rijksmuseum**: Deep zoom image exploration
- **MoMA**: Modern, clean gallery interface
- **Van Gogh Museum**: Horizontal scrolling galleries
- **The New York Times**: Advanced scrollytelling techniques
- **Google Arts & Culture**: Mood-based discovery

### Technologies
- Built with [Next.js](https://nextjs.org/)
- Animations by [GSAP](https://greensock.com/)
- UI components with [Framer Motion](https://www.framer.com/motion/)
- Audio powered by [Howler.js](https://howlerjs.com/)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- Vietnamese art community for inspiration
- Open source contributors
- Museum institutions for UX patterns
- Artists who make the world beautiful

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/ethereal-art-gallery/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/ethereal-art-gallery/discussions)
- **Email**: support@ethereal.art

---

**Built with ❤️ for immersive art experiences**

*Nơi trú ẩn cho tâm hồn* 🌟

---

## 🔮 Roadmap

### v2.0 (Planned)
- [ ] Real database (PostgreSQL/MongoDB)
- [ ] Cloud file storage (AWS S3/Cloudinary)
- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] NFT integration
- [ ] AR/VR experiences
- [ ] Multi-language support

### v1.5 (In Progress)
- [x] Advanced GSAP animations
- [x] File upload system
- [x] Search & filter
- [x] Comments & reactions
- [x] Story builder
- [x] User authentication
- [x] Role-based access
- [x] Artist dashboard
- [x] Admin panel

---

**Current Version**: v1.5.0
**Last Updated**: November 2024
