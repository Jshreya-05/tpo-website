import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useCounter } from '../hooks/useCounter'
import { stats } from '../data'
import type { StatItem } from '../types'
import styles from './StatsCounter.module.css'

interface StatCardProps {
  item: StatItem
  started: boolean
  index: number
}

function StatCard({ item, started, index }: StatCardProps) {
  const count = useCounter({ target: item.target, duration: 2000 + index * 100, start: started })

  const display = () => {
    if (item.suffix === ' LPA') return `${item.prefix}${count} LPA`
    if (item.suffix === 'k')   return `${item.prefix}${count}k`
    return `${item.prefix}${count.toLocaleString()}${item.suffix}`
  }

  return (
    <div className={styles.card}>
      <span className={styles.icon}>{item.icon}</span>
      <span className={styles.number}>{display()}</span>
      <span className={styles.label}>{item.label}</span>
    </div>
  )
}

export default function StatsCounter() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section id="stats" className={styles.section} ref={ref}>
      <div className={styles.grid}>
        {stats.map((item, i) => (
          <StatCard key={item.id} item={item} started={isVisible} index={i} />
        ))}
      </div>
    </section>
  )
}
