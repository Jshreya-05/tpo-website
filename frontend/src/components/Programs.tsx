import { programs } from '../data'
import TrainingCard from './TrainingCard'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import styles from './Programs.module.css'

export default function Programs() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section id="programs" className={styles.section}>
      <div className="section-inner">
        <div className={`${styles.header} fade-up ${isVisible ? 'visible' : ''}`} ref={ref}>
          <span className="section-label">Training Programs</span>
          <h2 className="section-title">Industry-Ready Skill Development</h2>
          <p className="section-subtitle">
            Comprehensive training programs designed with industry experts to prepare
            you for campus placements and beyond.
          </p>
        </div>

        <div className={styles.grid}>
          {programs.map((p, i) => (
            <TrainingCard
              key={p.id}
              program={p}
              animClass={`fade-up ${isVisible ? 'visible' : ''} stagger-${(i % 6) + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
