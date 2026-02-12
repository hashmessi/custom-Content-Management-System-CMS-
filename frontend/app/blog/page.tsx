import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { getBlogPosts } from '@/lib/api';
import { BlogPost } from '@/lib/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Latest updates, insights, and thought leadership from Giakaa on digital transformation and enterprise solutions.',
  openGraph: {
    title: 'Insights | Giakaa',
    description: 'Latest updates and insights from Giakaa.',
    type: 'website',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights | Giakaa',
    description: 'Latest updates and insights from Giakaa.',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const limit = 9;
  const response = await getBlogPosts(page, limit);
  const posts = response?.data || [];
  const totalPages = response?.pages || 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gray-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold font-outfit mb-6">Our Insights</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thought leadership and success stories from the forefront of digital transformation.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: BlogPost, index: number) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p className="text-2xl font-medium">No posts found.</p>
              <p>Check back later for updates.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16">
              <Link
                href={`/blog?page=${page - 1}`}
                className={`p-3 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-blue-50 transition-colors ${
                  page <= 1 ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <span className="text-gray-600 font-medium">
                Page {page} of {totalPages}
              </span>
              <Link
                href={`/blog?page=${page + 1}`}
                className={`p-3 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-blue-50 transition-colors ${
                  page >= totalPages ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                <ArrowRight className="w-5 h-5 text-gray-600" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
