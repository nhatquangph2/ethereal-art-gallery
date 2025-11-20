# 🎉 CMS ĐÃ SẴN SÀNG! Sanity.io Integration Complete

## ✨ Những Gì Vừa Được Thêm Vào

### 🚀 **Sanity CMS Studio** - Admin Dashboard Hoàn Chỉnh

Bạn bây giờ có một **CMS chuyên nghiệp** với:

✅ **Upload hình ảnh** - Drag & drop, tự động optimize
✅ **Upload audio** - MP3, OGG, WAV support
✅ **Quản lý artwork** - Create, edit, delete, publish
✅ **Story segments** - Thêm nhiều đoạn narrative
✅ **Image effects** - Dropdown chọn animations
✅ **Tags system** - Mood-based filtering
✅ **Draft/Publish** - Preview trước khi live
✅ **Real-time** - Changes appear instantly
✅ **Collaboration** - Team members có thể cùng edit
✅ **Version history** - Undo/redo any changes
✅ **Media library** - Centralized asset management

---

## 📂 Files Đã Được Tạo

### Sanity Configuration:
```
sanity.config.ts              - Main config
sanity/schemas/
  ├── artwork.ts              - Artwork schema
  ├── storySegment.ts         - Story segment schema
  └── index.ts                - Schema exports
```

### Integration Files:
```
lib/
  ├── sanity.ts               - Sanity client
  ├── sanity-queries.ts       - GROQ queries
  └── data-provider.ts        - Hybrid provider (Sanity + static fallback)

app/admin/[[...tool]]/
  ├── page.tsx                - Admin dashboard
  └── layout.tsx              - Admin layout
```

### Documentation & Scripts:
```
SANITY_SETUP_GUIDE.md         - Full setup guide
setup-sanity.sh               - Automated setup script
.env.local.example            - Environment variables template
```

---

## 🚀 QUICK START (5 phút)

### Bước 1: Setup Sanity Project

```bash
cd /Users/tranhuykhiem/ethereal-art-gallery

# Run setup script
./setup-sanity.sh
```

Hoặc manual:

```bash
# Init Sanity
npm run sanity:init

# Sẽ hỏi:
# - Create new project? → YES
# - Project name? → ethereal-art-gallery
# - Dataset? → production (default)
```

### Bước 2: Lấy Project ID

Sau khi init, bạn sẽ thấy:
```
✔ Success! Your project is ready!
Project ID: abc123xyz
```

**Save Project ID này!**

### Bước 3: Configure Environment

```bash
# Copy template
cp .env.local.example .env.local

# Edit file
nano .env.local
```

Thay đổi:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

### Bước 4: Deploy Schemas

```bash
npm run sanity:deploy
```

### Bước 5: Start & Open Admin

```bash
# Start dev server
npm run dev

# Mở browser
open http://localhost:3000/admin
```

**Đăng nhập bằng tài khoản Sanity của bạn!**

---

## 🎨 Thêm Artwork Đầu Tiên

### Trong Admin Dashboard (localhost:3000/admin):

1. **Sidebar** → Click **"Artwork"**
2. Click **"+"** để Create New
3. Điền thông tin:
   ```
   Title: Bình Minh Hy Vọng
   Slug: [Click "Generate"]
   Artist: Trần Văn A
   Year: 2024
   Medium: Oil on Canvas
   Dimensions: 120 × 180 cm
   Description: [Mô tả tác phẩm...]
   ```

4. **Upload Images:**
   - **Full Resolution Image**: Drag & drop ảnh gốc (2000px+)
   - **Thumbnail**: Drag & drop thumbnail (600x800px)

   (Sanity tự động optimize!)

5. **Add Story Segments:**
   - Scroll xuống "Story Segments"
   - Click **"Add item"**
   - Điền:
     ```
     Text: [Narrative của bạn...]
     Image Effect: zoom_in_center (dropdown)
     Duration: 10 (seconds)
     ```
   - (Optional) Upload Audio Layer
   - Add thêm segments nếu muốn (khuyến nghị 3-5 segments)

6. **Publish:**
   - Toggle **"Published"** = ON
   - Set **"Display Order"** = 0 (để đầu tiên)
   - Click **"Publish"** button (góc dưới)

7. **Xem kết quả:**
   - Mở tab mới: `http://localhost:3000`
   - Artwork sẽ xuất hiện ngay trong gallery!
   - Click vào để xem scrollytelling experience

**DONE! 🎉**

---

## 🔥 Admin Dashboard Features Chi Tiết

### 📸 Image Upload
- **Drag & drop**: Kéo thả file vào
- **Auto-optimization**: Sanity tự động resize và optimize
- **Hotspot**: Click vào ảnh để set focus point
- **Crop**: Có thể crop trực tiếp trong admin
- **Formats**: JPG, PNG, WebP, GIF
- **Max size**: 100MB (mặc định)

### 🎵 Audio Upload
- **Formats**: MP3, OGG, WAV, AAC
- **Max size**: 100MB
- **Ambient loops**: Upload vào Artwork → "Ambient Audio Loop"
- **Layer audio**: Upload vào Story Segment → "Audio Layer"

### ✏️ Story Segments Editor
- **Rich text**: Format text với bold, italic, links
- **Reorder**: Drag & drop để sắp xếp thứ tự
- **Preview**: Xem trước khi publish
- **Effects**: 10 animation effects có sẵn:
  - zoom_in_center, zoom_out
  - pan_left, pan_right, pan_up, pan_down
  - pan_left_down, pan_right_up
  - rotate_subtle, scale_breathe

### 🏷️ Tags & Metadata
- **Tags**: Add tags cho mood filtering (hopeful, serene, dark, etc.)
- **Colors**: Add dominant colors (hex codes)
- **Order**: Set display order trong gallery
- **Draft**: Save without publishing

### 👥 Collaboration
- **Real-time**: Nhiều người có thể edit cùng lúc
- **Presence**: Thấy ai đang edit cái gì
- **Comments**: Comment trên từng field
- **Version history**: Xem và restore previous versions

---

## 🌐 Deploy Production

### Deploy App (Vercel):

```bash
vercel
```

**Add environment variables trên Vercel dashboard:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

### Deploy Sanity Studio Riêng (Optional):

```bash
npm run sanity:deploy
```

Chọn hostname (e.g., `ethereal-gallery`)

Admin sẽ available tại: `https://ethereal-gallery.sanity.studio`

---

## 🔐 Team & Permissions

### Invite Team Members:

1. Vào https://sanity.io/manage
2. Select your project
3. **"Settings"** → **"Members"**
4. **"Invite member"** → Enter email
5. Choose role:
   - **Administrator**: Full access, can invite others
   - **Editor**: Create, edit, publish content
   - **Viewer**: Read-only access

### Roles & Permissions:

| Role | Create | Edit | Publish | Delete | Settings |
|------|--------|------|---------|--------|----------|
| Admin | ✅ | ✅ | ✅ | ✅ | ✅ |
| Editor | ✅ | ✅ | ✅ | ❌ | ❌ |
| Viewer | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 🎯 Workflow Thêm Artwork Mới

**Estimated time: 2-5 minutes** ⚡

1. **Login** → `localhost:3000/admin`
2. **Create** → Artwork → "+"
3. **Fill info** → Title, artist, description
4. **Upload** → Drag & drop images
5. **Add segments** → 3-5 narrative segments
6. **Effects** → Choose animation for each segment
7. **Audio** → (Optional) Upload ambient + layers
8. **Publish** → Toggle ON → Save

**LIVE NGAY!** No code, no restart! 🚀

---

## 📊 Hybrid Data System

App của bạn bây giờ có **2 modes**:

### Mode 1: **Static JSON** (Testing)
- Không cần Sanity account
- Data từ `data/artworks.ts`
- Tốt cho local development

### Mode 2: **Sanity CMS** (Production)
- Admin dashboard đầy đủ
- Upload qua UI
- Real-time updates
- Auto khi có `.env.local` config

**Switch tự động!** App sẽ dùng Sanity nếu có, không thì fallback về JSON.

---

## 🐛 Troubleshooting

### Admin page trắng xóa
```bash
# Check .env.local
cat .env.local

# Should see:
# NEXT_PUBLIC_SANITY_PROJECT_ID=abc123...
# NEXT_PUBLIC_SANITY_DATASET=production
```

### Images không hiện
1. Check CORS: https://sanity.io/manage
2. Project → API → CORS Origins
3. Add: `http://localhost:3000` và domain production

### Upload bị lỗi
- Check file size (< 100MB)
- Check format (jpg, png, mp3)
- Check internet connection

### Schema changes không apply
```bash
# Re-deploy schemas
npm run sanity:deploy
```

### Build errors
```bash
# Clean và rebuild
rm -rf .next
npm run build
```

---

## 📚 Resources & Help

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Tutorial**: https://www.sanity.io/docs/how-queries-work
- **Schema Reference**: https://www.sanity.io/docs/schema-types
- **Community**: https://slack.sanity.io/

### Custom Modifications:

Want to customize? Edit:
- `sanity/schemas/artwork.ts` - Add/remove fields
- `sanity.config.ts` - Change UI, logo, colors
- `lib/sanity-queries.ts` - Modify data fetching

---

## 💡 Tips & Best Practices

### Images:
- Upload high-res (2000px+) for deep zoom
- Sanity tự động tạo responsive variants
- Dùng WebP cho file size nhỏ hơn

### Audio:
- Ambient loops: 30-60 seconds, seamless
- Layers: 5-15 seconds mỗi segment
- Normalize volume (-18 LUFS recommended)

### Story Segments:
- 3-5 segments per artwork ideal
- Each segment: 50-150 words
- Mix different image effects
- Not all segments need audio

### Performance:
- Sanity CDN handles caching automatically
- Images delivered from nearest edge
- No need for manual optimization

---

## 🎉 Bạn Đã Có Gì Bây Giờ

✅ **Professional CMS** (Sanity Studio)
✅ **Drag & drop uploads** (images + audio)
✅ **Real-time collaboration** (team features)
✅ **Version control** (undo/redo)
✅ **Auto optimization** (images & delivery)
✅ **Free hosting** (Sanity Studio)
✅ **Scalable** (100k requests/month free)
✅ **No backend code** (all handled by Sanity)

**Thêm artwork mới = 2 phút!**
**Không cần restart server!**
**Không cần code!** 🚀

---

## 🚀 Next Steps

1. **Setup Sanity** → Run `./setup-sanity.sh`
2. **Add artwork** → Via `/admin` dashboard
3. **Test locally** → See changes instantly
4. **Deploy** → Push to production
5. **Invite team** → Collaborate!

---

**Questions? Issues?**
- Check `SANITY_SETUP_GUIDE.md` for detailed guide
- Visit https://sanity.io/docs
- Join Sanity Community on Slack

*Built with ❤️ - Nơi trú ẩn cho tâm hồn* ✨

**Enjoy your powerful CMS!** 🎨
