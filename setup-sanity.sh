#!/bin/bash

echo "🎨 The Ethereal Art Gallery - Sanity CMS Setup"
echo "=============================================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local already exists"
else
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "⚠️  IMPORTANT: Edit .env.local and add your Sanity Project ID!"
    echo ""
fi

# Initialize Sanity (if not already done)
echo "🚀 Initializing Sanity project..."
echo ""
echo "You'll need to:"
echo "  1. Log in to Sanity (or create account)"
echo "  2. Choose 'Create new project'"
echo "  3. Name it 'ethereal-art-gallery'"
echo "  4. Use default dataset (production)"
echo ""
read -p "Press Enter to continue..."

npx sanity init --env

echo ""
echo "📋 Next steps:"
echo ""
echo "1. Copy your Project ID from the output above"
echo "2. Edit .env.local:"
echo "   nano .env.local"
echo ""
echo "3. Replace 'your_project_id_here' with actual Project ID"
echo ""
echo "4. Deploy schemas to Sanity:"
echo "   npx sanity schema deploy"
echo ""
echo "5. Start dev server:"
echo "   npm run dev"
echo ""
echo "6. Open admin dashboard:"
echo "   http://localhost:3000/admin"
echo ""
echo "✨ That's it! You can now manage artworks via CMS!"
echo ""
