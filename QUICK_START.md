# 🚀 Quick Start - Chạy Ngay Trên Localhost

## Bước 1: Lưu Ảnh Của Bạn

### Tác phẩm 1: Bình Minh Hy Vọng
Lưu ảnh núi thuyền (image bạn gửi) vào 2 file:

```bash
# File gốc (full resolution)
public/images/artworks/binh-minh-hy-vong.jpg

# File thumbnail (resize nhỏ lại, 600x800px)
public/images/artworks/binh-minh-hy-vong-thumb.jpg
```

**Cách làm nhanh:**
1. Click phải vào ảnh bạn có
2. "Save Image As..."
3. Lưu vào: `/Users/tranhuykhiem/ethereal-art-gallery/public/images/artworks/`
4. Đặt tên: `binh-minh-hy-vong.jpg`
5. Làm tương tự cho thumbnail (hoặc copy file gốc với tên `-thumb.jpg`)

### Tác phẩm 2: Mê Cung Nội Tâm
Tìm thêm 1 ảnh khác và lưu với tên:
```bash
public/images/artworks/me-cung-noi-tam.jpg
public/images/artworks/me-cung-noi-tam-thumb.jpg
```

### Các tác phẩm còn lại (optional - có placeholder)
Các tác phẩm 3-6 có thể để sau. App sẽ báo lỗi nhưng vẫn chạy được với 2 tác phẩm đầu.

## Bước 2: Chạy Development Server

```bash
cd /Users/tranhuykhiem/ethereal-art-gallery

# Chạy server
npm run dev
```

## Bước 3: Mở Trình Duyệt

Vào: **http://localhost:3000**

## 🎨 Tạm Thời Bỏ Qua Audio

Audio không bắt buộc. App sẽ chạy mà không có âm thanh. Bạn có thể thêm sau.

## ⚡ Test Nhanh Với 1 Ảnh Duy Nhất

Nếu bạn chỉ muốn test ngay với 1 ảnh:

1. Lưu ảnh của bạn thành:
   - `binh-minh-hy-vong.jpg`
   - `binh-minh-hy-vong-thumb.jpg` (copy file gốc)

2. Copy cùng 1 file đó thành các tên khác:
```bash
cd public/images/artworks
cp binh-minh-hy-vong.jpg me-cung-noi-tam.jpg
cp binh-minh-hy-vong.jpg dieu-nhay-cua-thoi-gian.jpg
cp binh-minh-hy-vong.jpg nhung-manh-vo-ket-noi.jpg
cp binh-minh-hy-vong.jpg giac-mo-sau-tham.jpg
cp binh-minh-hy-vong.jpg vu-khuc-cua-gio.jpg

cp binh-minh-hy-vong-thumb.jpg me-cung-noi-tam-thumb.jpg
cp binh-minh-hy-vong-thumb.jpg dieu-nhay-cua-thoi-gian-thumb.jpg
cp binh-minh-hy-vong-thumb.jpg nhung-manh-vo-ket-noi-thumb.jpg
cp binh-minh-hy-vong-thumb.jpg giac-mo-sau-tham-thumb.jpg
cp binh-minh-hy-vong-thumb.jpg vu-khuc-cua-gio-thumb.jpg
```

3. Chạy `npm run dev` và test!

## 🐛 Nếu Gặp Lỗi

### "Module not found"
```bash
npm install
```

### "Port 3000 already in use"
```bash
# Kill process trên port 3000
lsof -ti:3000 | xargs kill -9
# Hoặc dùng port khác
npm run dev -- -p 3001
```

### "Image failed to load"
- Check đường dẫn file chính xác
- Check tên file đúng (có phân biệt hoa thường)
- Check file có tồn tại trong `public/images/artworks/`

## ✨ Checklist Hoàn Thành

- [ ] Đã lưu ít nhất 2 ảnh vào `public/images/artworks/`
- [ ] Đã chạy `npm install` (nếu cần)
- [ ] Đã chạy `npm run dev`
- [ ] Mở được http://localhost:3000
- [ ] Thấy gallery với artwork cards
- [ ] Click vào card xem chi tiết artwork
- [ ] Test scrolling trên trang chi tiết

## 🎯 Kết Quả Mong Đợi

Bạn sẽ thấy:
1. **Trang chủ**: Hero section + 6 artwork cards
2. **Click vào card**: Mở trang chi tiết với scrollytelling
3. **Scroll xuống**: Text segments xuất hiện với animation
4. **Mobile**: Bottom navigation bar

---

**Chúc bạn thành công! 🚀**

Nếu cần help, check console log của browser (F12) để xem lỗi cụ thể.
