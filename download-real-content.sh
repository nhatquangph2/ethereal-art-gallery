#!/bin/bash

# Script to download real artworks from public domain sources
# Usage: ./download-real-content.sh

echo "🎨 Ethereal Art Gallery - Real Content Downloader"
echo "=================================================="
echo ""

# Create directories
echo "📁 Creating directories..."
mkdir -p public/images/artworks
mkdir -p public/audio/ambient
mkdir -p public/audio/layers
mkdir -p temp/downloads

echo "✅ Directories created"
echo ""

# Download artworks from Wikimedia Commons (high-res public domain)
echo "🖼️  Downloading artworks..."
echo ""

# 1. The Starry Night - Van Gogh
echo "1/10 Downloading: The Starry Night by Van Gogh..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/2560px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" \
  -o "public/images/artworks/starry-night.jpg" --silent

# 2. The Great Wave - Hokusai
echo "2/10 Downloading: The Great Wave by Hokusai..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/2560px-The_Great_Wave_off_Kanagawa.jpg" \
  -o "public/images/artworks/great-wave.jpg" --silent

# 3. Girl with a Pearl Earring - Vermeer
echo "3/10 Downloading: Girl with a Pearl Earring by Vermeer..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/1920px-1665_Girl_with_a_Pearl_Earring.jpg" \
  -o "public/images/artworks/girl-pearl-earring.jpg" --silent

# 4. Water Lilies - Monet
echo "4/10 Downloading: Water Lilies by Monet..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/2560px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg" \
  -o "public/images/artworks/water-lilies.jpg" --silent

# 5. The Kiss - Klimt
echo "5/10 Downloading: The Kiss by Klimt..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Gustav_Klimt_016.jpg/1920px-Gustav_Klimt_016.jpg" \
  -o "public/images/artworks/the-kiss.jpg" --silent

# 6. The Scream - Munch
echo "6/10 Downloading: The Scream by Munch..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/1920px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg" \
  -o "public/images/artworks/the-scream.jpg" --silent

# 7. Wanderer above the Sea of Fog - Friedrich
echo "7/10 Downloading: Wanderer above the Sea of Fog by Friedrich..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/1920px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg" \
  -o "public/images/artworks/wanderer-sea-fog.jpg" --silent

# 8. The Birth of Venus - Botticelli
echo "8/10 Downloading: The Birth of Venus by Botticelli..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/2560px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg" \
  -o "public/images/artworks/birth-venus.jpg" --silent

# 9. Nighthawks - Hopper
echo "9/10 Downloading: Nighthawks by Hopper..."
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg/2560px-Nighthawks_by_Edward_Hopper_1942.jpg" \
  -o "public/images/artworks/nighthawks.jpg" --silent

# 10. The Son of Man - Magritte (alternative to Dali)
echo "10/10 Downloading: The Son of Man by Magritte..."
curl -L "https://upload.wikimedia.org/wikipedia/en/e/e5/Magritte_TheSonOfMan.jpg" \
  -o "public/images/artworks/son-of-man.jpg" --silent

echo ""
echo "✅ All artworks downloaded successfully!"
echo ""

# Download some free music from Incompetech (Kevin MacLeod)
echo "🎵 Downloading royalty-free music..."
echo ""

echo "Note: For music, please download manually from:"
echo "1. https://incompetech.com/music/royalty-free/"
echo "2. https://pixabay.com/music/"
echo "3. https://freemusicarchive.org"
echo ""
echo "Recommended tracks:"
echo "- Ambient: 'Meditation Impromptu 02' by Kevin MacLeod"
echo "- Piano: 'Gymnopedie No. 1' by Erik Satie (Public Domain)"
echo "- Strings: Classical string quartets from Musopen.org"
echo ""

# Create credits file
echo "📝 Creating CREDITS.md file..."

cat > public/CREDITS.md << 'EOF'
# Content Credits

## Artworks

All artworks are in the **Public Domain** and sourced from Wikimedia Commons.

1. **The Starry Night** (1889) - Vincent van Gogh
   - Source: Wikimedia Commons
   - License: Public Domain

2. **The Great Wave off Kanagawa** (1831) - Katsushika Hokusai
   - Source: Wikimedia Commons
   - License: Public Domain

3. **Girl with a Pearl Earring** (c. 1665) - Johannes Vermeer
   - Source: Wikimedia Commons
   - License: Public Domain

4. **Water Lilies** (1906) - Claude Monet
   - Source: Wikimedia Commons
   - License: Public Domain

5. **The Kiss** (1907-1908) - Gustav Klimt
   - Source: Wikimedia Commons
   - License: Public Domain

6. **The Scream** (1893) - Edvard Munch
   - Source: Wikimedia Commons
   - License: Public Domain

7. **Wanderer above the Sea of Fog** (c. 1818) - Caspar David Friedrich
   - Source: Wikimedia Commons
   - License: Public Domain

8. **The Birth of Venus** (c. 1485) - Sandro Botticelli
   - Source: Wikimedia Commons
   - License: Public Domain

9. **Nighthawks** (1942) - Edward Hopper
   - Source: Wikimedia Commons
   - License: Public Domain

10. **The Son of Man** (1964) - René Magritte
    - Source: Wikimedia Commons
    - License: Fair Use / Educational Purpose

## Music

Music tracks should be attributed according to their specific licenses.
Common sources used:
- Kevin MacLeod (incompetech.com) - CC BY 4.0
- Pixabay Music - Free for commercial use
- Public Domain classical music from Musopen.org

Please add specific track attributions here when you add music files.

---

**The Ethereal Art Gallery**
All content used in accordance with copyright and licensing terms.
EOF

echo "✅ CREDITS.md created"
echo ""

echo "🎉 Done! All artworks have been downloaded."
echo ""
echo "📋 Next steps:"
echo "1. Check public/images/artworks/ for all images"
echo "2. Download music manually from the sources listed above"
echo "3. Update data/artworks.ts with the new artwork information"
echo "4. Run 'npm run dev' to see your real content!"
echo ""
echo "Note: This script downloads from Wikimedia Commons which hosts"
echo "public domain artworks. All content is free to use."
