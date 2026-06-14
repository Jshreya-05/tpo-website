import { companies } from '../data'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useCounter } from '../hooks/useCounter'
import styles from './CompanySlider.module.css'

export default function CompanySlider() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  // Double the list for seamless infinite loop
  const doubled = [...companies, ...companies]

  const mouCount = useCounter({ target: 300, duration: 2000, start: isVisible })
  const companiesCount = useCounter({ target: 2100, duration: 2200, start: isVisible })
  const placementsCount = useCounter({ target: 3000, duration: 2400, start: isVisible })
  const highestPkgCount = useCounter({ target: 18, duration: 2600, start: isVisible })

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
              <strong>{mouCount}</strong>
              <span>MOU Signed</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <strong>{companiesCount}+</strong>
              <span>Companies</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <strong>{placementsCount}+</strong>
              <span>Placements</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <strong>{highestPkgCount} LPA</strong>
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
