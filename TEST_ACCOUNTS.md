# 🧪 Test Accounts

This document lists all test accounts available for testing The Ethereal Art Gallery.

## 📋 Available Test Accounts

### 1. 👑 ADMIN Account
- **Email**: `admin@ethereal.art`
- **Password**: `admin123`
- **Role**: Admin
- **Name**: Admin User
- **Permissions**:
  - ✅ Access Admin Dashboard (`/admin/users`)
  - ✅ Manage all users (promote, demote, delete)
  - ✅ Access Artist Dashboard
  - ✅ Create/edit/delete artworks
  - ✅ Create story segments
- **Saved Artworks**: Bình Minh Hy Vọng, Mê Cung Nội Tâm

---

### 2. 🎨 ARTIST Account
- **Email**: `artist@ethereal.art`
- **Password**: `artist123`
- **Role**: Artist
- **Name**: Nguyễn Văn Nghệ
- **Artist Name**: Nguyễn Văn Nghệ
- **Permissions**:
  - ✅ Access Artist Dashboard (`/artist`)
  - ✅ Create/edit/delete own artworks
  - ✅ Create story segments for own artworks
  - ❌ Cannot access Admin Dashboard
- **Created Artworks**: Bình Minh Hy Vọng (art_01), Những Mảnh Vỡ Kết Nối (art_03)
- **Saved Artworks**: Những Mảnh Vỡ Kết Nối, Giấc Mơ Sâu Thẳm, Vũ Khúc Của Gió

---

### 3. 👤 USER Account (Regular)
- **Email**: `user@ethereal.art`
- **Password**: `user123`
- **Role**: User
- **Name**: Trần Thị Bình
- **Permissions**:
  - ✅ Browse gallery
  - ✅ View artwork details
  - ✅ Save/unsave artworks
  - ✅ Edit own profile
  - ❌ Cannot create artworks
  - ❌ Cannot access Admin Dashboard
- **Saved Artworks**: Mê Cung Nội Tâm, Giấc Mơ Sâu Thẳm, Vũ Khúc Của Gió

---

### 4. 👨‍💼 DEMO Account (Legacy)
- **Email**: `demo@ethereal.art`
- **Password**: `demo123`
- **Role**: Admin
- **Name**: Demo Admin
- **Note**: Original demo account, also has admin privileges

---

## 🧪 Testing Scenarios

### Test Admin Features
1. Login with `admin@ethereal.art` / `admin123`
2. Go to Settings → Click "Admin" button
3. Test user management:
   - Change `user@ethereal.art` role to Artist
   - Search for users
   - View user statistics

### Test Artist Features
1. Login with `artist@ethereal.art` / `artist123`
2. Go to Settings → Click "Artist" button
3. Test artwork creation:
   - Create a new artwork
   - Edit existing artworks (art_01, art_03)
   - Click "Story" button to open Story Builder
   - Add story segments with effects and audio

### Test User Features
1. Login with `user@ethereal.art` / `user123`
2. Browse gallery
3. Click on artworks to view details
4. Try to access `/artist` or `/admin/users` (should redirect to home)
5. Save/unsave artworks

### Test Role Permissions
1. Login as User → Cannot see Admin or Artist buttons in Settings
2. Login as Artist → Can see Artist button, cannot see Admin button
3. Login as Admin → Can see both Admin and Artist buttons

---

## 🔄 Reset Test Accounts

If you need to reset test accounts, clear localStorage:
```javascript
// Open browser console and run:
localStorage.clear();
// Then refresh the page - accounts will be auto-created again
```

---

## 📝 Notes

- All passwords are simple for testing purposes: `[role]123`
- Accounts are created automatically on first page load
- Data is stored in browser localStorage
- Each account has different saved artworks for testing
- Artist account has 2 pre-created artworks (art_01, art_03)

---

## 🚀 Quick Start

1. Open `http://localhost:3000`
2. Click "Đăng Nhập"
3. Use any test account above
4. Test the features based on the role!
