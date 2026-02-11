"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Image, TrendingUp } from 'lucide-react';

const stats = [
  { name: 'Total Visits', value: '12,345', change: '+12%', icon: Users, color: 'bg-blue-500' },
  { name: 'Blog Posts', value: '24', change: '+4', icon: FileText, color: 'bg-green-500' },
  { name: 'Hero Slides', value: '5', change: '0', icon: Image, color: 'bg-purple-500' },
  { name: 'Engagement', value: '85%', change: '+5%', icon: TrendingUp, color: 'bg-orange-500' },
];

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

export default function AdminStatsGrid() {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat) => (
        <motion.div 
          key={stat.name} 
          variants={item}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white p-7 rounded-2xl border border-neutral-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all flex flex-col justify-between overflow-hidden relative group"
        >
          {/* Subtle Accent Glow */}
          <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${stat.color}`} />
          
          <div className="flex items-center justify-between mb-5">
            <div className={`p-3.5 rounded-xl ${stat.color} bg-opacity-[0.08] ring-1 ring-inset ${stat.color.replace('bg-', 'ring-')}/20`}>
              <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-emerald-600 text-[11px] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/50">
                {stat.change}
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.name}</h3>
            <p className="text-3xl font-bold text-neutral-900 font-outfit tracking-tight">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
