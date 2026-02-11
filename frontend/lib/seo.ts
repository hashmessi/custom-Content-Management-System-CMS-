// SEO utility functions for generating structured data (JSON-LD)

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
  author?: {
    name: string;
  };
}

/**
 * Generate Organization schema for homepage
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Giakaa',
    alternateName: 'Giakaa - Growth for All',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
    description: 'AI-first consulting firm delivering high-impact solutions that drive measurable growth across 40+ industries.',
    sameAs: [
      'https://twitter.com/giakaa',
      'https://linkedin.com/company/giakaa',
      'https://facebook.com/giakaa',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@giakaa.com',
    },
  };
}

/**
 * Generate BlogPosting schema for blog articles
 */
export function generateBlogPostingSchema(post: BlogPost) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || `${siteUrl}/default-blog-image.jpg`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Giakaa Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Giakaa',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Helper to render JSON-LD script tag
 */
export function renderJsonLd(data: object) {
  return {
    __html: JSON.stringify(data),
  };
}
