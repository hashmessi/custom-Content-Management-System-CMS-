import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getHeroSlides } from '@/lib/api';
import HeroListTable from '@/components/admin/HeroListTable';

export const dynamic = 'force-dynamic';

const HeroSlidesPage = async () => {
  const slides = await getHeroSlides() || [];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-gray-900">Hero Slides</h1>
          <p className="text-gray-500 mt-1">Manage your homepage hero slider content.</p>
        </div>
        <Link
          href="/admin/heroes/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Create Slide
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
        <HeroListTable slides={slides} />
      </div>
    </div>
  );
};

export default HeroSlidesPage;
