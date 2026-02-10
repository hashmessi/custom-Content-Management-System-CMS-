# Antigravity CMS - Manual Testing Checklist

## Backend API Testing

### Prerequisites
- [ ] Backend server running on `http://localhost:5000`
- [ ] MongoDB connected successfully
- [ ] Cloudinary credentials configured

### Hero Slides API (`/api/v1/hero-slides`)

#### GET Endpoints
- [ ] `GET /api/v1/hero-slides` - Returns all hero slides
- [ ] `GET /api/v1/hero-slides/active` - Returns only active slides
- [ ] `GET /api/v1/hero-slides/:id` - Returns single slide by ID

#### POST Endpoint
- [ ] `POST /api/v1/hero-slides` - Creates new slide with image upload
  - [ ] Validates required fields (title, subtitle)
  - [ ] Uploads image to Cloudinary
  - [ ] Returns created slide with image URL

#### PUT Endpoint
- [ ] `PUT /api/v1/hero-slides/:id` - Updates existing slide
  - [ ] Updates text fields
  - [ ] Replaces image if new one uploaded
  - [ ] Returns updated slide

#### DELETE Endpoint
- [ ] `DELETE /api/v1/hero-slides/:id` - Deletes slide
  - [ ] Removes from database
  - [ ] Returns success message

#### PATCH Endpoints
- [ ] `PATCH /api/v1/hero-slides/:id/toggle-active` - Toggles active status
- [ ] `PATCH /api/v1/hero-slides/:id/reorder` - Updates display order

---

### Blog Posts API (`/api/v1/blogs`)

#### GET Endpoints
- [ ] `GET /api/v1/blogs` - Returns all blogs with pagination
- [ ] `GET /api/v1/blogs/published` - Returns only published blogs
- [ ] `GET /api/v1/blogs/:id` - Returns single blog by ID
- [ ] `GET /api/v1/blogs/slug/:slug` - Returns blog by slug

#### POST Endpoint
- [ ] `POST /api/v1/blogs` - Creates new blog post
  - [ ] Auto-generates slug from title
  - [ ] Uploads featured image
  - [ ] Sets default status to 'draft'
  - [ ] Returns created post

#### PUT Endpoint
- [ ] `PUT /api/v1/blogs/:id` - Updates existing blog
  - [ ] Updates all fields
  - [ ] Replaces featured image if provided
  - [ ] Returns updated post

#### DELETE Endpoint
- [ ] `DELETE /api/v1/blogs/:id` - Deletes blog post

#### PATCH Endpoint
- [ ] `PATCH /api/v1/blogs/:id/publish` - Publishes draft blog
  - [ ] Sets status to 'published'
  - [ ] Sets publishedAt timestamp

#### POST Search
- [ ] `POST /api/v1/blogs/search` - Searches blogs by query

---

## Frontend Testing

### Prerequisites
- [ ] Frontend dev server running on `http://localhost:3000`
- [ ] Backend API accessible
- [ ] Sample data exists (hero slides and blog posts)

### Landing Page (`/`)

#### Visual Elements
- [ ] Navbar renders correctly
- [ ] Hero section displays with background
- [ ] Industries grid shows all cards
- [ ] About section renders
- [ ] Footer displays with all links

#### Functionality
- [ ] Navbar links work
- [ ] Hero slider auto-advances (if multiple slides)
- [ ] Industry cards have hover effects
- [ ] All links navigate correctly

#### SEO
- [ ] Page title is correct
- [ ] Meta description present
- [ ] Open Graph tags present
- [ ] Organization JSON-LD schema present

---

### Blog Index (`/blog`)

#### Visual Elements
- [ ] Page header displays
- [ ] Blog cards render in grid
- [ ] Pagination controls visible (if multiple pages)

#### Functionality
- [ ] Blog cards are clickable
- [ ] Pagination works (next/previous)
- [ ] Images load correctly
- [ ] Dates format properly

#### SEO
- [ ] Page title is correct
- [ ] Meta description present
- [ ] Canonical URL set

---

### Blog Detail (`/blog/[slug]`)

#### Visual Elements
- [ ] Hero section with featured image
- [ ] Title and metadata display
- [ ] Content renders properly (HTML/Markdown)
- [ ] Sidebar newsletter form visible
- [ ] Share buttons present

#### Functionality
- [ ] Back to blog link works
- [ ] Content formatting is correct
- [ ] Images in content load
- [ ] Reading time calculation accurate

#### SEO
- [ ] Dynamic title from post
- [ ] Meta description from post
- [ ] Open Graph article tags present
- [ ] BlogPosting JSON-LD schema present
- [ ] Canonical URL set

---

### Admin Dashboard (`/admin`)

#### Visual Elements
- [ ] Sidebar navigation renders
- [ ] Stats cards display
- [ ] All navigation links visible

#### Functionality
- [ ] Sidebar links navigate correctly
- [ ] Active state highlights current page

---

### Admin Hero Slides (`/admin/heroes`)

#### List View
- [ ] Table displays all slides
- [ ] Preview thumbnails show
- [ ] Status badges display correctly
- [ ] Action buttons visible on hover

#### Create New Slide
- [ ] "Create Slide" button opens form
- [ ] Image upload works
- [ ] Preview shows uploaded image
- [ ] Form validation works
- [ ] Submit creates new slide
- [ ] Redirects to list after creation

#### Edit Slide
- [ ] Edit button opens form with existing data
- [ ] Image preview shows current image
- [ ] Can update fields
- [ ] Can replace image
- [ ] Submit updates slide
- [ ] Redirects to list after update

#### Delete Slide
- [ ] Delete button shows confirmation
- [ ] Confirming deletes slide
- [ ] List refreshes after deletion

#### Toggle Active
- [ ] Toggle button changes status
- [ ] Badge updates immediately
- [ ] Status persists after refresh

---

### Admin Blog Posts (`/admin/blogs`)

#### List View
- [ ] Table displays all posts
- [ ] Featured images show
- [ ] Status badges correct (Draft/Published)
- [ ] Published dates display
- [ ] Pagination works

#### Create New Post
- [ ] "Create Post" button opens form
- [ ] Rich text editor loads
- [ ] Image upload works
- [ ] SEO fields available
- [ ] Form validation works
- [ ] Can save as draft
- [ ] Can publish immediately
- [ ] Redirects to list after creation

#### Edit Post
- [ ] Edit button opens form with existing data
- [ ] Rich text editor shows content
- [ ] Can update all fields
- [ ] Can change status
- [ ] Submit updates post
- [ ] Redirects to list after update

#### Delete Post
- [ ] Delete button shows confirmation
- [ ] Confirming deletes post
- [ ] List refreshes after deletion

#### View Post
- [ ] View button opens post in new tab
- [ ] Post displays correctly on frontend

---

## Responsiveness Testing

### Mobile (375px width)
- [ ] Landing page: All sections stack vertically
- [ ] Landing page: Navbar collapses to hamburger menu
- [ ] Blog index: Cards display in single column
- [ ] Blog detail: Content is readable
- [ ] Admin: Sidebar becomes mobile-friendly

### Tablet (768px width)
- [ ] Landing page: Grid layouts adjust (2 columns)
- [ ] Blog index: Cards display in 2 columns
- [ ] Admin: Sidebar and content layout works

### Desktop (1920px width)
- [ ] Landing page: All sections utilize full width appropriately
- [ ] Blog index: Cards display in 3 columns
- [ ] Admin: Sidebar and content have proper spacing

---

## Cross-Browser Testing

### Chrome (Primary)
- [ ] All pages render correctly
- [ ] All functionality works
- [ ] No console errors

### Firefox
- [ ] All pages render correctly
- [ ] All functionality works
- [ ] No console errors

### Edge
- [ ] All pages render correctly
- [ ] All functionality works
- [ ] No console errors

---

## Performance Checks

### Image Optimization
- [ ] All images use `next/image` component
- [ ] Images have width and height attributes
- [ ] Images lazy-load below the fold
- [ ] Images served in WebP format (check Network tab)

### Loading Performance
- [ ] Initial page load < 3 seconds
- [ ] No layout shift during load
- [ ] Fonts load without FOUT (Flash of Unstyled Text)

### Bundle Size
- [ ] Run `npm run build` and check output
- [ ] No warnings about large bundles
- [ ] Code splitting working (multiple chunks)

---

## Accessibility Checks

### Keyboard Navigation
- [ ] Can tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Can submit forms with Enter key

### Screen Reader
- [ ] Images have alt text
- [ ] Form inputs have labels
- [ ] Buttons have descriptive text

### Color Contrast
- [ ] Text readable on all backgrounds
- [ ] Links distinguishable from text

---

## Final Verification

### No Console Errors
- [ ] Homepage: No errors
- [ ] Blog index: No errors
- [ ] Blog detail: No errors
- [ ] Admin pages: No errors

### Data Persistence
- [ ] Created hero slides persist after refresh
- [ ] Created blog posts persist after refresh
- [ ] Updated data reflects correctly

### Error Handling
- [ ] 404 page shows for invalid routes
- [ ] API errors display user-friendly messages
- [ ] Form validation errors are clear

---

## Notes

**Issues Found:**
- [ ] Issue 1: [Description]
- [ ] Issue 2: [Description]

**Performance Metrics:**
- Lighthouse Performance: ___
- Lighthouse Accessibility: ___
- Lighthouse Best Practices: ___
- Lighthouse SEO: ___

**Testing Completed By:** ___________  
**Date:** ___________
