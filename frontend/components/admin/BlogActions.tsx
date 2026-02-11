"use client";

import React, { useState } from 'react';
import { Trash, Edit, Check, X, Loader2, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';
import Link from 'next/link';

export const DeleteBlogButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      router.refresh();
    } catch (error) {
      alert('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Delete"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4" />}
    </button>
  );
};

export const PublishToggleButton = ({ id, status }: { id: string, status: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isPublished = status === 'published';

  const handleToggle = async () => {
    setLoading(true);
    try {
        // Assuming endpoint is PATCH /blogs/:id/publish or unpublish
        // But backend controller has toggle or specific publish endpoint?
        // Checking backend: blog.routes.js has PATCH /:id/publish
        // Controller publishBlogPost sets status to 'published' and publishedAt.
        // What about unpublish? Controller has unpublishBlogPost?
        // Let's check backend.
        // Assuming I can just update status via PUT for now if toggle isn't simple. 
        // Or I'll just use the Edit form for status change. 
        // But a quick toggle is nice.
        // backend `blogController.js` has `publishBlogPost` and `unpublishBlogPost` methods?
        // Let's stick to Edit form for status change to be safe, OR check backend.
        // I'll skip this component for now and use Edit form.
    } catch (error) {
        // ...
    }
  };

  return null; // logic pending verification
};
