import { useState } from 'react'
import toast from 'react-hot-toast'
import { contactInfo } from '../data'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { createRegistration, createContactSubmission } from '../services/api'
import styles from './ContactForm.module.css'

interface FormState {
  name: string
  email: string
  phone: string
  role: string
  org: string
  message: string
}

const initialForm: FormState = {
  name: '', email: '', phone: '', role: '', org: '', message: ''
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.role) {
      toast.error('Please fill in name, email, and role.')
      return
    }

    setSubmitting(true)
    try {
      const isStudent = form.role.includes('Student')
      
      if (isStudent) {
        if (!form.phone || !form.org) {
          toast.error('Phone number and Department are required for student registration.')
          setSubmitting(false)
          return
        }
        await createRegistration({
          name: form.name,
          email: form.email,
          phone: form.phone,
          branch: form.org,
          year: form.role
        })
        toast.success('✓ Placement Registration Submitted!')
      } else {
        await createContactSubmission({
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          org: form.org,
          message: form.message
        })
        toast.success('✓ Enquiry Submitted Successfully!')
      }

      setSubmitted(true)
      setForm(initialForm)
      setTimeout(() => {
        setSubmitted(false)
      }, 4000)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <div className={`fade-up ${isVisible ? 'visible' : ''}`}>
          <span className="section-label section-label--light">Get In Touch</span>
          <h2 className="section-title section-title--light">
            Connect with Our<br />Placement Cell
          </h2>
          <p className={`section-subtitle section-subtitle--light text-justify`}>
            Whether you&apos;re a student, recruiter, or industry partner, we&apos;re here
            to help you navigate the placement process.
          </p>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>👤</div>
              <div>
                <h5>{contactInfo.name}</h5>
                <p>{contactInfo.designation}</p>
                <p>{contactInfo.college}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📍</div>
              <div>
                <h5>Address</h5>
                <p className="text-justify">{contactInfo.address}</p>
              </div>
            </div>
          </div>

          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>📞</div>
              <h5>Phone</h5>
              {contactInfo.phones.map((phone) => (
                <a key={phone} href={`tel:${phone}`} className={styles.infoLink}>{phone}</a>
              ))}
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>📧</div>
              <h5>Email</h5>
              {contactInfo.emails.map((email) => (
                <a key={email} href={`mailto:${email}`} className={styles.infoLink}>{email}</a>
              ))}
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>🌐</div>
              <h5>Website</h5>
              <a
                href={contactInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                www.kbpcoes.edu.in
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>⏰</div>
              <h5>Office Hours</h5>
              <p>Monday – Saturday</p>
              <p>10:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className={`${styles.formCard} fade-up ${isVisible ? 'visible' : ''} stagger-2`}>
          <h3 className={styles.formTitle}>Student / Recruiter Registration</h3>

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
              </div>
              <div className={styles.field}>
                <label htmlFor="role">I am a</label>
                <select id="role" name="role" value={form.role} onChange={handleChange} required>
                  <option value="">Select…</option>
                  <option>Student (Final Year)</option>
                  <option>Student (Pre-Final Year)</option>
                  <option>HR / Recruiter</option>
                  <option>Industry Partner</option>
                </select>
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="org">Department / Company</label>
              <input id="org" name="org" type="text" placeholder="e.g. Computer Engineering / Infosys" value={form.org} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label htmlFor="message">Message (Optional)</label>
              <textarea id="message" name="message" placeholder="Any specific query or requirement…" value={form.message} onChange={handleChange} rows={3} />
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} ${submitted ? styles.submitted : ''}`}
              disabled={submitted || submitting}
            >
              {submitting ? 'Submitting...' : submitted ? '✓ Registration Submitted!' : 'Submit Registration'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
