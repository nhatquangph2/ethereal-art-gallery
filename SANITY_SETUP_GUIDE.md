# 🚀 Sanity CMS Setup Guide

## Sanity.io đã được tích hợp!

Bạn bây giờ có thể quản lý artworks qua **Admin Dashboard** với drag & drop upload!

---

## 📋 Bước 1: Tạo Sanity Project

### 1.1. Đăng ký tài khoản Sanity (FREE)

Vào: https://sanity.io/

Click **"Get started"** và đăng ký (có thể dùng GitHub/Google)

### 1.2. Tạo project mới

```bash
cd /Users/tranhuykhiem/ethereal-art-gallery

# Init Sanity project
npx sanity init --env
```

Khi được hỏi:
- **"Create new project?"** → Yes
- **"Project name"** → `ethereal-art-gallery`
- **"Use default dataset?"** → Yes (production)
- **"Output path"** → `.` (current directory)

### 1.3. Lấy Project ID

Sau khi init xong, bạn sẽ thấy:
```
✔ Success! Your project is ready!
Project ID: abc123xyz
```

**SAVE Project ID này!**

---

## 📋 Bước 2: Configure Environment Variables

### 2.1. Tạo file `.env.local`

```bash
cp .env.local.example .env.local
```

### 2.2. Điền thông tin

Mở file `.env.local` và thay thế:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## 📋 Bước 3: Deploy Sanity Dataset

```bash
# Deploy schemas lên Sanity
npx sanity schema deploy
```

---

## 🎨 Bước 4: Truy Cập Admin Dashboard

### 4.1. Start dev server

```bash
npm run dev
```

### 4.2. Mở Admin Dashboard

Vào: **http://localhost:3000/admin**

Đăng nhập bằng tài khoản Sanity của bạn!

---

## ✨ Bước 5: Thêm Artwork Đầu Tiên

### Trong Admin Dashboard:

1. Click **"Artwork"** trong sidebar
2. Click **"Create new Artwork"**
3. Điền thông tin:
   - **Title**: Bình Minh Hy Vọng
   - **Slug**: Bấm "Generate" để tự động tạo
   - **Artist**: Trần Văn A
   - **Year**: 2024
   - **Description**: Mô tả tác phẩm...

4. **Upload Images:**
   - **Full Resolution Image**: Drag & drop ảnh gốc của bạn
   - **Thumbnail**: Drag & drop thumbnail

5. **Add Story Segments:**
   - Click "Add item" trong Story Segments
   - Điền narrative text
   - Chọn image effect (ví dụ: zoom_in_center)
   - (Optional) Upload audio layer

6. **Publish:**
   - Toggle "Published" = ON
   - Set "Display Order" = 0 (đầu tiên)
   - Click **"Publish"**

**DONE! Artwork đã xuất hiện trên gallery!** 🎉

---

## 🔥 Features Admin Dashboard

### ✅ Những gì bạn có thể làm:

- **Upload images**: Drag & drop, auto-optimization
- **Upload audio**: MP3, OGG, WAV support
- **Manage artworks**: Create, edit, delete
- **Story segments**: Add multiple segments với rich text
- **Image effects**: Dropdown chọn effects
- **Tags**: Add tags cho mood-based filtering
- **Draft/Publish**: Preview trước khi publish
- **Reorder**: Drag & drop để sắp xếp thứ tự
- **Media library**: Quản lý tất cả images/audio
- **Version history**: Undo/redo changes
- **Collaboration**: Invite team members

### 🎯 Sanity Studio Features:

- **Real-time collaboration**: Nhiều người cùng edit
- **Customizable**: Có thể customize UI
- **Portable**: Deploy riêng hoặc embed trong app
- **Free tier**: 100k requests/month, 10GB storage

---

## 📱 Workflow Thêm Artwork Mới

1. **Admin Dashboard** (`/admin`)
2. **Create Artwork** → Điền info + upload
3. **Add Story Segments** → Narrative + effects
4. **Preview** → Check trước
5. **Publish** → Live ngay!

**Không cần code, không cần restart server!** ✨

---

## 🌐 Deploy To Production

### Option 1: Vercel (Recommended)

```bash
vercel
```

**Environment Variables trên Vercel:**
- Thêm `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Thêm `NEXT_PUBLIC_SANITY_DATASET`

### Option 2: Deploy Sanity Studio riêng

```bash
npx sanity deploy
```

Chọn hostname (ví dụ: `ethereal-gallery`)

Admin sẽ available tại: `https://ethereal-gallery.sanity.studio`

---

## 🔐 Security & Access Control

### Thêm Team Members:

1. Vào https://sanity.io/manage
2. Chọn project của bạn
3. **"Settings"** → **"Members"**
4. **"Invite member"** → Nhập email
5. Chọn role:
   - **Administrator**: Full access
   - **Editor**: Có thể edit content
   - **Viewer**: Chỉ xem

### API Tokens (Advanced):

Nếu cần write từ server-side:
1. https://sanity.io/manage
2. Project → **"API"** → **"Tokens"**
3. **"Add API Token"**
4. Chọn permissions
5. Copy token → Add vào `.env.local`:
   ```
   SANITY_API_TOKEN=your_token
   ```

---

## 🎨 Customizing Admin UI

### Thay đổi logo/colors:

Edit `sanity.config.ts`:

```typescript
export default defineConfig({
  // ...existing config
  studio: {
    components: {
      logo: MyCustomLogo,
    },
  },
});
```

### Add custom fields:

Edit `sanity/schemas/artwork.ts` và add field mới!

---

## 📊 Data Migration

### Import data từ JSON cũ:

```bash
# Create migration script
node scripts/migrate-to-sanity.js
```

(Tôi có thể tạo script này nếu bạn cần!)

---

## 🐛 Troubleshooting

### Admin page trắng xóa
- Check `.env.local` có đúng không
- Check console log (F12)
- Verify Project ID: https://sanity.io/manage

### Images không load
- Check CORS settings: https://sanity.io/manage
- Add your domain to allowed origins

### Upload bị lỗi
- Check file size (max 100MB default)
- Check format (images: jpg/png/webp, audio: mp3/ogg/wav)

### Build error
```bash
npm run build
```
Check error messages và fix TypeScript errors

---

## 📚 Resources

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Cheat Sheet**: https://www.sanity.io/docs/query-cheat-sheet
- **Schema Types**: https://www.sanity.io/docs/schema-types
- **Image Optimization**: https://www.sanity.io/docs/image-urls

---

## 🎉 Bạn Đã Xong!

Bây giờ bạn có:
- ✅ CMS mạnh mẽ (Sanity Studio)
- ✅ Upload drag & drop
- ✅ Real-time preview
- ✅ Version control
- ✅ Free hosting
- ✅ No code needed!

**Thêm artwork mới CHỈ MẤT 2 phút!** 🚀

---

Need help? Check:
- [Sanity Community](https://www.sanity.io/community)
- [Discord](https://slack.sanity.io/)
- Project documentation

*Built with ❤️ - Nơi trú ẩn cho tâm hồn* ✨
