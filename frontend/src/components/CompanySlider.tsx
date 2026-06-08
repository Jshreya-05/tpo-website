import { companies } from '../data'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import styles from './CompanySlider.module.css'

export default function CompanySlider() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  // Double the list for seamless infinite loop
  const doubled = [...companies, ...companies]

  return (
    <section id="companies" className={styles.section}>
      <div className="section-inner">
        <div className={`${styles.header} fade-up ${isVisible ? 'visible' : ''}`} ref={ref}>
          <div className={styles.badgeWrap}>
            <div className={styles.badge}>
              <span className={styles.badgeLine} />
              CORPORATE NETWORK &amp; PARTNERSHIPS
            </div>
          </div>
          <h2 className={styles.sectionTitle}>
            Partnering with Industry Leaders
          </h2>

          <div className={`${styles.statsRow} fade-up stagger-1 ${isVisible ? 'visible' : ''}`}>
            <div className={styles.statItem}>
              <strong>47+</strong>
              <span>Companies</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <strong>1200+</strong>
              <span>Placements</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <strong>18 LPA</strong>
              <span>Highest Package</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width slider */}
      <div className={`${styles.sliderWrap} fade-up stagger-3 ${isVisible ? 'visible' : ''}`}>
        <div className={styles.track}>
          {doubled.map((name, i) => (
            <div key={i} className={styles.logoItem}>
              <div className={styles.logoInner}>{name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
