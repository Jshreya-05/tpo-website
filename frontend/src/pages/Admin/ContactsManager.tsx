import { useEffect, useState } from 'react';
import { Search, Trash2, Mail, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { fetchContactSubmissions, deleteContactSubmission } from '../../services/api';
import type { ContactSubmission } from '../../types/registrations';
import styles from './ContactsManager.module.css';

export default function ContactsManager() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<ContactSubmission | null>(null);

  const loadData = async () => {
    try {
      const res = await fetchContactSubmissions({ limit: 500, search: searchTerm || undefined });
      setContacts(res.data || []);
    } catch {
      toast.error('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(loadData, 300);
    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteContactSubmission(deleteTarget.id || deleteTarget._id);
      toast.success('Submission removed');
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
          <h1 className={styles.title}><Mail size={28} /> Contact Submissions</h1>
          <p className={styles.subtitle}>Recruiter and general enquiry form submissions.</p>
        </div>
        <span className={styles.count}>{contacts.length} total</span>
      </header>

      <div className={styles.searchWrap}>
        <Search size={16} />
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className={styles.empty}>Loading submissions...</p>
      ) : (
        <div className={styles.list}>
          {contacts.map((contact) => (
            <article key={contact.id || contact._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h3>{contact.name}</h3>
                  <p>{contact.role}{contact.org ? ` · ${contact.org}` : ''}</p>
                </div>
                {isAdmin && (
                  <button type="button" className={styles.deleteBtn} onClick={() => setDeleteTarget(contact)}>
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
              <div className={styles.meta}>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                {contact.phone && <a href={`tel:${contact.phone}`}>{contact.phone}</a>}
                <span>{new Date(contact.createdAt).toLocaleString('en-IN')}</span>
              </div>
              {contact.message && <p className={`${styles.message} text-justify`}>{contact.message}</p>}
            </article>
          ))}
          {contacts.length === 0 && <p className={styles.empty}>No contact submissions yet.</p>}
        </div>
      )}

      <AnimatePresence>
        {deleteTarget && (
          <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modal} initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <AlertTriangle size={32} color="#f59e0b" />
              <h3>Delete Submission?</h3>
              <p>Remove submission from {deleteTarget.name}?</p>
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
