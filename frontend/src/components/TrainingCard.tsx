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
import { getDepartmentLabel } from '../constants/departments'
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
  onSelect: (program: Program) => void
  animClass?: string
}

export default function TrainingCard({ program, onSelect, animClass = '' }: TrainingCardProps) {
  const Icon = programIcons[program.slug] || programIcons[program.id || ''] || Code2

  return (
    <article className={`${styles.card} ${animClass}`}>
      <div className={styles.imageWrap}>
        <div className={styles.imagePlaceholder} style={{ background: program.gradient }}>
          {program.icon ? (
            <span className={styles.programIcon} aria-hidden="true">{program.icon}</span>
          ) : (
            <Icon className={styles.imageIcon} size={36} strokeWidth={1.75} />
          )}
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
          {program.department && (
            <span className={styles.metaItem}>{getDepartmentLabel(program.department, true)}</span>
          )}
          <span className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#9CA3AF" strokeWidth="1.3" />
              <path d="M7 4v3l2 2" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {program.duration}
          </span>

          {program.students > 0 && (
            <span className={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="5" cy="4" r="2.5" stroke="#9CA3AF" strokeWidth="1.3" />
                <path d="M1 12c0-2.2 1.8-4 4-4h1" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="10" cy="7" r="2.5" stroke="#9CA3AF" strokeWidth="1.3" />
                <path d="M7 12c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              {program.students}+ students
            </span>
          )}
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.cta} onClick={() => onSelect(program)}>
            View details
          </button>
          {program.url && (
            <a
              className={styles.externalLink}
              href={program.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open free learning resources for ${program.title} in a new tab`}
            >
              Free learning resources
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
