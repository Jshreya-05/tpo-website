import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '/about', isRoute: true },
  { label: 'Programs', href: '#programs' },
  { label: 'Recruiters', href: '#companies' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Process', href: '#timeline' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNavClick = (href: string, isRoute?: boolean) => {
    setMenuOpen(false)
    if (isRoute) return

    if (isHome) {
      scrollToSection(href)
    } else {
      navigate(`/${href}`)
    }
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link
          to="/"
          className={styles.logo}
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              scrollToSection('#hero')
            }
          }}
        >
          <BrandLogo />
        </Link>

        <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
          {navLinks.map((l) => (
            <li key={l.label}>
              {l.isRoute ? (
                <Link
                  to={l.href}
                  className={location.pathname === l.href ? styles.active : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  href={isHome ? l.href : `/${l.href}`}
                  className={l.label === 'Contact' ? styles.contactLink : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(l.href)
                  }}
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <button
          className={styles.toggle}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ''}`} />
        </button>
      </div>
    </nav>
  )
}
