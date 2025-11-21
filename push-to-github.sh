#!/bin/bash

# GitHub Push Script for Ethereal Art Gallery
# Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME

if [ -z "$1" ]; then
    echo "❌ Error: Please provide your GitHub username"
    echo "Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="ethereal-art-gallery"

echo "🚀 Setting up remote repository..."
echo "Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

# Remove existing remote (if any)
git remote remove origin 2>/dev/null

# Add new remote
echo "📡 Adding remote origin..."
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Verify remote
echo "✅ Remote configured:"
git remote -v

echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View your repository at:"
    echo "   https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Visit the repository URL above"
    echo "   2. Go to Settings → Pages to enable GitHub Pages (optional)"
    echo "   3. Or deploy to Vercel: https://vercel.com/new"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   1. Repository exists on GitHub"
    echo "   2. You have write access"
    echo "   3. GitHub credentials are configured"
    echo ""
    echo "Need to configure Git credentials? Run:"
    echo "   git config --global user.name \"Your Name\""
    echo "   git config --global user.email \"your@email.com\""
fi
