import { useEffect, useState } from 'react';
import { Search, Trash2, Users, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchRegistrations, deleteRegistration } from '../../services/api';
import type { StudentRegistration } from '../../types/registrations';
import styles from './RegistrationsManager.module.css';

export default function RegistrationsManager() {
  const [registrations, setRegistrations] = useState<StudentRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<StudentRegistration | null>(null);

  const loadData = async () => {
    try {
      const res = await fetchRegistrations({ limit: 500, search: searchTerm || undefined });
      setRegistrations(res.data || []);
    } catch {
      toast.error('Failed to load registrations');
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
      await deleteRegistration(deleteTarget.id || deleteTarget._id);
      toast.success('Registration removed');
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
          <h1 className={styles.title}><Users size={28} /> Student Registrations</h1>
          <p className={styles.subtitle}>View all student placement registration submissions.</p>
        </div>
        <span className={styles.count}>{registrations.length} total</span>
      </header>

      <div className={styles.searchWrap}>
        <Search size={16} />
        <input
          type="text"
          placeholder="Search by name, email, or branch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className={styles.empty}>Loading registrations...</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Branch</th>
                <th>Year</th>
                <th>Registered On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id || reg._id}>
                  <td>{reg.name}</td>
                  <td><a href={`mailto:${reg.email}`}>{reg.email}</a></td>
                  <td><a href={`tel:${reg.phone}`}>{reg.phone}</a></td>
                  <td>{reg.branch}</td>
                  <td>{reg.year}</td>
                  <td>{new Date(reg.createdAt).toLocaleString('en-IN')}</td>
                  <td>
                    <button type="button" className={styles.deleteBtn} onClick={() => setDeleteTarget(reg)}>
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {registrations.length === 0 && <p className={styles.empty}>No registrations yet.</p>}
        </div>
      )}

      <AnimatePresence>
        {deleteTarget && (
          <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modal} initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <AlertTriangle size={32} color="#f59e0b" />
              <h3>Delete Registration?</h3>
              <p>Remove registration for {deleteTarget.name}?</p>
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
