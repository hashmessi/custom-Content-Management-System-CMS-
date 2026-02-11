import AdminStatsGrid from '@/components/admin/AdminStatsGrid';
import AdminChart from '@/components/admin/AdminChart';
import AdminActivityFeed from '@/components/admin/AdminActivityFeed';
import Link from 'next/link';
import { Plus, Image as ImageIcon, FileText, Settings } from 'lucide-react';

const quickActions = [
  { name: 'New Blog Post', href: '/admin/blogs/create', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Add Hero Slide', href: '/admin/heroes', icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
  { name: 'Settings', href: '/admin/settings', icon: Settings, color: 'text-gray-600', bg: 'bg-gray-100' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/blogs/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Create Post
          </Link>
        </div>
      </div>
      
      <AdminStatsGrid />

      <AdminChart />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action) => (
              <Link 
                key={action.name}
                href={action.href}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className={`p-3 rounded-xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{action.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">Fast track to {action.name.toLowerCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <AdminActivityFeed />
        </div>
      </div>
    </div>
  );
}

