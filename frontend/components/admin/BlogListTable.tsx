"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Eye } from 'lucide-react';
import { DeleteBlogButton } from '@/components/admin/BlogActions';
import { format } from 'date-fns';

export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  status: string;
  publishedAt?: string;
  slug: string;
}

interface BlogListTableProps {
  posts: BlogPost[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function BlogListTable({ posts }: BlogListTableProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="px-6 py-16 text-center text-gray-500">
        <p className="text-lg font-medium">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Post</th>
            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Published</th>
            <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
          </tr>
        </thead>
        <motion.tbody 
          className="divide-y divide-gray-100"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {posts.map((post) => (
              <motion.tr 
                key={post._id} 
                variants={item}
                exit={{ opacity: 0, x: -20 }}
                className="hover:bg-gray-50 transition-colors group"
                layout
              >
                <td className="px-6 py-4 max-w-md">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 relative shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                    >
                      {post.featuredImage ? (
                        <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-gray-400">No Img</div>
                      )}
                    </motion.div>
                    <div>
                      <div className="font-semibold text-gray-900 line-clamp-1">{post.title}</div>
                      <div className="text-gray-500 text-sm line-clamp-1 mt-0.5">{post.excerpt}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/blogs/${post._id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <DeleteBlogButton id={post._id} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </motion.tbody>
      </table>
    </div>
  );
}
