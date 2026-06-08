import { contactInfo } from '../data'
import BrandLogo from './BrandLogo'
import styles from './Footer.module.css'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const footerLinks: Record<string, FooterLink[]> = {
  'Quick Links': [
    { label: 'Home', href: '#hero' },
    { label: 'Training Programs', href: '#programs' },
    { label: 'Recruiters', href: '#companies' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Placement Process', href: '#timeline' },
  ],
  Resources: [
    { label: 'Aptitude Study Material', href: '#resources' },
    { label: 'Resume Templates', href: '#resources' },
    { label: 'Interview Guide', href: '#resources' },
    { label: 'T&P Brochure', href: '#resources' },
  ],
  Contact: [
    { label: contactInfo.phones[0], href: `tel:${contactInfo.phones[0]}` },
    { label: contactInfo.phones[1], href: `tel:${contactInfo.phones[1]}` },
    { label: contactInfo.officePhone, href: 'tel:02162230636' },
    { label: contactInfo.emails[0], href: `mailto:${contactInfo.emails[0]}` },
    { label: 'www.kbpcoes.edu.in', href: contactInfo.website, external: true },
  ],
}

export default function Footer() {
  const scroll = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <BrandLogo variant="light" />
            <p className={styles.desc}>
              {contactInfo.college}. Official Training and Placement portal led by{' '}
              {contactInfo.name}, committed to bridging academia and industry.
            </p>
            <p className={styles.address}>{contactInfo.address}</p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className={styles.col}>
              <h6>{title}</h6>
              <ul>
                {links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    ) : l.href.startsWith('tel:') || l.href.startsWith('mailto:') ? (
                      <a href={l.href}>{l.label}</a>
                    ) : (
                      <a
                        href={l.href}
                        onClick={(e) => {
                          e.preventDefault()
                          scroll(l.href)
                        }}
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {contactInfo.college} — Training &amp; Placement Office.
            All rights reserved.
          </p>
          <div className={styles.socials}>
            {[
              { label: 'LinkedIn', symbol: 'in' },
              { label: 'Twitter', symbol: '𝕏' },
              { label: 'YouTube', symbol: '▶' },
              { label: 'Instagram', symbol: '◈' },
            ].map((s) => (
              <a key={s.label} href="#" className={styles.socialLink} aria-label={s.label}>
                {s.symbol}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
