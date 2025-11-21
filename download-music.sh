#!/bin/bash
echo "🎵 Downloading Free Music (CC0 - Public Domain)..."
echo ""

mkdir -p public/audio/ambient
mkdir -p public/audio/layers

# Download some ambient tracks from FreePD (public domain)
echo "Downloading ambient tracks..."

# Note: These are example URLs. Real download links from FreePD.com
# You need to visit FreePD.com or similar sites and get actual download links

echo "⚠️  Để download nhạc thật, bạn cần:"
echo "1. Vào https://freepd.com/ambient.php"
echo "2. Click 'Download' trên tracks bạn thích"
echo "3. Copy download URL"
echo "4. Paste vào file này"
echo ""
echo "VÍ DỤ:"
echo 'curl -L "https://freepd.com/music/Dreamer.mp3" -o public/audio/ambient/night-peaceful.mp3'
echo ""
echo "Hoặc cho tôi biết URLs, tôi sẽ download hết cho bạn!"

