"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Image, FileText, Settings, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Hero Slides', href: '/admin/heroes', icon: Image },
  { name: 'Blog Posts', href: '/admin/blogs', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-900 text-white rounded-xl shadow-lg hover:bg-gray-800 transition-all active:scale-95"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "w-64 bg-slate-950 text-white min-h-screen flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out lg:translate-x-0 border-r border-white/5",
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        <div className="p-8 pb-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]">
              <span className="text-white font-black text-xl">G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-outfit text-white leading-none tracking-tight">
                Giakaa
              </span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] mt-1">Management</span>
            </div>
          </Link>
        </div>

        <div className="px-6 py-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Main Menu</div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group',
                    isActive
                      ? 'text-white bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 top-3 bottom-3 w-1 bg-blue-500 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                  )} />
                  <span className={cn(
                    "font-medium",
                    isActive ? "font-bold" : ""
                  )}>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          {/* User Profile Hook */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
               S
             </div>
             <div className="flex-1 overflow-hidden">
               <p className="text-sm font-bold text-white truncate">System Admin</p>
               <p className="text-[10px] text-slate-500 truncate">admin@giakaa.com</p>
             </div>
          </div>

          <button 
            onClick={() => {
              document.cookie = 'admin-auth=; path=/; max-age=0';
              window.location.href = '/admin/login';
            }}
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 w-full rounded-xl transition-all group font-medium"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
