import {
  Brain,
  Calculator,
  Code2,
  ExternalLink,
  MessageSquare,
  Mic,
  Presentation,
} from 'lucide-react'
import type { Program } from '../types'
import type { LucideIcon } from 'lucide-react'
import styles from './TrainingCard.module.css'

const programIcons: Record<string, LucideIcon> = {
  fullstack: Code2,
  communication: MessageSquare,
  datascience: Brain,
  aptitude: Calculator,
  mockinterview: Mic,
  experttalks: Presentation,
}

interface TrainingCardProps {
  program: Program
  animClass?: string
}

export default function TrainingCard({ program, animClass = '' }: TrainingCardProps) {
  const Icon = programIcons[program.id] || Code2

  return (
    <a
      href={program.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${animClass}`}
      aria-label={`Open ${program.title} in a new tab`}
    >
      <div className={styles.imageWrap}>
        <div className={styles.imagePlaceholder} style={{ background: program.gradient }}>
          <Icon className={styles.imageIcon} size={36} strokeWidth={1.75} />
        </div>
      </div>

      <div className={styles.body}>
        <span
          className={styles.tag}
          style={{ background: program.tagColor, color: program.tagTextColor }}
        >
          {program.tag}
        </span>

        <h3 className={styles.title}>{program.title}</h3>
        <p className={styles.desc}>{program.shortDesc}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#9CA3AF" strokeWidth="1.3" />
              <path d="M7 4v3l2 2" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {program.duration}
          </span>

          <span className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="5" cy="4" r="2.5" stroke="#9CA3AF" strokeWidth="1.3" />
              <path d="M1 12c0-2.2 1.8-4 4-4h1" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="10" cy="7" r="2.5" stroke="#9CA3AF" strokeWidth="1.3" />
              <path d="M7 12c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {program.students}+ students
          </span>

          <span className={styles.cta}>
            Visit Program
            <ExternalLink size={14} />
          </span>
        </div>
      </div>
    </a>
  )
}
