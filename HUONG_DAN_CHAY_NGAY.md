# 🚀 HƯỚNG DẪN CHẠY NGAY - The Ethereal Art Gallery

## 🎯 Mục Tiêu
Setup nhanh để xem gallery chạy trên **http://localhost:3000** với ảnh của bạn!

---

## ⚡ CÁCH NHANH NHẤT (2 phút)

### Bước 1: Lưu ảnh núi thuyền của bạn

Lưu ảnh đẹp bạn vừa gửi (ảnh núi thuyền sương mù) vào:
```
/Users/tranhuykhiem/Downloads/mountain-boat.jpg
```
(hoặc bất kỳ đâu, nhớ đường dẫn)

### Bước 2: Chạy script tự động

```bash
cd /Users/tranhuykhiem/ethereal-art-gallery

# Copy ảnh của bạn thành tất cả các file cần thiết
./copy-your-image.sh ~/Downloads/mountain-boat.jpg
```

Script sẽ tự động tạo 12 files từ 1 ảnh của bạn!

### Bước 3: Chạy server

```bash
npm run dev
```

### Bước 4: Mở trình duyệt

Vào: **http://localhost:3000**

**XONG! 🎉**

---

## 📋 CÁCH CHI TIẾT HƠN

### Nếu bạn có 2 tác phẩm riêng biệt:

1. **Tác phẩm 1** (ảnh núi thuyền):
   ```bash
   cp ~/Downloads/tac-pham-1.jpg public/images/artworks/binh-minh-hy-vong.jpg
   cp ~/Downloads/tac-pham-1.jpg public/images/artworks/binh-minh-hy-vong-thumb.jpg
   ```

2. **Tác phẩm 2** (ảnh khác của bạn):
   ```bash
   cp ~/Downloads/tac-pham-2.jpg public/images/artworks/me-cung-noi-tam.jpg
   cp ~/Downloads/tac-pham-2.jpg public/images/artworks/me-cung-noi-tam-thumb.jpg
   ```

3. **Copy để đủ 6 artworks:**
   ```bash
   cd public/images/artworks

   cp binh-minh-hy-vong.jpg dieu-nhay-cua-thoi-gian.jpg
   cp binh-minh-hy-vong.jpg nhung-manh-vo-ket-noi.jpg
   cp binh-minh-hy-vong.jpg giac-mo-sau-tham.jpg
   cp binh-minh-hy-vong.jpg vu-khuc-cua-gio.jpg

   cp binh-minh-hy-vong-thumb.jpg dieu-nhay-cua-thoi-gian-thumb.jpg
   cp binh-minh-hy-vong-thumb.jpg nhung-manh-vo-ket-noi-thumb.jpg
   cp binh-minh-hy-vong-thumb.jpg giac-mo-sau-tham-thumb.jpg
   cp binh-minh-hy-vong-thumb.jpg vu-khuc-cua-gio-thumb.jpg
   ```

4. **Chạy dev server:**
   ```bash
   cd /Users/tranhuykhiem/ethereal-art-gallery
   npm run dev
   ```

---

## 🎨 CÁCH TẠO PLACEHOLDER (nếu chưa có ảnh)

Mở file này trong browser:
```
/Users/tranhuykhiem/ethereal-art-gallery/create-placeholder.html
```

Click nút "Tạo Placeholders" và download tất cả ảnh về folder `public/images/artworks/`

---

## ✅ CHECKLIST

- [ ] Đã lưu ít nhất 1 ảnh vào `public/images/artworks/`
- [ ] Files có tên đúng (ví dụ: `binh-minh-hy-vong.jpg`)
- [ ] Có cả file `-thumb.jpg` (thumbnail)
- [ ] Đã chạy `npm run dev`
- [ ] Mở được **http://localhost:3000**

---

## 🔍 KIỂM TRA FILES

```bash
cd /Users/tranhuykhiem/ethereal-art-gallery
ls -lh public/images/artworks/
```

Bạn cần thấy ít nhất:
```
binh-minh-hy-vong.jpg
binh-minh-hy-vong-thumb.jpg
me-cung-noi-tam.jpg
me-cung-noi-tam-thumb.jpg
...
```

---

## 🐛 TROUBLESHOOTING

### Lỗi: "Cannot find module"
```bash
npm install
```

### Lỗi: "Port 3000 already in use"
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Ảnh không hiện
1. Check tên file có đúng không (case-sensitive!)
2. Check file có ở đúng folder `public/images/artworks/`
3. Mở browser console (F12) xem lỗi gì

### Build error
```bash
# Clean và install lại
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🎯 KẾT QUẢ MONG ĐỢI

### Trang chủ (localhost:3000)
- Hero section với title "The Ethereal Art Gallery"
- Hiển thị 6 artwork cards trong grid
- Smooth animation khi load
- Bottom navigation ở dưới (mobile)

### Click vào artwork
- Mở trang detail với layout 2 cột
- Ảnh sticky bên trái (desktop)
- Text story segments scroll bên phải
- Mỗi segment có glassmorphism effect
- Smooth scroll experience

### Features hoạt động
- ✅ Smooth scrolling (Lenis)
- ✅ Text reveal animations (GSAP)
- ✅ Image animations (zoom/pan)
- ✅ Bottom navigation
- ✅ Mobile responsive
- ✅ Deep zoom viewer (click "Deep Zoom" button)
- ⏳ Audio (cần add files sau)

---

## 📱 TEST TRÊN ĐIỆN THOẠI

1. Tìm IP của máy Mac:
   ```bash
   ifconfig | grep inet
   ```
   Ví dụ: `192.168.1.100`

2. Trên điện thoại (cùng WiFi), mở:
   ```
   http://192.168.1.100:3000
   ```

3. Test:
   - Scroll smooth
   - Bottom navigation
   - Touch gestures
   - Haptic feedback

---

## 🎵 THÊM AUDIO (Optional)

Audio KHÔNG bắt buộc. Nếu muốn thêm sau:

1. Tạo folders:
   ```bash
   mkdir -p public/audio/ambient
   mkdir -p public/audio/layers
   ```

2. Thêm file MP3 với tên đúng theo `data/artworks.ts`

3. Audio sẽ tự động play khi scroll!

---

## 📚 TÀI LIỆU THÊM

- `README.md` - Full documentation (English)
- `ASSET_SETUP_GUIDE.md` - Chi tiết về images & audio
- `PROJECT_SUMMARY.md` - Tất cả features đã build

---

## 🎉 CHÚC BẠN THÀNH CÔNG!

Nếu có vấn đề gì, check:
1. Browser console (F12)
2. Terminal output
3. File paths (case-sensitive!)

**Questions? Open an issue hoặc check documentation! 🚀**

---

*Built with ❤️ - Nơi trú ẩn cho tâm hồn* ✨
