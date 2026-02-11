"use client";

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', visits: 4000, posts: 24, engagement: 2400 },
  { name: 'Tue', visits: 3000, posts: 13, engagement: 2210 },
  { name: 'Wed', visits: 2000, posts: 98, engagement: 2290 },
  { name: 'Thu', visits: 2780, posts: 39, engagement: 2000 },
  { name: 'Fri', visits: 1890, posts: 48, engagement: 2181 },
  { name: 'Sat', visits: 2390, posts: 38, engagement: 2500 },
  { name: 'Sun', visits: 3490, posts: 43, engagement: 2100 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AdminChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* Analytics Overview */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Traffic Overview</h3>
            <p className="text-sm text-neutral-500">Weekly website visits</p>
          </div>
          <select className="text-sm border-none bg-neutral-50 rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer font-medium">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="visits" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorVisits)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mini Bar Chart / Engagement */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Engagement Patterns</h3>
            <p className="text-sm text-neutral-500">User interaction metrics</p>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> 2026
            </span>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}}
              />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                }} 
              />
              <Bar dataKey="engagement" radius={[6, 6, 0, 0]} barSize={32}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
