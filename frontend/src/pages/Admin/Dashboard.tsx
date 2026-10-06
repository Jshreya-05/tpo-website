import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Image as ImageIcon,
  MessageSquare,
  CalendarDays,
  Users,
  Mail,
  Settings,
  ArrowRight,
} from 'lucide-react';
import {
  fetchGalleryStats,
  fetchEvents,
  fetchRegistrations,
  fetchContactSubmissions,
  fetchTestimonials,
} from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import styles from './Dashboard.module.css';

const modules = [
  { title: 'Gallery Management', desc: 'Upload and organize campus activity photos.', icon: ImageIcon, path: '/admin/gallery', color: '#3b82f6' },
  { title: 'Testimonials', desc: 'Manage alumni success stories.', icon: MessageSquare, path: '/admin/testimonials', color: '#8b5cf6' },
  { title: 'Upcoming Events', desc: 'Create drives, workshops, and seminars.', icon: CalendarDays, path: '/admin/events', color: '#10b981' },
  { title: 'Student Registrations', desc: 'View student placement registrations.', icon: Users, path: '/admin/registrations', color: '#f59e0b' },
  { title: 'Contact Submissions', desc: 'Review recruiter and enquiry forms.', icon: Mail, path: '/admin/contacts', color: '#ef4444' },
  { title: 'Website Settings', desc: 'Toggle cursor, marquee, and animations.', icon: Settings, path: '/admin/settings', color: '#06b6d4' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    gallery: 0,
    events: 0,
    registrations: 0,
    contacts: 0,
    testimonials: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [galleryRes, eventsRes, regRes, contactRes, testRes] = await Promise.all([
          fetchGalleryStats(),
          fetchEvents({ status: 'all', limit: 1 }),
          fetchRegistrations({ limit: 1 }),
          fetchContactSubmissions({ limit: 1 }),
          fetchTestimonials(),
        ]);
        setStats({
          gallery: galleryRes.data?.totalImages || 0,
          events: eventsRes.total || 0,
          registrations: regRes.total || 0,
          contacts: contactRes.total || 0,
          testimonials: testRes.data?.length || 0,
        });
      } catch {
        /* keep defaults */
      }
    };
    load();
  }, []);

  const statCards = [
    { label: 'Gallery Images', value: stats.gallery },
    { label: 'Upcoming Events', value: stats.events },
    { label: 'Registrations', value: stats.registrations },
    { label: 'Contact Forms', value: stats.contacts },
    { label: 'Testimonials', value: stats.testimonials },
  ];

  return (
    <div className={styles.hub}>
      <header className={styles.hubHeader}>
        <div>
          <h1 className={styles.hubTitle}>Admin Dashboard</h1>
          <p className={styles.hubSubtitle}>Manage your Training & Placement portal from one place.</p>
        </div>
      </header>

      <div className={styles.statRow}>
        {statCards.map((s) => (
          <div key={s.label} className={styles.statPill}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.moduleGrid}>
        {modules
          .filter((mod) => mod.path !== '/admin/settings' || user?.role === 'admin')
          .map((mod) => {
          const Icon = mod.icon;
          return (
            <button
              key={mod.path}
              type="button"
              className={styles.moduleCard}
              onClick={() => navigate(mod.path)}
            >
              <div className={styles.moduleIcon} style={{ background: `${mod.color}22`, color: mod.color }}>
                <Icon size={22} />
              </div>
              <div className={styles.moduleBody}>
                <h3>{mod.title}</h3>
                <p>{mod.desc}</p>
              </div>
              <ArrowRight size={18} className={styles.moduleArrow} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
