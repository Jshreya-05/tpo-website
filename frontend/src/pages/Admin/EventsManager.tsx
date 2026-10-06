import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, CalendarDays, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { fetchEvents, deleteEvent } from '../../services/api';
import type { UpcomingEvent } from '../../types/events';
import styles from './EventsManager.module.css';

const EVENT_TYPES = [
  'All Types',
  'Placement Drive',
  'Internship',
  'Workshop',
  'Hackathon',
  'Seminar',
  'Industry Visit',
  'Training Program',
];

export default function EventsManager() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All Types');
  const [deleteTarget, setDeleteTarget] = useState<UpcomingEvent | null>(null);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await fetchEvents({ status: 'all', limit: 1000, search: searchTerm || undefined });
      setEvents(res.data || []);
    } catch {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(loadData, 300);
    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  const filtered = events.filter((event) => {
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesCategory =
      categoryFilter === 'All Types' || event.eventType === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteEvent(deleteTarget.id || deleteTarget._id);
      toast.success('Event deleted');
      setDeleteTarget(null);
      loadData();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Upcoming Events</h1>
          <p className={styles.subtitle}>Create and manage placement drives, workshops, and campus events.</p>
        </div>
        <button type="button" className={styles.createBtn} onClick={() => navigate('/admin/events/create')}>
          <Plus size={18} /> Create Event
        </button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {loading ? (
        <p className={styles.empty}>Loading events...</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((event) => (
            <article key={event.id || event._id} className={styles.card}>
              <div className={styles.cardTop}>
                {event.image ? (
                  <img src={event.image} alt={event.title} className={styles.thumb} />
                ) : (
                  <div className={styles.thumbPlaceholder}><CalendarDays size={24} /></div>
                )}
                <div>
                  <span className={styles.badge}>{event.eventType || 'Event'}</span>
                  <h3>{event.title}</h3>
                  <p>{event.companyName}</p>
                </div>
              </div>
              <div className={styles.meta}>
                <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                <span className={styles[`status_${event.status}`]}>{event.status}</span>
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={() => navigate(`/admin/events/edit/${event.id || event._id}`)}>
                  <Edit size={16} /> Edit
                </button>
                {isAdmin && (
                  <button type="button" className={styles.deleteBtn} onClick={() => setDeleteTarget(event)}>
                    <Trash2 size={16} /> Delete
                  </button>
                )}
              </div>
            </article>
          ))}
          {filtered.length === 0 && <p className={styles.empty}>No events found.</p>}
        </div>
      )}

      <AnimatePresence>
        {deleteTarget && (
          <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modal} initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <AlertTriangle size={32} color="#f59e0b" />
              <h3>Delete Event?</h3>
              <p>Remove &quot;{deleteTarget.title}&quot; permanently?</p>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button type="button" className={styles.confirmDelete} onClick={handleDelete}>Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
