# Admin Panel Access Guide

## 🔑 How to Access the Admin Panel

The admin panel is **separate** from the public website pages.

### Admin URL:
```
http://localhost:3000/admin
```

**NOT** the homepage - that's the public site!

---

## 📍 Admin Panel Pages:

### Main Admin URL: `http://localhost:3000/admin`
- **Dashboard** with statistics
- Sidebar navigation

### Hero Slides Management:
```
http://localhost:3000/admin/heroes
```
- View all hero slides
- Create new slides
- Edit/Delete existing slides
- Toggle active/inactive

### Blog Posts Management:
```
http://localhost:3000/admin/blogs
```
- View all blog posts
- Create new posts
- Edit/Delete posts
- View drafts vs published

### Create Hero Slide:
```
http://localhost:3000/admin/heroes/create
```

### Create Blog Post:
```
http://localhost:3000/admin/blogs/create
```

---

## ✅ Quick Test:

1. Open browser
2. Go to: `http://localhost:3000/admin`
3. You should see:
   - Dark sidebar on the left with "Giakaa Admin"
   - Navigation: Dashboard, Hero Slides, Blog Posts, Settings
   - Main content area showing Dashboard stats

---

## 🎨 What You Should See:

**Left Sidebar (Dark):**
- Giakaa Admin logo
- Dashboard link
- Hero Slides link
- Blog Posts link
- Settings link
- Logout button

**Main Area (White):**
- Dashboard heading
- 4 stat cards (Visits, Blog Posts, Hero Slides, Engagement)
- Chart placeholder

---

## 🚨 If Admin Panel Doesn't Load:

1. Check browser console for errors (F12)
2. Verify frontend server is running on port 3000  
3. Check terminal for compilation errors
4. Try hard refresh (Ctrl + Shift + R)

---

## 📝 Current Pages Working:

✅ Public Site:
- Homepage: `http://localhost:3000`
- Services: `http://localhost:3000/services`
- Industries: `http://localhost:3000/industries`
- Blog: `http://localhost:3000/blog`
- Contact: `http://localhost:3000/contact`

✅ Admin Panel:
- Dashboard: `http://localhost:3000/admin`
- Heroes: `http://localhost:3000/admin/heroes`
- Blogs: `http://localhost:3000/admin/blogs`
