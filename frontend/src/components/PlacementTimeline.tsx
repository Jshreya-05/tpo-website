import { timelineSteps } from '../data'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import styles from './PlacementTimeline.module.css'

export default function PlacementTimeline() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.08 })

  return (
    <section id="timeline" className={styles.section}>
      <div className="section-inner">
        <div
          className={`${styles.header} fade-up ${isVisible ? 'visible' : ''}`}
          ref={ref}
        >
          <span className="section-label" style={{ justifyContent: 'center' }}>
            Placement Process
          </span>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            How Campus Placement Works
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            A step-by-step guide through the entire placement journey from registration to offer letter.
          </p>
        </div>

        <div className={styles.wrap}>
          <div className={styles.line} />

          {timelineSteps.map((step, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={step.step}
                className={`${styles.item} ${isEven ? styles.itemReverse : ''} fade-up ${isVisible ? 'visible' : ''} stagger-${(i % 6) + 1}`}
              >
                {/* Content box */}
                <div className={`${styles.content} ${isEven ? styles.contentRight : ''}`}>
                  <div className={styles.stepLabel}>{step.step}</div>
                  <h4>{step.icon} {step.title}</h4>
                  <p className="text-justify">{step.desc}</p>
                </div>

                {/* Center node */}
                <div className={styles.node}>{step.icon}</div>

                {/* Empty side */}
                <div className={styles.empty} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
