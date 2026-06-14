import { testimonials } from '../data'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section id="testimonials" className={styles.section}>
      <div className="section-inner">
        <div
          className={`${styles.header} fade-up ${isVisible ? 'visible' : ''}`}
          ref={ref}
        >
          <span className="section-label section-label--light">Alumni Speaks</span>
          <h2 className="section-title section-title--light">Success Stories</h2>
          <p className="section-subtitle section-subtitle--light">
            Hear from our placed students about their journey from college to their dream companies.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`${styles.card} fade-up ${isVisible ? 'visible' : ''} stagger-${(i % 6) + 1}`}
            >
              <span className={styles.quote}>"</span>
              <p className={`${styles.text} text-justify`}>{t.text}</p>
              <div className={styles.divider} />
              <div className={styles.author}>
                <div className={styles.avatar}>{t.initials}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>
                    {t.role} · <span className={styles.company}>{t.company}</span>
                  </div>
                  <div className={styles.meta}>{t.batch} · {t.pkg}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
