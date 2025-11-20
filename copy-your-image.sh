#!/bin/bash

echo "🎨 Script Copy Ảnh Của Bạn"
echo ""
echo "Script này sẽ copy 1 ảnh của bạn thành tất cả các tên cần thiết"
echo "để bạn có thể test gallery ngay lập tức!"
echo ""

# Check if image file is provided
if [ -z "$1" ]; then
    echo "❌ Cách dùng:"
    echo "   ./copy-your-image.sh <đường-dẫn-đến-ảnh-của-bạn>"
    echo ""
    echo "📝 Ví dụ:"
    echo "   ./copy-your-image.sh ~/Downloads/mountain-boat.jpg"
    echo "   ./copy-your-image.sh /path/to/your/artwork.png"
    echo ""
    exit 1
fi

SOURCE_IMAGE="$1"

# Check if source image exists
if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "❌ Không tìm thấy file: $SOURCE_IMAGE"
    exit 1
fi

echo "✅ Tìm thấy ảnh: $SOURCE_IMAGE"
echo ""

# Create directories if they don't exist
mkdir -p public/images/artworks

# Array of artwork names
ARTWORKS=(
    "binh-minh-hy-vong"
    "me-cung-noi-tam"
    "dieu-nhay-cua-thoi-gian"
    "nhung-manh-vo-ket-noi"
    "giac-mo-sau-tham"
    "vu-khuc-cua-gio"
)

echo "📋 Đang copy ảnh của bạn thành 12 files..."
echo ""

# Copy to all artwork names
for artwork in "${ARTWORKS[@]}"; do
    # Full size
    cp "$SOURCE_IMAGE" "public/images/artworks/${artwork}.jpg"
    echo "✅ Copied → ${artwork}.jpg"

    # Thumbnail
    cp "$SOURCE_IMAGE" "public/images/artworks/${artwork}-thumb.jpg"
    echo "✅ Copied → ${artwork}-thumb.jpg"
done

echo ""
echo "🎉 Hoàn thành! Đã tạo 12 files trong public/images/artworks/"
echo ""
echo "📝 Files đã tạo:"
ls -lh public/images/artworks/ | grep -v total
echo ""
echo "🚀 Bây giờ bạn có thể chạy:"
echo "   npm run dev"
echo ""
echo "🌐 Sau đó mở: http://localhost:3000"
echo ""
echo "💡 Tip: Sau này bạn có thể thay từng file bằng ảnh thật của từng tác phẩm!"
echo ""
