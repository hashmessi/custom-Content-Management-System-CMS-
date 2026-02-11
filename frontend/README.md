# Antigravity CMS - Frontend

A modern, SEO-optimized frontend built with Next.js 15+ and React 19 for the Antigravity CMS platform.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ LTS
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

---

## 📐 Project Structure

```
frontend/
├── app/
│   ├── (public)/          # Public-facing pages
│   │   ├── page.tsx       # Landing page
│   │   ├── blog/          # Blog pages
│   │   ├── about/         # About page
│   │   └── industries/    # Industries page
│   ├── admin/             # Admin panel (protected)
│   └── api/               # API routes (auth)
├── components/
│   ├── admin/             # Admin-specific components
│   ├── blog/              # Blog components
│   ├── home/              # Landing page sections
│   └── layout/            # Shared layout components
├── lib/
│   ├── api.ts             # API client functions
│   ├── seo.ts             # SEO utilities
│   └── utils.ts           # Helper functions
└── public/                # Static assets
```

---

## 🎨 Rendering Strategies

This application uses a **hybrid rendering approach** to optimize for both performance and SEO:

### 1. **Server-Side Rendering (SSR)** - Blog Pages

**Used in:**
- `/app/blog/page.tsx` - Blog listing page
- `/app/blog/[slug]/page.tsx` - Individual blog posts

**Why SSR:**
- **Dynamic Content**: Blog posts are fetched from the CMS and can change frequently
- **SEO Critical**: Search engines need fresh, crawlable content
- **Personalization**: Can incorporate user-specific data (future feature)

**Implementation:**
```typescript
// Server Component (default in App Router)
export default async function BlogPage({ searchParams }) {
  const { data: posts } = await getBlogPosts(page, limit);
  return <BlogGrid posts={posts} />;
}
```

**Benefits:**
- ✅ Always up-to-date content
- ✅ Excellent SEO (fully rendered HTML)
- ✅ Fast initial page load
- ✅ Dynamic meta tags via `generateMetadata()`

**Trade-offs:**
- ⚠️ Server load on each request (mitigated with caching)
- ⚠️ Slightly slower than static pages

---

### 2. **Static Site Generation (SSG)** - Landing Pages

**Used in:**
- `/app/page.tsx` - Homepage/Landing page
- `/app/about/page.tsx` - About page
- `/app/industries/page.tsx` - Industries page

**Why SSG:**
- **Static Content**: These pages rarely change
- **Maximum Performance**: Pre-rendered at build time
- **CDN-Friendly**: Can be cached globally

**Implementation:**
```typescript
// Server Component with static data
export default function Home() {
  return (
    <>
      <Hero />
      <Industries />
      <About />
    </>
  );
}
```

**Benefits:**
- ✅ Blazing fast performance
- ✅ Excellent SEO
- ✅ No server load
- ✅ Can be served from CDN

**Trade-offs:**
- ⚠️ Requires rebuild for content updates (acceptable for static pages)

---

### 3. **Client-Side Rendering (CSR)** - Interactive Components

**Used in:**
- Admin panel (`/app/admin/*`)
- Interactive UI elements (navbar, modals, forms)
- Animations (Framer Motion components)

**Why CSR:**
- **Interactivity**: Rich user interactions
- **Real-time Updates**: Admin panel needs live data
- **Authentication**: Protected routes

**Implementation:**
```typescript
'use client'; // Client Component directive

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  
  useEffect(() => {
    fetchStats().then(setStats);
  }, []);
  
  return <StatsGrid stats={stats} />;
}
```

**Benefits:**
- ✅ Rich interactivity
- ✅ Real-time updates
- ✅ Reduced server load

**Trade-offs:**
- ⚠️ Not SEO-friendly (acceptable for admin panel)
- ⚠️ Requires JavaScript

---

### 4. **Incremental Static Regeneration (ISR)** - Future Enhancement

**Recommended for:**
- Blog listing page (revalidate every 60 seconds)
- Popular blog posts (on-demand revalidation)

**Implementation (Future):**
```typescript
export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogGrid posts={posts} />;
}
```

**Benefits:**
- ✅ Static performance with dynamic content
- ✅ Automatic cache invalidation
- ✅ Best of both worlds (SSG + SSR)

---

## 🔍 SEO Implementation

### Dynamic Meta Tags
All pages implement dynamic meta tags using Next.js `Metadata` API:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: { /* OG tags */ },
    twitter: { /* Twitter cards */ },
    alternates: { canonical: postUrl },
  };
}
```

### Structured Data (JSON-LD)
Blog posts include structured data for rich search results:

```typescript
const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "image": post.featuredImage,
  "datePublished": post.publishedAt,
  "author": { "@type": "Organization", "name": "Giakaa" }
};
```

### URL Structure
- **SEO-Friendly Slugs**: `/blog/ai-transformation-guide`
- **Clean URLs**: No query parameters for content
- **Canonical Tags**: Prevent duplicate content issues

---

## 🎯 Performance Optimizations

1. **Image Optimization**: `next/image` with automatic WebP conversion
2. **Code Splitting**: Automatic route-based splitting
3. **Font Optimization**: `next/font` with self-hosted fonts
4. **Bundle Analysis**: Tree-shaking and dead code elimination
5. **Lazy Loading**: Components loaded on-demand

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Rich Text**: react-quill-new (React 19 compatible)
- **HTTP Client**: Fetch API
- **Type Safety**: TypeScript

---

## 📦 Key Features

### Landing Page
- ✅ **Dynamic Hero Slider** - Fetches slides from CMS API
  - Auto-rotation every 5 seconds
  - Manual navigation (prev/next buttons)
  - Slide indicators
  - Smooth transitions with Framer Motion
  - Fallback to default slide if API unavailable
- ✅ Industries section with icon cards
- ✅ About section with company info
- ✅ Fully responsive design
- ✅ Modular component structure

### Blog System
- ✅ Blog listing with pagination
- ✅ Individual blog posts with slug-based URLs
- ✅ Dynamic meta tags (title, description, OG tags)
- ✅ Featured images
- ✅ Reading time estimation
- ✅ Structured data (JSON-LD)
- ✅ Social sharing (placeholder)

### Admin Panel
- ✅ Hero slide management (CRUD operations)
- ✅ Blog post CRUD operations
- ✅ Rich text editor (React Quill)
- ✅ Image upload integration
- ✅ Draft/publish workflow
- ✅ Responsive sidebar navigation

---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Manual Deployment
```bash
npm run build
npm start
```

For detailed deployment instructions, see `DEPLOYMENT.md` in the project root.

