#!/bin/bash

echo "🎨 Setting up The Ethereal Art Gallery assets..."
echo ""

# Create image directories
mkdir -p public/images/artworks

# Create audio directories
mkdir -p public/audio/ambient
mkdir -p public/audio/layers

echo "✅ Asset directories created!"
echo ""
echo "📁 Directory structure:"
echo "   public/"
echo "   ├── images/artworks/"
echo "   └── audio/"
echo "       ├── ambient/"
echo "       └── layers/"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Add your artwork images to: public/images/artworks/"
echo "   - Full resolution images (e.g., artwork-name.jpg)"
echo "   - Thumbnails (e.g., artwork-name-thumb.jpg)"
echo ""
echo "2. Add your audio files to:"
echo "   - Ambient loops: public/audio/ambient/"
echo "   - Audio layers: public/audio/layers/"
echo ""
echo "3. Make sure filenames match those in: data/artworks.ts"
echo ""
echo "4. See ASSET_SETUP_GUIDE.md for detailed specifications"
echo ""
echo "💡 Quick test with placeholders:"
echo "   The app will run without audio, but needs at least placeholder images."
echo "   You can use free images from Unsplash or Pexels."
echo ""
echo "🚀 When ready, run: npm run dev"
echo ""
