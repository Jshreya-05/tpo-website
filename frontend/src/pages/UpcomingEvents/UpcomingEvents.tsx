import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Award, FileText, ExternalLink, Inbox } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchEvents } from '../../services/api';
import type { UpcomingEvent } from '../../types/events';
import styles from './UpcomingEvents.module.css';

export default function UpcomingEvents() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadEvents = async () => {
      try {
        const res = await fetchEvents({ status: 'published' });
        setEvents(res.data || []);
      } catch (err) {
        console.error('Failed to load upcoming events', err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isDeadlinePassed = (deadlineStr: string) => {
    return new Date(deadlineStr).getTime() < new Date().getTime();
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.bgGlow} />

      <div className="section-inner">
        <header className={styles.header}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>Opportunity Knocks</span>
            <h1 className={styles.title}>
              Upcoming <span className={styles.gold}>Events &amp; Drives</span>
            </h1>
            <p className={styles.subtitle}>
              Explore and register for upcoming campus placement drives, technical bootcamps, and career seminars.
            </p>
          </motion.div>
        </header>

        {loading ? (
          <div className={styles.loader}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(200, 151, 58, 0.2)', borderTopColor: 'var(--gold)', animation: 'shine 1.5s linear infinite' }} />
            <p>Loading opportunities...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {events.map((event, index) => {
              const hasRegLink = !!event.registrationLink;
              const hasFormLink = !!event.googleFormLink;
              const closed = isDeadlinePassed(event.deadline);

              return (
                <motion.article
                  key={event.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={styles.imageContainer}>
                    {event.image ? (
                      <img src={event.image} alt={event.title} className={styles.image} />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <Award className={styles.placeholderIcon} size={48} />
                        <span className={styles.placeholderText}>{event.companyName}</span>
                      </div>
                    )}
                    <span
                      className={styles.statusBadge}
                      style={{ background: closed ? '#ef4444' : '#10b981' }}
                    >
                      {closed ? 'Closed' : 'Active'}
                    </span>
                  </div>

                  <div className={styles.content}>
                    <span className={styles.company}>{event.companyName}</span>
                    <h3 className={styles.cardTitle}>{event.title}</h3>

                    <div className={styles.detailsList}>
                      <div className={styles.detailItem}>
                        <Calendar size={16} className={styles.detailIcon} />
                        <div>
                          <strong>Event Date:</strong> {formatDate(event.eventDate)}
                        </div>
                      </div>

                      <div className={styles.detailItem}>
                        <Clock size={16} className={styles.detailIcon} />
                        <div style={{ color: closed ? '#f87171' : 'inherit' }}>
                          <strong>Deadline:</strong> {formatDate(event.deadline)} {closed && '(Passed)'}
                        </div>
                      </div>

                      <div className={styles.detailItem}>
                        <Award size={16} className={styles.detailIcon} />
                        <div>
                          <strong>Eligibility:</strong> {event.eligibilityCriteria}
                        </div>
                      </div>
                    </div>

                    <p className={`${styles.desc} text-justify`}>{event.description}</p>

                    <div
                      className={`${styles.actions} ${
                        hasRegLink && hasFormLink ? styles.actionsDual : ''
                      }`}
                    >
                      {hasFormLink && (
                        <a
                          href={closed ? undefined : event.googleFormLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.formBtn}
                          style={{
                            opacity: closed ? 0.5 : 1,
                            pointerEvents: closed ? 'none' : 'auto',
                          }}
                        >
                          Google Form
                        </a>
                      )}
                      
                      {hasRegLink ? (
                        <a
                          href={closed ? undefined : event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.applyBtn}
                          style={{
                            opacity: closed ? 0.5 : 1,
                            pointerEvents: closed ? 'none' : 'auto',
                          }}
                        >
                          Apply Link <ExternalLink size={14} />
                        </a>
                      ) : (
                        <a
                          href={closed ? undefined : event.googleFormLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.applyBtn}
                          style={{
                            opacity: closed ? 0.5 : 1,
                            pointerEvents: closed ? 'none' : 'auto',
                          }}
                        >
                          Apply Now
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}

            {events.length === 0 && (
              <div className={styles.emptyState}>
                <Inbox className={styles.emptyIcon} size={48} />
                <h3>No Upcoming Events</h3>
                <p style={{ marginTop: '0.5rem' }}>
                  There are no scheduled training programs or placement drives at the moment. Please check back later.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: '5rem' }}>
        <Footer />
      </div>
    </div>
  );
}
