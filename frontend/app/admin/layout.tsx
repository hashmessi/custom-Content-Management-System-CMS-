"use client";

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Breadcrumbs from '@/components/admin/Breadcrumbs';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bell, ExternalLink, Search as SearchIcon } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50/50">
      <AdminSidebar />
      <div className="lg:ml-64 transition-all duration-300">
        {/* Top Header */}
        <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-30 border-b border-neutral-200/60 h-16 flex items-center justify-between px-6 lg:px-10">
           <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-lg text-neutral-400 group cursor-pointer hover:bg-neutral-200 transition-all">
             <SearchIcon className="w-4 h-4" />
             <span className="text-xs font-medium">Search anything...</span>
             <span className="ml-4 text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-neutral-200 shadow-sm text-neutral-400 group-hover:text-neutral-600">⌘K</span>
           </div>

           <div className="flex items-center gap-6 ml-auto">
             <Link 
               href="/" 
               target="_blank"
               className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-blue-600 transition-colors"
             >
               <ExternalLink className="w-3.5 h-3.5" />
               View Site
             </Link>

             <button className="relative p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
             </button>

             <div className="h-8 w-px bg-neutral-200" />

             <div className="flex items-center gap-3">
               <div className="text-right hidden sm:block">
                 <p className="text-sm font-bold text-neutral-900 leading-none">System Admin</p>
                 <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mt-1">Super User</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-transform cursor-pointer">
                 A
               </div>
             </div>
           </div>
        </header>
        
        <motion.main 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="p-6 lg:p-10 max-w-7xl mx-auto w-full"
        >
          <Breadcrumbs />
          {children}
        </motion.main>
      </div>
    </div>
  );
}
