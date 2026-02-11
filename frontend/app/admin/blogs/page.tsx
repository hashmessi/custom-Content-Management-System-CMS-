import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/api';
import BlogListTable, { BlogPost } from '@/components/admin/BlogListTable';
import BlogSearch from '@/components/admin/BlogSearch';

export const dynamic = 'force-dynamic';

const BlogListPage = async ({ searchParams }: { searchParams: { page?: string, search?: string } }) => {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || '';
  const { data: posts, pages: totalPages } = await getAllBlogPosts(page, 10);

  // Filter posts if search is present (ideally this should be done on the server/API)
  const filteredPosts = search 
    ? posts.filter((post: BlogPost) => 
        post.title.toLowerCase().includes(search.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(search.toLowerCase())
      ) 
    : posts;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-gray-900">Blog Posts</h1>
          <p className="text-gray-500 mt-1">Manage articles, news, and insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <BlogSearch />
          <Link
            href="/admin/blogs/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm shrink-0 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Create Post</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
        <BlogListTable posts={filteredPosts} />
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
         <div className="flex justify-center mt-6 gap-2">
            <Link 
                href={`/admin/blogs?page=${page - 1}`}
                className={`px-4 py-2 border rounded-md ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50'}`}
            >
                Previous
            </Link>
            <span className="px-4 py-2 text-gray-600">Page {page} of {totalPages}</span>
            <Link 
                href={`/admin/blogs?page=${page + 1}`}
                className={`px-4 py-2 border rounded-md ${page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50'}`}
            >
                Next
            </Link>
         </div>
      )}
    </div>
  );
};

export default BlogListPage;
