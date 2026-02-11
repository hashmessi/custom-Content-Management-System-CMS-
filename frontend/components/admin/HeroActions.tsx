"use client";

import React, { useState } from 'react';
import { Trash, Check, X, Loader2 } from 'lucide-react';
import { deleteHeroSlide, toggleHeroSlideActive } from '@/lib/api';
import { useRouter } from 'next/navigation';

export const DeleteHeroButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    setLoading(true);
    try {
      await deleteHeroSlide(id);
      router.refresh();
    } catch (error) {
      alert('Failed to delete slide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4" />}
    </button>
  );
};

export const ToggleHeroButton = ({ id, isActive }: { id: string, isActive: boolean }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleHeroSlideActive(id);
      router.refresh();
    } catch (error) {
      alert('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
        isActive 
          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {loading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : isActive ? (
        <Check className="w-3 h-3" />
      ) : (
        <X className="w-3 h-3" />
      )}
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
};
