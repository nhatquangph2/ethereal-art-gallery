/**
 * Setup script to create placeholder images for testing
 * This allows the gallery to run immediately on localhost
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Ensure directories exist
const dirs = [
  'public/images/artworks',
  'public/audio/ambient',
  'public/audio/layers'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Create placeholder images using Unsplash
const artworks = [
  { id: 'binh-minh-hy-vong', query: 'sunrise,morning,hope' },
  { id: 'me-cung-noi-tam', query: 'maze,abstract,mind' },
  { id: 'dieu-nhay-cua-thoi-gian', query: 'time,spiral,clock' },
  { id: 'nhung-manh-vo-ket-noi', query: 'kintsugi,gold,pottery' },
  { id: 'giac-mo-sau-tham', query: 'underwater,ocean,deep' },
  { id: 'vu-khuc-cua-gio', query: 'wind,flow,nature' }
];

console.log('📥 Downloading placeholder images from Unsplash...\n');

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function setupPlaceholders() {
  for (const artwork of artworks) {
    const fullUrl = `https://source.unsplash.com/2000x2667/?${artwork.query}`;
    const thumbUrl = `https://source.unsplash.com/600x800/?${artwork.query}`;

    const fullPath = path.join(__dirname, `public/images/artworks/${artwork.id}.jpg`);
    const thumbPath = path.join(__dirname, `public/images/artworks/${artwork.id}-thumb.jpg`);

    try {
      if (!fs.existsSync(fullPath)) {
        console.log(`⏳ Downloading ${artwork.id}.jpg...`);
        await downloadImage(fullUrl, fullPath);
        console.log(`✅ Downloaded ${artwork.id}.jpg`);
      } else {
        console.log(`⏭️  Skipped ${artwork.id}.jpg (already exists)`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!fs.existsSync(thumbPath)) {
        console.log(`⏳ Downloading ${artwork.id}-thumb.jpg...`);
        await downloadImage(thumbUrl, thumbPath);
        console.log(`✅ Downloaded ${artwork.id}-thumb.jpg`);
      } else {
        console.log(`⏭️  Skipped ${artwork.id}-thumb.jpg (already exists)`);
      }

      // Small delay
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`❌ Error downloading ${artwork.id}:`, error.message);
    }
  }

  console.log('\n✨ Setup complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Replace placeholder images with your actual artwork in public/images/artworks/');
  console.log('2. (Optional) Add audio files to public/audio/');
  console.log('3. Run: npm run dev');
  console.log('4. Open: http://localhost:3000');
  console.log('\n💡 Tip: Save your artwork images with these names:');
  artworks.forEach(a => {
    console.log(`   - ${a.id}.jpg`);
    console.log(`   - ${a.id}-thumb.jpg`);
  });
}

setupPlaceholders().catch(console.error);
