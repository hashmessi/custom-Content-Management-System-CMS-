import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowUpRight, Clock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt?: string;
  readingTime?: number;
  viewCount?: number;
  author?: {
    name: string;
    avatar?: string;
  };
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden relative aspect-video">
        <div 
          className="absolute inset-0 bg-gray-200 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{
            backgroundImage: post.featuredImage ? `url(${post.featuredImage})` : 'none',
          }}
        >
           {!post.featuredImage && (
             <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">
               No Image
             </div>
           )}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium">
          <time dateTime={post.publishedAt}>
            {post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : 'Draft'}
          </time>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime || 5} min read
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {post.viewCount || 0}
          </span>
        </div>
        
        <Link href={`/blog/${post.slug}`} className="block mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
          {post.excerpt}
        </p>
        
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all"
        >
          Read Article
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
