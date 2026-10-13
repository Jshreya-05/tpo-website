import { useEffect, useState } from 'react'
import TrainingCard from './TrainingCard'
import { fetchPrograms } from '../services/api'
import { PROGRAM_DEPARTMENTS } from '../constants/departments'
import type { Program } from '../types/programs'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import styles from './Programs.module.css'

export default function Programs() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [department, setDepartment] = useState('all')
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetchPrograms({
          limit: 100,
          department: department === 'all' ? undefined : department,
        })
        if (active) setPrograms(res.data || [])
      } catch {
        if (active) {
          setPrograms([])
          setError('Unable to load programs. Please try again.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [department])

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

        <div className={styles.filters} role="tablist" aria-label="Filter programs by department">
          <button
            type="button"
            role="tab"
            aria-selected={department === 'all'}
            className={`${styles.filterChip} ${department === 'all' ? styles.filterChipActive : ''}`}
            onClick={() => setDepartment('all')}
          >
            All Departments
          </button>
          {PROGRAM_DEPARTMENTS.map((item) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={department === item.slug}
              className={`${styles.filterChip} ${department === item.slug ? styles.filterChipActive : ''}`}
              onClick={() => setDepartment(item.slug)}
            >
              {item.shortLabel}
            </button>
          ))}
        </div>

        {loading && <p className={styles.status}>Loading programs...</p>}
        {!loading && error && <p className={styles.statusError}>{error}</p>}
        {!loading && !error && programs.length === 0 && (
          <p className={styles.status}>No programs found for this department.</p>
        )}

        {!loading && !error && programs.length > 0 && (
          <div className={styles.grid}>
            {programs.map((p, i) => (
              <TrainingCard
                key={p.id || p._id || p.slug}
                program={p}
                animClass={`fade-up ${isVisible ? 'visible' : ''} stagger-${(i % 6) + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
