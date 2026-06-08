import { useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './About.module.css'
import Navbar from '../../components/Navbar'
import BrandLogo from '../../components/BrandLogo'
import { contactInfo } from '../../data'
import tpoPortrait from '../../assets/tpo-portrait.svg'

const cardData = [
  {
    title: 'Our Vision',
    description:
      'To create globally competent professionals by empowering students with career opportunities, industry exposure, and strong placement support.'
  },
  {
    title: 'Our Mission',
    description:
      'To provide continuous training, placement assistance, skill development programs, and strong corporate interaction for student success.'
  },
  {
    title: 'What We Do',
    description:
      'Skill Development, Resume Building, Mock Interviews, Campus Recruitment, Industry Collaborations, Internships, Corporate Training, Career Guidance.'
  }
]

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.aboutPage}>
      <Navbar />
      <div className={styles.bgGlow} />

      <section className={styles.section}>
        <div className="section-inner">
          <motion.div
            className={styles.aboutGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <motion.div
              className={styles.aboutContent}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className={styles.sectionLabel}>Training and Placement Cell</span>
              <h1 className={styles.mainTitle}>Message from the Training and Placement Officer</h1>
              <h2 className={styles.tpoName}>Prof. Sanjeev V. Patil</h2>
              <p className={styles.tpoMeta}>M.B.A. (HR) & M.Tech. (DE)</p>
              <p className={styles.tpoMeta}>Training and Placement Officer</p>
              <p>
                He leads the Training and Placement Cell with strong focus on student career development,
                industry readiness, placement drives, internships, skill development, resume building, mock
                interviews, and strong corporate connections.
              </p>
              <motion.a
                href="mailto:tpo@kbpcoes.edu.in"
                className={styles.ctaButton}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Connect With TPO
              </motion.a>
            </motion.div>

            <motion.div
              className={styles.portraitCard}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src={tpoPortrait}
                alt="Prof. Sanjeev V. Patil, Training and Placement Officer"
                className={styles.portraitImage}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="section-inner">
          <motion.div
            className={styles.cardsSection}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {cardData.map((card, index) => (
              <motion.article
                key={card.title}
                className={styles.infoCard}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className={styles.compactFooter}>
        <div className={`section-inner ${styles.footerInner}`}>
          <div>
            <BrandLogo variant="light" />
            <p>{contactInfo.college}</p>
          </div>
          <div className={styles.footerDetails}>
            <p>Address: {contactInfo.address}</p>
            <p>
              Office:{' '}
              <a href="tel:02162230636">{contactInfo.officePhone}</a>
            </p>
            <p>
              Mobile:{' '}
              <a href={`tel:${contactInfo.phones[0]}`}>{contactInfo.phones[0]}</a> /{' '}
              <a href={`tel:${contactInfo.phones[1]}`}>{contactInfo.phones[1]}</a>
            </p>
            <p>
              Email:{' '}
              <a href={`mailto:${contactInfo.emails[0]}`}>{contactInfo.emails[0]}</a> |{' '}
              <a href={`mailto:${contactInfo.emails[1]}`}>{contactInfo.emails[1]}</a>
            </p>
            <p>
              Website:{' '}
              <a href={contactInfo.website} target="_blank" rel="noreferrer">
                www.kbpcoes.edu.in
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
