import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { fetchGalleryImages } from '../../services/api';
import styles from './ActivitiesGallery.module.css';

interface GalleryImage {
  _id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  createdAt?: string;
}

const CATEGORIES = ['All', 'General', 'Placement', 'Workshop', 'Infrastructure'];

const SkeletonCard = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonImage} />
    <div className={styles.skeletonContent}>
      <div className={styles.skeletonBadge} />
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonText} />
    </div>
  </div>
);

const ImageModal = ({ image, onClose }: { image: GalleryImage; onClose: () => void }) => (
  <motion.div
    className={styles.modalBackdrop}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className={styles.modalContent}
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.modalHeader}>
        <button className={styles.iconBtn} onClick={onClose}>
          <X size={18} />
        </button>
      </div>
      <div className={styles.carousel}>
        <img src={image.imageUrl} className={styles.carouselImg} alt={image.title} />
      </div>
      <div className={styles.modalBody}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <span className={styles.badge} style={{ backgroundColor: 'rgba(200,151,58,0.2)', color: 'var(--gold-light)' }}>
            {image.category}
          </span>
          <span className={styles.date} style={{ color: 'var(--gold-light)' }}>{image.year}</span>
        </div>
        <h2 className={styles.title} style={{ fontSize: '2rem', textAlign: 'left', marginBottom: '1rem' }}>
          {image.title}
        </h2>
      </div>
    </motion.div>
  </motion.div>
);

export default function ActivitiesGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearFn, setYearFn] = useState('All');
  const [categoryFn, setCategoryFn] = useState('All');
  const [searchFn, setSearchFn] = useState('');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);
      try {
        const res = await fetchGalleryImages({
          year: yearFn !== 'All' ? yearFn : undefined,
          category: categoryFn !== 'All' ? categoryFn : undefined,
          limit: 200
        });
        setImages(res.data || []);
      } catch (err) {
        console.error('Failed to fetch gallery images', err);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, [yearFn, categoryFn]);

  const filteredImages = useMemo(
    () => images.filter((img) => img.title.toLowerCase().includes(searchFn.toLowerCase())),
    [images, searchFn]
  );

  const yearOptions = useMemo(() => {
    const years = Array.from(new Set(images.map((img) => img.year))).sort((a, b) => Number(b) - Number(a));
    return ['All', ...years];
  }, [images]);

  const getCardHeight = (index: number) => {
    const heights = [350, 420, 380, 460, 320];
    return heights[index % heights.length];
  };

  return (
    <section id="gallery" className={styles.section}>
      <div className="section-inner" style={{ maxWidth: '100%', padding: 0 }}>
        <div className={styles.header}>
          <h2 className={styles.title}>Campus <span style={{ color: 'var(--gold)' }}>Gallery</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Explore photos uploaded from training sessions, workshops, and placement activities.
          </p>
        </div>

        <div className={styles.filtersContainer}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search image title..."
              className={styles.searchInput}
              value={searchFn}
              onChange={(e) => setSearchFn(e.target.value)}
            />
          </div>

          <div className={styles.chipGroup}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.chip} ${categoryFn === cat ? styles.chipActive : ''}`}
                onClick={() => setCategoryFn(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.chipGroup} style={{ gap: '8px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginRight: '8px', alignSelf: 'center' }}>
              YEAR:
            </span>
            {yearOptions.map((yr) => (
              <button
                key={yr}
                className={`${styles.chip} ${yearFn === yr ? styles.chipActive : ''}`}
                style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                onClick={() => setYearFn(yr)}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className={styles.masonryGrid}>
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
            ) : filteredImages.length > 0 ? (
              filteredImages.map((item, index) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={styles.cardWrapper}
                >
                  <div className={styles.card} style={{ height: getCardHeight(index) }} onClick={() => setSelectedImage(item)}>
                    <img src={item.imageUrl} alt={item.title} className={styles.cardImage} loading="lazy" />
                    <div className={styles.cardOverlay}>
                      <div className={styles.cardMeta}>
                        <span className={styles.badge} style={{ backgroundColor: 'rgba(200,151,58,0.2)', color: 'var(--gold-light)' }}>
                          {item.category}
                        </span>
                        <span className={styles.date}>{item.year}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.emptyState}>
                <div className={styles.emptyIcon}>🔍</div>
                <h3>No gallery images found</h3>
                <p>Try adjusting your filters or search terms to find what you're looking for.</p>
                <button onClick={() => { setCategoryFn('All'); setYearFn('All'); setSearchFn(''); }} className={styles.resetBtn}>
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}</AnimatePresence>
    </section>
  );
}
