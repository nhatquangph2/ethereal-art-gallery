#!/bin/bash

echo "🎵 Creating audio placeholder files..."
echo ""

# Ensure directories exist
mkdir -p public/audio/ambient
mkdir -p public/audio/layers

# Wait for ffmpeg if not yet available
while ! command -v ffmpeg &> /dev/null; do
    echo "⏳ Waiting for ffmpeg installation..."
    sleep 2
done

echo "✅ ffmpeg is ready!"
echo ""

# Create a 30-second silent MP3 file
echo "📝 Creating base silent audio file..."
ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 30 -q:a 9 -acodec libmp3lame public/audio/silence.mp3 -y 2>/dev/null

echo "✅ Base silent file created"
echo ""

# Ambient tracks needed
echo "🎼 Creating ambient tracks..."
ambient_files=(
    "night-peaceful"
    "ocean-calm"
    "chamber-music"
    "garden-peaceful"
    "romantic-strings"
    "tension-ambient"
    "mountain-wind"
    "renaissance-pastoral"
    "city-night"
    "surreal-ambient"
)

for name in "${ambient_files[@]}"; do
    cp public/audio/silence.mp3 "public/audio/ambient/$name.mp3"
    echo "  ✓ $name.mp3"
done

echo ""
echo "🎹 Creating layer tracks..."

# Layer tracks needed
layer_files=(
    "strings-gentle"
    "piano-contemplative"
    "strings-hopeful"
    "strings-dramatic"
    "harpsichord-baroque"
    "strings-intimate"
    "cello-gentle"
    "piano-gentle"
    "strings-floating"
    "ambient-water"
    "cello-dark"
    "strings-revelation"
    "piano-dramatic"
    "strings-delicate"
    "synth-eerie"
    "strings-isolation"
    "organ-sacred"
    "strings-divine"
    "jazz-melancholy"
    "strings-loneliness"
    "surreal-ambient"
    "strings-mysterious"
)

for name in "${layer_files[@]}"; do
    cp public/audio/silence.mp3 "public/audio/layers/$name.mp3"
    echo "  ✓ $name.mp3"
done

# Clean up base file
rm public/audio/silence.mp3

echo ""
echo "✅ All audio placeholder files created!"
echo ""
echo "📊 Summary:"
echo "  Ambient tracks: ${#ambient_files[@]}"
echo "  Layer tracks: ${#layer_files[@]}"
echo "  Total: $((${#ambient_files[@]} + ${#layer_files[@]})) files"
echo ""
echo "🎉 Ready to run! The app will now work with silent audio."
echo "   You can replace these files with real music later."
