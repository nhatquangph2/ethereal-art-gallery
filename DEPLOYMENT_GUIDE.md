# 🚀 Deployment Guide - Ethereal Art Gallery

Complete guide to deploy your art gallery to GitHub and Vercel.

---

## 📋 Prerequisites

- GitHub account (create at https://github.com/join)
- Git configured on your computer
- Vercel account (free, sign up with GitHub at https://vercel.com/signup)

---

## Part 1: Push to GitHub 🐙

### Option A: Using the automated script (Recommended)

1. **First, create the repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `ethereal-art-gallery`
   - Description: `A sophisticated art gallery platform with scrollytelling`
   - Visibility: Public
   - ⚠️ **DO NOT** check "Add a README file" or any other options
   - Click "Create repository"

2. **Run the push script**:
   ```bash
   ./push-to-github.sh YOUR_GITHUB_USERNAME
   ```

   Example:
   ```bash
   ./push-to-github.sh tranhuykhiem
   ```

### Option B: Manual push

```bash
# 1. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ethereal-art-gallery.git

# 2. Push to GitHub
git push -u origin main
```

### Verify GitHub Push

After pushing, visit:
```
https://github.com/YOUR_USERNAME/ethereal-art-gallery
```

You should see:
- ✅ All 100 files
- ✅ README.md displaying properly
- ✅ Latest commit message
- ✅ Green "Code" button

---

## Part 2: Deploy to Vercel ▲

### Step 1: Connect Vercel to GitHub

1. **Go to**: https://vercel.com/new
2. **Sign in** with your GitHub account
3. **Authorize Vercel** to access your repositories

### Step 2: Import Project

1. **Find your repository**:
   - Search for "ethereal-art-gallery"
   - Click "Import"

2. **Configure Project**:
   ```
   Project Name: ethereal-art-gallery
   Framework Preset: Next.js
   Root Directory: ./

   Build Command: (leave default) npm run build
   Output Directory: (leave default) .next
   Install Command: (leave default) npm install
   ```

3. **Environment Variables** (Optional):
   ```bash
   # Add if you have analytics
   NEXT_PUBLIC_GA_ID=your-google-analytics-id

   # Add if you have Sentry
   NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
   ```

4. **Click "Deploy"**

### Step 3: Wait for Deployment

- ⏳ Vercel will build your project (1-3 minutes)
- ✅ You'll get a live URL: `https://ethereal-art-gallery-xxx.vercel.app`

### Step 4: Configure Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Update DNS records (Vercel will provide instructions)

---

## 🎯 Quick Deploy Commands

If you have Vercel CLI installed:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## ✅ Post-Deployment Checklist

### Test Everything:

- [ ] Home page loads
- [ ] Carousel auto-rotates
- [ ] Horizontal gallery scrolls
- [ ] Stats counter animates
- [ ] Artwork pages load
- [ ] Audio plays (after user interaction)
- [ ] Login/Register works
- [ ] File upload works
- [ ] Mobile responsive
- [ ] GSAP animations work

### Performance:

- [ ] Run Lighthouse audit (aim for 90+ score)
- [ ] Check mobile performance
- [ ] Test on different browsers

### SEO:

- [ ] Update meta tags in `app/layout.tsx`
- [ ] Add Open Graph images
- [ ] Submit sitemap to Google Search Console

---

## 🔧 Troubleshooting

### Build Failed on Vercel

**Error: Missing dependencies**
```bash
# Solution: Ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "fix: update dependencies"
git push
```

**Error: Environment variables**
```bash
# Solution: Add env vars in Vercel dashboard
# Project Settings → Environment Variables
```

### Audio Not Playing

**Issue**: Browser autoplay policy
```typescript
// Solution: Already implemented - audio requires user interaction
// Make sure users click/tap before audio plays
```

### Images Not Loading

**Issue**: File paths incorrect
```bash
# Solution: All images should be in /public
# Access as /images/artworks/filename.jpg (no /public prefix)
```

---

## 🌐 Deployment URLs

After deployment, you'll have:

- **Production**: `https://ethereal-art-gallery.vercel.app`
- **GitHub**: `https://github.com/YOUR_USERNAME/ethereal-art-gallery`
- **Preview**: Automatic preview for each PR

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push

# Vercel automatically deploys!
```

### Deployment Branches:

- `main` → Production deployment
- Other branches → Preview deployments
- Pull requests → Preview deployments

---

## 📊 Analytics & Monitoring

### Vercel Analytics (Recommended)

1. Go to Project → Analytics
2. Enable Vercel Analytics (free tier available)
3. View real-time metrics

### Google Analytics (Optional)

Add to `.env.local`:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Update `app/layout.tsx` to include GA script.

---

## 🔒 Security

### Vercel Automatically Provides:

- ✅ HTTPS/SSL certificates
- ✅ DDoS protection
- ✅ Global CDN
- ✅ Automatic security headers

### Additional Security:

Add to `next.config.ts`:
```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ];
}
```

---

## 💡 Tips for Better Performance

### 1. Enable Image Optimization

Vercel automatically optimizes images. Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/images/artworks/artwork.jpg"
  alt="Artwork"
  width={800}
  height={600}
  priority
/>
```

### 2. Enable Caching

Already configured in `next.config.ts`

### 3. Use Vercel Edge Functions

For API routes that need ultra-low latency.

---

## 🎉 You're Live!

After deployment, share your gallery:

```
🌐 Live Site: https://ethereal-art-gallery.vercel.app
📁 Source Code: https://github.com/YOUR_USERNAME/ethereal-art-gallery
📱 Mobile: Scan QR code on Vercel dashboard
```

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Deployment Issues**: https://vercel.com/support

---

**Happy Deploying! 🚀**

*Built with ❤️ using Next.js + Vercel*
