# 🎨 Switch to Real Content - Step by Step Guide

## ✅ What's Already Done:

1. ✅ **10 famous artworks downloaded** to `public/images/artworks/`
2. ✅ **Real data file created** at `data/real-artworks.ts`
3. ✅ **Credits file created** at `public/CREDITS.md`
4. ✅ **Backup of original** at `data/artworks.backup.ts`

---

## 🎵 Step 1: Download Music (Required)

### Quick Option - Free No-Attribution Music:

Visit **Pixabay Music** and download these tracks:
```
🌐 https://pixabay.com/music/search/ambient/
```

**Recommended Downloads:**

1. **Ambient/Background** (for audioAmbient):
   - Search: "peaceful ambient"
   - Search: "night ambient"
   - Search: "nature calm"
   - Download 5-7 ambient tracks

2. **Piano** (for story layers):
   - Search: "piano gentle"
   - Search: "piano contemplative"
   - Download 3-4 piano tracks

3. **Strings** (for story layers):
   - Search: "strings cinematic"
   - Search: "cello emotional"
   - Download 3-4 string tracks

**Save to:**
```bash
public/audio/ambient/    # Background music
public/audio/layers/     # Story segment music
```

**Rename files to match** these names (used in real-artworks.ts):
```
ambient/:
- night-peaceful.mp3
- ocean-calm.mp3
- chamber-music.mp3
- garden-peaceful.mp3
- romantic-strings.mp3
- tension-ambient.mp3
- mountain-wind.mp3
- renaissance-pastoral.mp3
- city-night.mp3
- surreal-ambient.mp3

layers/:
- strings-gentle.mp3
- piano-contemplative.mp3
- strings-hopeful.mp3
- strings-dramatic.mp3
- harpsichord-baroque.mp3
- strings-intimate.mp3
- cello-gentle.mp3
- piano-gentle.mp3
- strings-floating.mp3
- ambient-water.mp3
(etc... you can reuse similar tracks)
```

---

## 🔄 Step 2: Update Your Code to Use Real Content

### Option A: Replace Completely (Recommended)

```bash
# Backup current artworks
cp data/artworks.ts data/artworks.old.ts

# Use real artworks
cp data/real-artworks.ts data/artworks.ts
```

Then edit `data/artworks.ts`:
```typescript
// Change all exports from 'realArtworks' to 'artworks'
export const artworks: Artwork[] = [
  // All the real artwork data
];

// Change function names
export function getAllArtworks() { ... }
export function getArtworkById(id: string) { ... }
export function getRecommendedArtworks(currentId: string) { ... }
```

### Option B: Mix Real and Original Content

Keep both files and import where needed:

```typescript
// In any component
import { artworks as originalArtworks } from '@/data/artworks';
import { realArtworks } from '@/data/real-artworks';

// Use real artworks in featured carousel
const featured = realArtworks.slice(0, 5);

// Use original in other sections
const otherArtworks = originalArtworks;
```

---

## 🎨 Step 3: Test Your Gallery

```bash
# Start dev server if not running
npm run dev

# Visit in browser
open http://localhost:3000
```

**Check:**
- ✅ Images load correctly
- ✅ Titles and descriptions show real artwork info
- ✅ Audio files play (after you add them)
- ✅ All links work
- ✅ No console errors

---

## 📝 Step 4: Add Music Attribution

Edit `public/CREDITS.md` and add your music sources:

```markdown
## Music

### Ambient Background Tracks
- "Peaceful Night" by [Artist Name]
  - Source: Pixabay Music
  - License: Free for commercial use, no attribution required
  - URL: [direct link]

### Story Segment Music
- "Gentle Strings" by [Artist Name]
  - Source: Free Music Archive
  - License: CC0 1.0 Universal
  - URL: [direct link]

(Add all tracks you use)
```

---

## 🚀 Step 5: Deploy to Production

```bash
# Commit changes
git add .
git commit -m "feat: switch to real famous artworks

- Add 10 masterpieces from art history
- All images from Wikimedia Commons (Public Domain)
- Updated artwork data with historical information
- Add comprehensive story segments for each artwork

Artworks included:
- The Starry Night (Van Gogh)
- The Great Wave (Hokusai)
- Girl with a Pearl Earring (Vermeer)
- Water Lilies (Monet)
- The Kiss (Klimt)
- The Scream (Munch)
- Wanderer above Sea of Fog (Friedrich)
- The Birth of Venus (Botticelli)
- Nighthawks (Hopper)
- The Son of Man (Magritte)

🤖 Generated with [Claude Code](https://claude.com/claude-code)"

# Push to GitHub
git push origin main

# Vercel will auto-deploy!
```

---

## 🎯 Alternative: Use Placeholder Audio

If you can't download music right away, you can use placeholder silence:

```bash
# Create silent audio files (requires ffmpeg)
brew install ffmpeg  # On macOS

# Create 30-second silent MP3
ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 30 -q:a 9 -acodec libmp3lame public/audio/ambient/silence.mp3

# Copy for all needed files
for name in night-peaceful ocean-calm chamber-music garden-peaceful romantic-strings tension-ambient mountain-wind renaissance-pastoral city-night surreal-ambient; do
  cp public/audio/ambient/silence.mp3 "public/audio/ambient/$name.mp3"
done

for name in strings-gentle piano-contemplative strings-hopeful strings-dramatic harpsichord-baroque strings-intimate cello-gentle piano-gentle strings-floating ambient-water; do
  cp public/audio/ambient/silence.mp3 "public/audio/layers/$name.mp3"
done
```

---

## 🎁 Bonus: Download Script for Music

I can create a script to help organize music downloads:

```bash
#!/bin/bash
# organize-music.sh

echo "📁 Creating audio directories..."
mkdir -p public/audio/ambient
mkdir -p public/audio/layers

echo ""
echo "🎵 Please download music from:"
echo "- https://pixabay.com/music/"
echo "- https://freemusicarchive.org"
echo ""
echo "Save ambient tracks to: public/audio/ambient/"
echo "Save layer tracks to: public/audio/layers/"
echo ""
echo "Rename files to match the names in real-artworks.ts"
```

---

## ✅ Checklist

- [ ] 10 artwork images downloaded (✅ DONE)
- [ ] Real artwork data file created (✅ DONE)
- [ ] Ambient music files downloaded
- [ ] Story layer music files downloaded
- [ ] Files renamed correctly
- [ ] Code updated to use real content
- [ ] Credits.md updated with music attribution
- [ ] Tested locally
- [ ] Committed and pushed to GitHub
- [ ] Deployed to Vercel

---

## 🆘 Troubleshooting

**Images not showing?**
```bash
# Check files exist
ls -la public/images/artworks/

# Check file names match exactly
# Example: starry-night.jpg NOT Starry-Night.jpg
```

**Audio not playing?**
```bash
# Check browser console for errors
# Verify file paths match in real-artworks.ts
# Check file formats (MP3 recommended)
```

**Build errors?**
```bash
# TypeScript errors - check imports
# Run type check:
npm run type-check
```

---

## 📚 Resources

**Image Sources (Public Domain):**
- Wikimedia Commons: https://commons.wikimedia.org
- Met Museum: https://www.metmuseum.org/art/collection
- Rijksmuseum: https://www.rijksmuseum.nl/en/rijksstudio

**Music Sources (Free/Royalty-Free):**
- Pixabay: https://pixabay.com/music/
- Incompetech: https://incompetech.com/music/
- Free Music Archive: https://freemusicarchive.org
- Musopen (Classical): https://musopen.org

---

**🎉 Enjoy your gallery with real masterpieces!**
