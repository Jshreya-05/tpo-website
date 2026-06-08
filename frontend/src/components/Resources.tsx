import { resources } from '../data'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import styles from './Resources.module.css'

export default function Resources() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section id="resources" className={styles.section}>
      <div className="section-inner">
        <div
          className={`${styles.header} fade-up ${isVisible ? 'visible' : ''}`}
          ref={ref}
        >
          <span className="section-label">TPO Recommended</span>
          <h2 className="section-title">Learning Resources</h2>
          <p className="section-subtitle">
            Access Training and Placement Officer approved resources for aptitude,
            resumes, interview preparation, coding, and campus updates.
          </p>
        </div>

        <div className={styles.grid}>
          {resources.map((r, i) => (
            <a
              key={r.title}
              className={`${styles.card} fade-up ${isVisible ? 'visible' : ''} stagger-${(i % 6) + 1}`}
              href={r.path}
              {...(r.path.startsWith('/documents/') ? { download: true } : {})}
              {...(r.path.startsWith('http://') || r.path.startsWith('https://')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <div className={styles.icon} style={{ background: r.bg }}>
                {r.icon}
              </div>
              <div className={styles.body}>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
                <span className={styles.badge}>{r.badge}</span>
                <span className={styles.provider}>Offered by TPO Cell</span>
              </div>
              <div className={styles.arrow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
