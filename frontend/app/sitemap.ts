import { MetadataRoute } from 'next';

interface BlogSitemapPost {
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function getPublishedBlogs() {
  try {
    const res = await fetch(`${API_URL}/api/v1/blogs/published?limit=1000`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!res.ok) {
      console.error('Failed to fetch blogs for sitemap');
      return [];
    }
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getPublishedBlogs();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Dynamic blog post routes
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post: BlogSitemapPost) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
