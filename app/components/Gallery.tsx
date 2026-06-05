'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ImageIcon, Loader2 } from 'lucide-react';
import { fetchGallery, type GalleryItem } from '../lib/api';
import { resolveImageUrl } from '../lib/imageUrl';

const CATEGORIES = ['All', 'General', 'Placement', 'Workshop', 'Infrastructure'] as const;

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadGallery() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchGallery();
        if (cancelled) return;

        setItems(response.data);
        const uniqueYears = [...new Set(response.data.map((item) => item.year))].sort(
          (a, b) => Number(b) - Number(a)
        );
        setYears(uniqueYears);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load gallery');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadGallery();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredItems = items.filter((item) => {
    const categoryMatch =
      selectedCategory === 'All' || item.category === selectedCategory;
    const yearMatch = selectedYear === 'All' || item.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  return (
    <section id="gallery" ref={ref} className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-40 -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-slate-700 font-bold text-sm sm:text-base inline-block mb-3 tracking-wider">
            CAMPUS GALLERY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Campus Gallery
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore photos uploaded from training sessions, workshops, and placement activities.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-600">YEAR:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="All">All</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-3 py-20 text-slate-600">
            <Loader2 className="animate-spin" size={24} />
            <span>Loading gallery...</span>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <ImageIcon className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-slate-600">{error}</p>
          </div>
        )}

        {!loading && !error && filteredItems.length === 0 && (
          <div className="text-center py-20 text-slate-600">
            No photos found for the selected filters.
          </div>
        )}

        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-200"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={resolveImageUrl(item.imageUrl)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-slate-900/90 text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {item.category}
                    </span>
                    <span className="bg-white/90 text-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {item.year}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
