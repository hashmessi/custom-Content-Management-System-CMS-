export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    // Handle error (you might want to throw or return null)
    console.error(`API Error: ${res.statusText}`);
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'API request failed');
  }

  const json = await res.json();
  return json;
}

// Blog specific fetchers
export async function getPublishedBlogPosts(page = 1, limit = 9) {
  try {
    return await fetchAPI(`/blogs/published?page=${page}&limit=${limit}`, { cache: 'no-store' });
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return { data: [], pages: 0, total: 0 };
  }
}

export async function getAllBlogPosts(page = 1, limit = 10) {
  try {
    return await fetchAPI(`/blogs?page=${page}&limit=${limit}`, { cache: 'no-store' });
  } catch (error) {
    console.error('Failed to fetch all blogs:', error);
    return { data: [], pages: 0, total: 0 };
  }
}

// Keep this for backward compatibility if used, but redirect to published
export async function getBlogPosts(page = 1, limit = 9) {
  return getPublishedBlogPosts(page, limit);
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const json = await fetchAPI(`/blogs/slug/${slug}`, { next: { revalidate: 60 } });
    return json.data;
  } catch (error) {
    console.error(`Failed to fetch blog ${slug}:`, error);
    return null;
  }
}

// Hero Slide fetchers
export async function getHeroSlides() {
  try {
    const json = await fetchAPI('/hero-slides', { cache: 'no-store' });
    return json.data;
  } catch (error) {
    console.error('Failed to fetch hero slides:', error);
    return [];
  }
}

export async function deleteHeroSlide(id: string) {
  return await fetchAPI(`/hero-slides/${id}`, { method: 'DELETE' });
}

export async function toggleHeroSlideActive(id: string) {
  return await fetchAPI(`/hero-slides/${id}/toggle`, { method: 'PATCH' });
}
