import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../../services/api';
import type { UpcomingEvent } from '../../types/events';
import styles from './MarqueeBar.module.css';

export default function MarqueeBar() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetchEvents({ status: 'published', limit: 10 });
        setEvents(res.data || []);
      } catch (err) {
        console.error('Failed to load marquee events:', err);
      }
    };
    loadEvents();
  }, []);

  if (events.length === 0) return null;

  // Repeat the items in the track to ensure seamless infinite looping when length is short
  const repeatedEvents = [...events, ...events, ...events];

  return (
    <div className={styles.container}>
      <div className={styles.prefix}>
        <span>Headlines</span>
      </div>
      
      <div className={styles.marqueeTrack}>
        {repeatedEvents.map((event, idx) => (
          <Link 
            key={`${event.id}-${idx}`} 
            to="/upcoming-events" 
            className={styles.headlineLink}
          >
            <span className={styles.icon}>📢</span>
            <span>{event.companyName ? `${event.companyName}: ` : ''}{event.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
