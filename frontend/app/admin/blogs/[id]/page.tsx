import React from 'react';
import BlogForm from '@/components/admin/BlogForm';
import { fetchAPI } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  let post = null;
  try {
    post = await fetchAPI(`/blogs/${params.id}`);
  } catch (error) {
    console.error(error);
  }

  if (!post) {
    notFound();
  }

  return (
    <div>
      <BlogForm initialData={post} isEdit />
    </div>
  );
}
