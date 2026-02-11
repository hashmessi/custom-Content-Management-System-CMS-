"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import { API_URL } from '@/lib/api';

interface HeroSlideFormData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

interface HeroSlideFormProps {
  initialData?: {
    _id?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    isActive?: boolean;
    imageUrl?: string;
  };
  isEdit?: boolean;
}

const HeroSlideForm = ({ initialData, isEdit = false }: HeroSlideFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<HeroSlideFormData>({
    defaultValues: {
      title: initialData?.title || '',
      subtitle: initialData?.subtitle || '',
      ctaText: initialData?.ctaText || '',
      ctaLink: initialData?.ctaLink || '',
      isActive: initialData?.isActive ?? true,
    },
  });

  const onSubmit = async (data: HeroSlideFormData) => {
    if (!isEdit && !imageFile) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('subtitle', data.subtitle);
    formData.append('ctaText', data.ctaText);
    formData.append('ctaLink', data.ctaLink);
    formData.append('isActive', String(data.isActive));
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const url = isEdit 
        ? `${API_URL}/hero-slides/${initialData?._id}`
        : `${API_URL}/hero-slides`;
      
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to save slide');
      }

      router.push('/admin/heroes');
      router.refresh();
    } catch (error) {
      console.error(error);
      // alert('Something went wrong. Please try again.'); // Should use a proper toast in production
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/heroes" className="p-2.5 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-xl transition-all border border-transparent hover:border-gray-200">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-outfit text-gray-900 tracking-tight">
              {isEdit ? 'Edit Hero Slide' : 'Create Hero Slide'}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              {isEdit ? 'Update your banner content' : 'Add a new slide to the homepage slider'}
            </p>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
          <span>{isEdit ? 'Update Slide' : 'Create Slide'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Image {isEdit ? '(Optional)' : '<span className="text-red-500">*</span>'}
          </label>
          <ImageUpload 
            onChange={setImageFile} 
            previewUrl={initialData?.imageUrl} 
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="e.g. Empowering Enterprise"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <textarea
            {...register('subtitle', { required: 'Subtitle is required' })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Brief description..."
          />
          {errors.subtitle && <p className="text-red-500 text-xs mt-1">{errors.subtitle.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* CTA Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
            <input
              {...register('ctaText')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Learn More"
            />
          </div>

          {/* CTA Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
            <input
              {...register('ctaLink')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. /services"
            />
          </div>
        </div>

        {/* Active Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            {...register('isActive')}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
            Active immediately
          </label>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isEdit ? 'Update Slide' : 'Create Slide'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default HeroSlideForm;
