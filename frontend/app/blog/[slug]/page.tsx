import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getBlogPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Clock, Calendar, User, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { generateBlogPostingSchema, renderJsonLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    authors: [{ name: post.author?.name || 'Giakaa Team' }],
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      url: postUrl,
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'Giakaa Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  const blogPostingSchema = generateBlogPostingSchema(post);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(blogPostingSchema)}
      />
      
      <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900 flex items-end pb-20 overflow-hidden">
        {post.featuredImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${post.featuredImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold font-outfit leading-tight mb-6 max-w-4xl">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Draft'}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readingTime || 5} min read
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Giakaa Team
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content */}
            <article className="lg:w-2/3">
              <div 
                className="prose prose-lg prose-blue max-w-none prose-headings:font-outfit prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: post?.content || '<p>Content not available</p>' }}
              />
              
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Share this article</h3>
                <div className="flex gap-4">
                  <button className="p-2 border border-gray-200 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  {/* Add social sharing buttons here */}
                </div>
              </div>
            </article>
            
            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-8">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold font-outfit text-gray-900 mb-6">
                  Newsletter
                </h3>
                <p className="text-gray-600 mb-6">
                  Get the latest insights delivered straight to your inbox.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>
            
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}
