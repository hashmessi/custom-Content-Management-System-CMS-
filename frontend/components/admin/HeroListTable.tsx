"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Plus } from 'lucide-react';
import { DeleteHeroButton, ToggleHeroButton } from '@/components/admin/HeroActions';

interface HeroSlide {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  isActive: boolean;
}

interface HeroListTableProps {
  slides: HeroSlide[];
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

export default function HeroListTable({ slides }: HeroListTableProps) {
  if (slides.length === 0) {
    return (
      <div className="px-6 py-16 text-center text-gray-500">
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 bg-gray-50 rounded-full">
            <Plus className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-lg font-medium">No slides found</p>
          <p className="text-sm">Create your first hero slide to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Preview</th>
            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Content</th>
            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
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
            {slides.map((slide) => (
              <motion.tr 
                key={slide._id} 
                variants={item}
                exit={{ opacity: 0, x: -20 }}
                className="hover:bg-gray-50 transition-colors group"
                layout
              >
                <td className="px-6 py-4 w-32">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-14 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shadow-sm"
                  >
                    {slide.imageUrl ? (
                      <Image src={slide.imageUrl} alt={slide.title} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-gray-400">No Img</div>
                    )}
                  </motion.div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{slide.title}</div>
                  <div className="text-gray-500 text-sm truncate max-w-xs mt-0.5">{slide.subtitle}</div>
                </td>
                <td className="px-6 py-4">
                  <ToggleHeroButton id={slide._id} isActive={slide.isActive} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/admin/heroes/${slide._id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <DeleteHeroButton id={slide._id} />
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
