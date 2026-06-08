import { useState, useEffect } from 'react'
import { galleryItems } from '../data'
import type { GalleryItem } from '../types'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import styles from './GalleryGrid.module.css'

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className={styles.lightbox} onClick={onClose}>
      <button className={styles.lbClose} onClick={onClose} aria-label="Close lightbox">✕</button>
      <div
        className={styles.lbImage}
        onClick={e => e.stopPropagation()}
        style={{ background: item.gradient }}
      >
        <span className={styles.lbIcon}>{item.icon}</span>
      </div>
      <div className={styles.lbCaption}>{item.caption}</div>
    </div>
  )
}

export default function GalleryGrid() {
  const [active, setActive] = useState<GalleryItem | null>(null)
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section id="gallery" className={styles.section}>
      <div className="section-inner">
        <div
          className={`${styles.header} fade-up ${isVisible ? 'visible' : ''}`}
          ref={ref}
        >
          <span className="section-label">T&amp;P Activities</span>
          <h2 className="section-title">Campus Placement Gallery</h2>
          <p className="section-subtitle">
            Moments from placement drives, workshops, seminars, and bootcamps
            across the academic year.
          </p>
        </div>

        <div className={styles.grid}>
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              className={`${styles.item} ${i === 0 || i === 3 ? styles.wide : ''} fade-up ${isVisible ? 'visible' : ''} stagger-${(i % 6) + 1}`}
              onClick={() => setActive(item)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setActive(item)}
              aria-label={`View: ${item.caption}`}
            >
              <div className={styles.imgPlaceholder} style={{ background: item.gradient }}>
                <span className={styles.itemIcon}>{item.icon}</span>
              </div>
              <div className={styles.overlay}>
                <span className={styles.caption}>{item.caption}</span>
              </div>
              <div className={styles.zoomIcon}>⛶</div>
            </div>
          ))}
        </div>
      </div>

      {active && <Lightbox item={active} onClose={() => setActive(null)} />}
    </section>
  )
}
