# Antigravity CMS - Backend API

A robust RESTful API built with Node.js, Express, and MongoDB for the Antigravity CMS platform.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ LTS
- MongoDB 6.0+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the backend root:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/antigravity-cms

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
FRONTEND_URL=http://localhost:3000
```

### Development Server

```bash
npm run dev
```

API will be available at `http://localhost:5000/api/v1`

### Production Build

```bash
npm start
```

---

## 📊 Database Schema Design

The application uses **MongoDB** as the primary database with Mongoose ODM for schema validation and middleware.

### Design Principles

1. **Document-Oriented**: Leverage MongoDB's flexible document model
2. **Embedded Data**: Minimize joins by embedding related data
3. **Indexing Strategy**: Optimize for common query patterns
4. **Validation**: Schema-level validation with Mongoose
5. **Middleware**: Auto-generate fields and ensure data consistency

---

## 🗄️ Schema Definitions

### 1. HeroSlide Schema

**Purpose**: Manage hero slider content on the landing page

**Fields:**
```javascript
{
  title: String (required, max 255 chars),
  description: String (optional),
  mediaUrl: String (image or video URL),
  mediaType: Enum ['image', 'video'] (default: 'image'),
  ctaText: String (max 100 chars),
  ctaLink: String (URL),
  displayOrder: Number (auto-incremented, default: 0),
  isActive: Boolean (default: true),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

**Design Decisions:**
- **`displayOrder`**: Allows flexible slide ordering without array manipulation
- **`isActive`**: Soft enable/disable without deletion
- **`mediaType`**: Explicit distinction between images and videos for frontend rendering
- **Auto-increment**: Pre-save middleware automatically sets display order

**Indexes:**
```javascript
// Compound index for fetching active slides in order
{ isActive: 1, displayOrder: 1 }

// Index for sorting by creation date
{ createdAt: -1 }
```

**Rationale:**
- **Compound Index (`isActive + displayOrder`)**: 
  - Primary query pattern: "Get all active slides sorted by display order"
  - Covers both filter and sort in a single index
  - Enables efficient `GET /hero-slides/active` endpoint
- **Creation Date Index**: Supports admin panel sorting by newest first

---

### 2. BlogPost Schema

**Purpose**: Manage blog content with SEO optimization

**Fields:**
```javascript
{
  title: String (required, max 300 chars),
  slug: String (required, unique, lowercase),
  content: String (required, HTML/Markdown),
  excerpt: String (max 500 chars),
  featuredImage: String (URL),
  
  // SEO Fields
  metaTitle: String (max 70 chars),
  metaDescription: String (max 160 chars),
  
  // Publication
  status: Enum ['draft', 'published'] (default: 'draft'),
  publishedAt: Date,
  
  // Analytics
  viewCount: Number (default: 0),
  
  // Timestamps
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

**Virtual Fields:**
```javascript
readingTime: Calculated from word count (~200 words/min)
```

**Design Decisions:**
- **`slug`**: SEO-friendly URLs, unique constraint enforced at DB level
- **`status`**: Draft/publish workflow for content management
- **`publishedAt`**: Separate from `createdAt` for scheduled publishing
- **`viewCount`**: Built-in analytics without external service
- **Auto-generation**: Middleware auto-generates slug and meta fields

**Indexes:**
```javascript
// 1. Unique index on slug (automatic from unique: true)
{ slug: 1 }

// 2. Compound index for published content queries
{ status: 1, publishedAt: -1 }

// 3. Creation date index for admin sorting
{ createdAt: -1 }

// 4. Text index for full-text search
{ 
  title: 'text', 
  content: 'text', 
  excerpt: 'text' 
}
// with weights: { title: 10, excerpt: 5, content: 1 }
```

**Indexing Rationale:**

#### 1. Slug Index (Unique)
- **Query Pattern**: `GET /blogs/slug/:slug`
- **Purpose**: Fast lookup by SEO-friendly URL
- **Type**: Unique index ensures no duplicate URLs
- **Performance**: O(log n) lookup instead of O(n) table scan
- **Critical**: Required for every public blog post view

#### 2. Compound Index (status + publishedAt)
- **Query Pattern**: `GET /blogs/published?page=1&limit=10`
- **Purpose**: Fetch published posts sorted by publish date
- **Type**: Compound index covers both filter and sort
- **Performance**: Single index scan for most common query
- **Optimization**: Descending order on `publishedAt` for "newest first"
- **Coverage**: Eliminates need for separate indexes on `status` and `publishedAt`

#### 3. Creation Date Index
- **Query Pattern**: Admin panel sorting by creation date
- **Purpose**: Support admin workflows (drafts, recent edits)
- **Type**: Single-field descending index
- **Use Case**: Less frequent than published content queries

#### 4. Text Index (Full-Text Search)
- **Query Pattern**: `POST /blogs/search`
- **Purpose**: Search across title, excerpt, and content
- **Type**: MongoDB text index with custom weights
- **Weights**: 
  - Title: 10x (most relevant)
  - Excerpt: 5x (moderately relevant)
  - Content: 1x (base relevance)
- **Performance**: Enables fast full-text search without external service
- **Limitation**: Only one text index per collection (MongoDB constraint)

---

## 🎯 Indexing Strategy Summary

### Performance Optimization

| Index | Collection | Fields | Purpose | Query Pattern |
|-------|-----------|--------|---------|---------------|
| Unique | BlogPost | `slug` | SEO URLs | `/blog/:slug` |
| Compound | BlogPost | `status, publishedAt` | Published posts | List published blogs |
| Single | BlogPost | `createdAt` | Admin sorting | Recent drafts |
| Text | BlogPost | `title, content, excerpt` | Search | Full-text search |
| Compound | HeroSlide | `isActive, displayOrder` | Active slides | Hero slider |
| Single | HeroSlide | `createdAt` | Admin sorting | Recent slides |

### Index Selection Criteria

1. **Query Frequency**: Indexes on most-queried fields (slug, status)
2. **Selectivity**: High-selectivity fields (slug is unique)
3. **Compound Indexes**: Cover filter + sort in single index
4. **Index Size**: Balance between performance and storage
5. **Write Performance**: Minimal indexes to avoid write overhead

### MongoDB vs PostgreSQL

**Why MongoDB?**
- **Flexible Schema**: Blog content varies (rich text, embedded media)
- **Document Model**: Natural fit for CMS content (nested data)
- **Horizontal Scaling**: Easy sharding for future growth
- **JSON-Native**: Direct mapping to REST API responses
- **Text Search**: Built-in full-text search without extensions

**Trade-offs:**
- No ACID transactions (acceptable for CMS use case)
- No foreign key constraints (handled in application layer)
- Eventual consistency in replica sets (acceptable for blogs)

---

## 📦 Middleware & Validation

### Pre-Save Middleware

**BlogPost:**
```javascript
// Auto-generate slug from title
if (!this.slug && this.title) {
  this.slug = slugify(this.title);
}

// Ensure slug uniqueness (append counter if needed)
if (existingPost) {
  this.slug = `${this.slug}-${counter}`;
}

// Auto-generate meta fields
if (!this.metaTitle) {
  this.metaTitle = this.title.substring(0, 70);
}

// Set publishedAt when publishing
if (this.status === 'published' && !this.publishedAt) {
  this.publishedAt = new Date();
}
```

**HeroSlide:**
```javascript
// Auto-increment display order
if (this.isNew && this.displayOrder === 0) {
  const lastSlide = await HeroSlide.findOne().sort({ displayOrder: -1 });
  this.displayOrder = lastSlide ? lastSlide.displayOrder + 1 : 1;
}
```

### Schema Validation

- **Required Fields**: Enforced at schema level
- **Max Length**: Character limits for SEO and UX
- **Enums**: Restricted values for status, mediaType
- **Trim**: Automatic whitespace removal
- **Lowercase**: Slug normalization

---

## 🔍 Query Optimization Examples

### Efficient Queries (Using Indexes)

```javascript
// ✅ Uses slug index
BlogPost.findOne({ slug: 'ai-transformation' });

// ✅ Uses compound index (status + publishedAt)
BlogPost.find({ status: 'published' })
  .sort({ publishedAt: -1 })
  .limit(10);

// ✅ Uses compound index (isActive + displayOrder)
HeroSlide.find({ isActive: true })
  .sort({ displayOrder: 1 });

// ✅ Uses text index
BlogPost.find({ $text: { $search: 'AI transformation' } })
  .sort({ score: { $meta: 'textScore' } });
```

### Inefficient Queries (Avoid)

```javascript
// ❌ No index on title alone (use text search instead)
BlogPost.find({ title: /AI/i });

// ❌ Sorting by non-indexed field
BlogPost.find().sort({ viewCount: -1 });

// ❌ Querying without status filter (doesn't use compound index)
BlogPost.find().sort({ publishedAt: -1 });
```

---

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB 6.0+ with Mongoose ODM
- **Validation**: Joi (via custom middleware)
- **File Upload**: Cloudinary
- **Security**: Helmet, CORS, express-rate-limit
- **Utilities**: slugify, date-fns

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Endpoints

**Hero Slides:**
- `GET /hero-slides` - List all slides
- `GET /hero-slides/active` - Get active slides
- `POST /hero-slides` - Create slide
- `PUT /hero-slides/:id` - Update slide
- `DELETE /hero-slides/:id` - Delete slide

**Blog Posts:**
- `GET /blogs` - List all posts
- `GET /blogs/published` - Get published posts
- `GET /blogs/slug/:slug` - Get post by slug
- `POST /blogs` - Create post
- `PUT /blogs/:id` - Update post
- `DELETE /blogs/:id` - Delete post
- `POST /blogs/search` - Search posts

For detailed API documentation, see `api_verification_report.md`.

---

## 🚀 Deployment

### Database Setup

1. **Create MongoDB Database:**
   ```bash
   mongosh
   use antigravity-cms
   ```

2. **Indexes are created automatically** by Mongoose on first run

3. **Verify Indexes:**
   ```bash
   db.blogposts.getIndexes()
   db.heroslides.getIndexes()
   ```

### Production Considerations

- **Connection Pooling**: Mongoose handles automatically
- **Replica Sets**: Configure for high availability
- **Backups**: Regular mongodump or Atlas backups
- **Monitoring**: Use MongoDB Atlas or self-hosted monitoring
- **Scaling**: Implement sharding for large datasets

---

## 📈 Performance Monitoring

### Index Usage Analysis

```javascript
// Check if query uses index
db.blogposts.find({ status: 'published' })
  .sort({ publishedAt: -1 })
  .explain('executionStats');

// Look for:
// - "stage": "IXSCAN" (index scan - good)
// - "stage": "COLLSCAN" (collection scan - bad)
```

### Slow Query Logging

Enable in MongoDB config:
```yaml
operationProfiling:
  mode: slowOp
  slowOpThresholdMs: 100
```

---

## 🔐 Security

- **Input Validation**: All inputs validated before DB operations
- **NoSQL Injection**: Mongoose escapes queries automatically
- **Rate Limiting**: Prevent abuse of search/create endpoints
- **CORS**: Restricted to frontend domain
- **Helmet**: Security headers enabled

---

## 📝 License

MIT
