import { useEffect } from 'react'
import type { Program } from '../types'
import styles from './TrainingModal.module.css'

interface TrainingModalProps {
  program: Program | null
  onClose: () => void
}

export default function TrainingModal({ program, onClose }: TrainingModalProps) {
  // Close on ESC
  useEffect(() => {
    if (!program) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [program, onClose])

  if (!program) return null

  return (
    <div className={styles.backdrop} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={program.title}>

        {/* Header */}
        <div className={styles.header} style={{ background: program.gradient }}>
          <div className={styles.headerEmoji}>{program.icon}</div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
          <div className={styles.headerOverlay}>
            <h2>{program.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <p className={styles.description}>{program.description}</p>

          <h3 className={styles.sectionTitle}>Topics Covered</h3>
          <div className={styles.topics}>
            {program.topics.map(t => (
              <span key={t} className={styles.topicTag}>{t}</span>
            ))}
          </div>

          <h3 className={styles.sectionTitle}>What You'll Gain</h3>
          <ul className={styles.benefits}>
            {program.benefits.map(b => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        {/* Footer meta */}
        <div className={styles.metaBar}>
          <span className={styles.metaItem}>⏱ Duration: <strong>{program.duration}</strong></span>
          <span className={styles.metaItem}>👥 {program.students}+ enrolled</span>
          <span
            className={styles.tag}
            style={{ background: program.tagColor, color: program.tagTextColor }}
          >
            {program.tag}
          </span>
        </div>

      </div>
    </div>
  )
}
