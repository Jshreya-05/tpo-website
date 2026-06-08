import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchFeaturedActivities, getCloudinaryUrl } from '../../services/api';
import type { Activity } from '../../types/activities';
import styles from './FeaturedActivities.module.css';

export default function FeaturedActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await fetchFeaturedActivities();
        setActivities(res.data);
      } catch (err) {
        console.error('Failed to fetch highlights', err);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  if (loading || activities.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="section-inner">
        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.label}>Excellence in Action</span>
            <h2 className={styles.title}>Top Placement <span className={styles.gold}>Highlights</span></h2>
            <p className={styles.subtitle}>
              Recent milestone achievements and corporate drives that define our placement success.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/#activities" className={styles.viewAllBtn}>
              View Full Gallery <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className={styles.grid}>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className={styles.imageContainer}>
                <img
                  src={getCloudinaryUrl(activity.images[0], 800)}
                  alt={activity.title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.categoryBadge}>{activity.category}</div>
              </div>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.date}>
                    <Calendar size={14} /> {new Date(activity.eventDate).toLocaleDateString([], { month: 'short', year: 'numeric' })}
                  </span>
                  {activity.companyName && (
                    <span className={styles.company}>🏢 {activity.companyName}</span>
                  )}
                </div>
                <h3 className={styles.cardTitle}>{activity.title}</h3>
                <p className={styles.description}>
                  {activity.description.length > 120
                    ? `${activity.description.substring(0, 120)}...`
                    : activity.description}
                </p>
                <div className={styles.footer}>
                  <Link to="/#activities" className={styles.detailsLink}>
                    Details <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
