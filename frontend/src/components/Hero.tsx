import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const heroCards = [
  {
    icon: '🏆',
    title: 'Successful Placements',
    desc: '3000+ students placed with top recruiters. Highest Package ₹18 LPA',
    featured: true,
  },
  {
    icon: '💼',
    title: 'Corporate Collaborations',
    desc: 'TCS, Infosys, Wipro, Cognizant & more',
  },
  {
    icon: '🎓',
    title: 'Career Development Programs',
    desc: 'Full Stack, Data Science, Aptitude & Soft Skills',
  },
  {
    icon: '📊',
    title: 'Mock Interviews',
    desc: '200+ sessions by industry experts',
  },
  {
    icon: '📅',
    title: 'Upcoming Events',
    desc: 'Explore more opportunities here',
    link: '/upcoming-events',
  },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScroll = (id: string) => {
    const el = document.querySelector(id) as HTMLElement | null

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bgGrid} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <div className={styles.inner}>
        {/* Left Section */}
        <div className={styles.left}>
          <div
            className={`${styles.badge} fade-up ${mounted ? 'visible' : ''
              }`}
          >
            <span className={styles.dot} />
            Prof. Sanjeev Patil · Training &amp; Placement Officer
          </div>

          <h1
            className={`${styles.title} fade-up stagger-1 ${mounted ? 'visible' : ''
              }`}
          >
            Empowering Futures &amp;
            <br />
            <span className={styles.highlight}>
              Building Industry Connections
            </span>
          </h1>

          <h2
            className={`${styles.subHeading} fade-up stagger-2 ${mounted ? 'visible' : ''
              }`}
          >
            Training &amp; Placement Officer – Bridging Talent with
            Opportunity
          </h2>

          <p
            className={`${styles.subtitle} fade-up stagger-3 ${mounted ? 'visible' : ''
              }`}
          >
            Driving student success through industry-aligned training,
            strategic partnerships, and career-focused mentorship.
          </p>

          <div
            className={`${styles.actions} fade-up stagger-4 ${mounted ? 'visible' : ''
              }`}
          >
            <a
              href="#programs"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault()
                handleScroll('#programs')
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 1L15 8L8 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="1"
                  y1="8"
                  x2="15"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Explore Opportunities
            </a>

            <a
              href="#contact"
              className="btn-ghost"
              onClick={(e) => {
                e.preventDefault()
                handleScroll('#contact')
              }}
            >
              Register for Placement
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <div className={styles.cardGrid}>
            {heroCards.map((card, i) =>
              card.link ? (
                <Link
                  key={i}
                  to={card.link}
                  className={`${styles.card} ${styles.cardLink} fade-up ${mounted ? 'visible' : ''
                    }`}
                  style={{
                    transitionDelay: `${0.3 + i * 0.1}s`,
                  }}
                >
                  <div className={styles.cardIcon}>{card.icon}</div>

                  <div className={styles.cardContent}>
                    <h4>{card.title}</h4>
                    <p>{card.desc}</p>
                  </div>
                </Link>
              ) : (
                <div
                  key={i}
                  className={`${styles.card} ${card.featured ? styles.cardFeatured : ''
                    } fade-up ${mounted ? 'visible' : ''}`}
                  style={{
                    transitionDelay: `${0.3 + i * 0.1}s`,
                  }}
                >
                  <div className={styles.cardIcon}>{card.icon}</div>

                  <div className={styles.cardContent}>
                    <h4>{card.title}</h4>
                    <p>{card.desc}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}