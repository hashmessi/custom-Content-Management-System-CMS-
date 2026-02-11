"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Image as HeroIcon, User, Settings, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const activities = [
  { 
    id: 1, 
    type: 'blog', 
    action: 'published', 
    target: 'How AI is changing Consulting', 
    user: 'System Admin', 
    time: new Date(Date.now() - 1000 * 60 * 45) // 45 mins ago
  },
  { 
    id: 2, 
    type: 'hero', 
    action: 'updated', 
    target: 'Main Homepage Slider', 
    user: 'System Admin', 
    time: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  { 
    id: 3, 
    type: 'blog', 
    action: 'created', 
    target: 'Future of Headless CMS', 
    user: 'System Admin', 
    time: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
  },
  { 
    id: 4, 
    type: 'settings', 
    action: 'changed', 
    target: 'SEO Global Config', 
    user: 'System Admin', 
    time: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'blog': return <FileText className="w-4 h-4" />;
    case 'hero': return <HeroIcon className="w-4 h-4" />;
    case 'settings': return <Settings className="w-4 h-4" />;
    default: return <User className="w-4 h-4" />;
  }
};

const getColor = (action: string) => {
  switch (action) {
    case 'published': return 'bg-emerald-500';
    case 'created': return 'bg-blue-500';
    case 'updated': return 'bg-amber-500';
    case 'changed': return 'bg-purple-500';
    default: return 'bg-slate-500';
  }
};

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
  hidden: { x: -10, opacity: 0 },
  show: { x: 0, opacity: 1 }
};

export default function AdminActivityFeed() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-neutral-900">Recent Activity</h3>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">Real-time</span>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 flex-1"
      >
        {activities.map((activity, index) => (
          <motion.div 
            key={activity.id} 
            variants={item}
            className="relative flex gap-4 group"
          >
            {index !== activities.length - 1 && (
              <div className="absolute left-[19px] top-10 bottom-[-24px] w-0.5 bg-neutral-50" />
            )}
            
            <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white ${getColor(activity.action)} shadow-lg shadow-opacity-10 group-hover:scale-110 transition-transform`}>
              {getIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <p className="text-sm font-bold text-neutral-900 truncate">
                  {activity.user} <span className="font-normal text-neutral-500">{activity.action}</span> {activity.target}
                </p>
                <span className="text-[10px] font-medium text-neutral-400 whitespace-nowrap">
                  {formatDistanceToNow(activity.time, { addSuffix: true })}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span className="text-[11px] text-neutral-500">Operation successful</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <button className="w-full mt-8 py-3 text-sm font-bold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all border border-neutral-100 border-dashed">
        View All Activity
      </button>
    </div>
  );
}
