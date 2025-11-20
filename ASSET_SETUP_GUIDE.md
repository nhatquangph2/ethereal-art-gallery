# Asset Setup Guide

This guide helps you add your own artwork images and audio files to The Ethereal Art Gallery.

## 📋 Required Assets Checklist

Based on the 6 artworks defined in `/data/artworks.ts`, you need the following files:

### Images

#### Artwork 1: Bình Minh Hy Vọng
- [ ] `/public/images/artworks/binh-minh-hy-vong.jpg` (full resolution)
- [ ] `/public/images/artworks/binh-minh-hy-vong-thumb.jpg` (thumbnail)

#### Artwork 2: Mê Cung Nội Tâm
- [ ] `/public/images/artworks/me-cung-noi-tam.jpg`
- [ ] `/public/images/artworks/me-cung-noi-tam-thumb.jpg`

#### Artwork 3: Điệu Nhảy Của Thời Gian
- [ ] `/public/images/artworks/dieu-nhay-cua-thoi-gian.jpg`
- [ ] `/public/images/artworks/dieu-nhay-cua-thoi-gian-thumb.jpg`

#### Artwork 4: Những Mảnh Vỡ Kết Nối
- [ ] `/public/images/artworks/nhung-manh-vo-ket-noi.jpg`
- [ ] `/public/images/artworks/nhung-manh-vo-ket-noi-thumb.jpg`

#### Artwork 5: Giấc Mơ Sâu Thẳm
- [ ] `/public/images/artworks/giac-mo-sau-tham.jpg`
- [ ] `/public/images/artworks/giac-mo-sau-tham-thumb.jpg`

#### Artwork 6: Vũ Khúc Của Gió
- [ ] `/public/images/artworks/vu-khuc-cua-gio.jpg`
- [ ] `/public/images/artworks/vu-khuc-cua-gio-thumb.jpg`

### Audio Files

#### Ambient Loops (Optional but recommended)
- [ ] `/public/audio/ambient/morning-birds.mp3` (Artwork 1)
- [ ] `/public/audio/ambient/wind-whispers.mp3` (Artwork 2)
- [ ] `/public/audio/ambient/clock-ticks.mp3` (Artwork 3)
- [ ] `/public/audio/ambient/rain-gentle.mp3` (Artwork 4)
- [ ] `/public/audio/ambient/underwater-hum.mp3` (Artwork 5)
- [ ] `/public/audio/ambient/wind-flowing.mp3` (Artwork 6)

#### Audio Layers (Optional but recommended)
**Artwork 1:**
- [ ] `/public/audio/layers/piano-gentle.mp3`
- [ ] `/public/audio/layers/cello-tension.mp3`
- [ ] `/public/audio/layers/strings-hopeful.mp3`

**Artwork 2:**
- [ ] `/public/audio/layers/ambient-echo.mp3`
- [ ] `/public/audio/layers/synth-dark.mp3`
- [ ] `/public/audio/layers/bell-resonance.mp3`

**Artwork 3:**
- [ ] `/public/audio/layers/harp-gentle.mp3`
- [ ] `/public/audio/layers/crystal-chimes.mp3`
- [ ] `/public/audio/layers/violin-ethereal.mp3`

**Artwork 4:**
- [ ] `/public/audio/layers/piano-contemplative.mp3`
- [ ] `/public/audio/layers/cello-warm.mp3`
- [ ] `/public/audio/layers/strings-uplifting.mp3`

**Artwork 5:**
- [ ] `/public/audio/layers/ambient-deep.mp3`
- [ ] `/public/audio/layers/synth-mysterious.mp3`
- [ ] `/public/audio/layers/whale-song.mp3`

**Artwork 6:**
- [ ] `/public/audio/layers/flute-airy.mp3`
- [ ] `/public/audio/layers/bamboo-chimes.mp3`
- [ ] `/public/audio/layers/strings-freedom.mp3`

## 🖼️ Image Specifications

### Full Resolution Images
- **Dimensions**: 2000px+ on the longest side
- **Format**: JPG (recommended) or PNG
- **Quality**: High quality for deep zoom
- **File size**: Aim for under 2MB with optimization
- **Aspect ratio**: 3:4 portrait works best

### Thumbnail Images
- **Dimensions**: 600 × 800px (portrait)
- **Format**: JPG (recommended)
- **Quality**: Medium-high (80-90% JPG quality)
- **File size**: Under 200KB
- **Aspect ratio**: Same as full resolution (3:4)

### Quick Image Prep with ImageMagick

```bash
# Install ImageMagick
brew install imagemagick  # macOS
sudo apt install imagemagick  # Linux

# Create thumbnail from full image
magick your-image.jpg -resize 600x800^ -gravity center -extent 600x800 your-image-thumb.jpg

# Optimize full resolution image
magick your-image.jpg -resize 2000x2000\> -quality 85 your-image-optimized.jpg
```

## 🎵 Audio Specifications

### Ambient Loops
- **Duration**: 30-60 seconds
- **Format**: MP3
- **Bitrate**: 128-192 kbps
- **Looping**: Must loop seamlessly (fade out = fade in)
- **Volume**: Normalized to -18 LUFS
- **Style**: Atmospheric, non-intrusive background

### Audio Layers
- **Duration**: 5-15 seconds
- **Format**: MP3
- **Bitrate**: 128 kbps
- **Fade**: Gentle fade in/out (handled by code)
- **Volume**: Normalized to -14 LUFS
- **Style**: Complementary to ambient

## 🎨 Where to Find Assets

### Free Stock Images
- [Unsplash](https://unsplash.com/) - High quality, free to use
- [Pexels](https://pexels.com/) - Free stock photos
- [Pixabay](https://pixabay.com/) - Free images and videos
- [Wikimedia Commons](https://commons.wikimedia.org/) - Free cultural works

### Free Audio Resources
- [Freesound](https://freesound.org/) - Creative Commons sounds
- [Incompetech](https://incompetech.com/) - Royalty-free music
- [FreeStockMusic](https://www.freestockmusic.com/) - Free background music
- [Zapsplat](https://www.zapsplat.com/) - Sound effects and music

### AI-Generated Options
- **Images**: [Midjourney](https://midjourney.com/), [DALL-E](https://openai.com/dall-e-2)
- **Audio**: [Suno](https://suno.ai/), [Soundraw](https://soundraw.io/)

## 🛠️ Quick Setup Script

Save this as `setup-assets.sh` and run it to create the folder structure:

```bash
#!/bin/bash

# Create image directories
mkdir -p public/images/artworks

# Create audio directories
mkdir -p public/audio/ambient
mkdir -p public/audio/layers

echo "✅ Asset directories created!"
echo ""
echo "Next steps:"
echo "1. Add your images to public/images/artworks/"
echo "2. Add your audio to public/audio/ambient/ and public/audio/layers/"
echo "3. Make sure filenames match those in /data/artworks.ts"
echo ""
echo "See ASSET_SETUP_GUIDE.md for detailed specifications."
```

Make it executable:
```bash
chmod +x setup-assets.sh
./setup-assets.sh
```

## ⚡ Quick Start with Placeholders

If you want to test the app immediately without real assets:

1. **Use placeholder images** from Unsplash:
   ```bash
   cd public/images/artworks

   # Download 6 placeholder images
   curl -o binh-minh-hy-vong.jpg "https://source.unsplash.com/random/2000x2667/?sunrise"
   curl -o binh-minh-hy-vong-thumb.jpg "https://source.unsplash.com/random/600x800/?sunrise"
   # Repeat for other artworks...
   ```

2. **Audio is optional** - the app will work without it, just without the immersive sound experience.

## 🔍 Verifying Your Assets

Run this command to check which assets are missing:

```bash
cd public

# Check images
for img in images/artworks/*.jpg; do
  [ -f "$img" ] && echo "✅ $img" || echo "❌ Missing: $img"
done

# Check audio
for audio in audio/ambient/*.mp3 audio/layers/*.mp3; do
  [ -f "$audio" ] && echo "✅ $audio" || echo "⚠️  Missing: $audio (optional)"
done
```

## 🎯 Testing Checklist

After adding your assets:

- [ ] Gallery page loads with all 6 artwork cards
- [ ] Clicking a card opens the artwork detail page
- [ ] Images display correctly on detail pages
- [ ] Ambient audio plays when entering artwork page
- [ ] Audio layers fade in/out as you scroll
- [ ] Deep zoom works when clicking "Deep Zoom" button
- [ ] Mobile bottom navigation is functional
- [ ] Volume controls work properly

## 💡 Tips

1. **Start simple**: Add 1-2 artworks first to test everything works
2. **Optimize images**: Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
3. **Test audio**: Make sure loops are seamless before adding
4. **Check file sizes**: Keep total asset size under 50MB for fast loading
5. **Responsive testing**: Test on mobile devices with actual images

## 🆘 Need Help?

If you're stuck:
1. Check the browser console for errors (F12)
2. Verify file paths exactly match what's in `/data/artworks.ts`
3. Ensure file names are lowercase and match exactly (case-sensitive)
4. Check file permissions (files should be readable)

---

Happy curating! 🎨✨
