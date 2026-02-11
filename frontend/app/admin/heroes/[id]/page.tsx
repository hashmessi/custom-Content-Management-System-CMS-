import React from 'react';
import HeroSlideForm from '@/components/admin/HeroSlideForm';
import { fetchAPI } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function EditHeroPage({ params }: { params: { id: string } }) {
  let slide = null;
  try {
    const res = await fetchAPI(`/hero-slides/${params.id}`);
    slide = res;
  } catch (error) {
    console.error(error);
  }

  if (!slide) {
    notFound();
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        <HeroSlideForm initialData={slide} isEdit />
      </div>
    </div>
  );
}
