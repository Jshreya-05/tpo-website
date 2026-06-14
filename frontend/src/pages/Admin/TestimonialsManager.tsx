import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, MessageSquare, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  fetchTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} from '../../services/api';
import type { TestimonialItem } from '../../types/testimonials';
import styles from './TestimonialsManager.module.css';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TestimonialItem | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [batch, setBatch] = useState('');
  const [text, setText] = useState('');
  const [initials, setInitials] = useState('');
  const [pkg, setPkg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetchTestimonials();
      setTestimonials(res.data || []);
    } catch {
      toast.error('Failed to sync testimonial listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setRole('');
    setCompany('');
    setBatch('');
    setText('');
    setInitials('');
    setPkg('');
    setShowModal(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setName(item.name);
    setRole(item.role);
    setCompany(item.company);
    setBatch(item.batch);
    setText(item.text);
    setInitials(item.initials);
    setPkg(item.pkg);
    setShowModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !company || !batch || !text || !initials || !pkg) {
      return toast.error('Please complete all form fields.');
    }

    setSubmitting(true);
    const payload = { name, role, company, batch, text, initials, pkg };

    try {
      if (editingItem) {
        await updateTestimonial(editingItem.id, payload);
        toast.success('Testimonial updated!');
      } else {
        await createTestimonial(payload);
        toast.success('Testimonial added successfully!');
      }
      setShowModal(false);
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Server failed to commit feedback payload.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteTestimonial(deleteTarget.id);
      toast.success('Testimonial record deleted.');
      setDeleteTarget(null);
      loadData();
    } catch {
      toast.error('Failed to purge testimonial.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Testimonial Hub</h1>
          <p className={styles.subtitle}>Manage placement success stories and alumni feedbacks.</p>
        </div>
        <button className={styles.addBtn} onClick={openAddModal}>
          <Plus size={18} /> Add Feedback
        </button>
      </header>

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--gold)' }}>Loading Testimonials...</div>
      ) : (
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3>Alumni Testimonials ({testimonials.length})</h3>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Alumni</th>
                  <th>Company &amp; Package</th>
                  <th>Batch</th>
                  <th>Testimonial Text</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.alumniInfo}>
                        <div className={styles.avatar}>{item.initials}</div>
                        <div>
                          <span className={styles.name}>{item.name}</span>
                          <span className={styles.role}>{item.role}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.pkgInfo}>
                        <span className={styles.companyName}>🏢 {item.company}</span>
                        <span className={styles.package}>💰 {item.pkg}</span>
                      </div>
                    </td>
                    <td>{item.batch}</td>
                    <td className={styles.textCell} title={item.text}>
                      {item.text}
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} onClick={() => openEditModal(item)} title="Edit">
                          <Edit size={16} />
                        </button>
                        <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => setDeleteTarget(item)} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {testimonials.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)' }}>
                      No testimonials registered.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className={styles.modalOverlay}>
            <motion.div 
              className={styles.modalCard}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className={styles.modalHeader}>
                <h3>{editingItem ? 'Edit Testimonial' : 'New Testimonial'}</h3>
                <button className={styles.closeBtn} onClick={() => setShowModal(false)}><X size={20} /></button>
              </div>
              <hr className={styles.modalDivider} />
              
              <form onSubmit={handleFormSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Alumni Name *</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => {
                        setName(e.target.value);
                        // Auto-fill initials
                        const parts = e.target.value.trim().split(' ');
                        const init = parts.map(p => p[0]).join('').substring(0, 3).toUpperCase();
                        setInitials(init);
                      }} 
                      placeholder="e.g. Priya Deshmukh"
                      required 
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Initials *</label>
                    <input 
                      type="text" 
                      value={initials} 
                      onChange={(e) => setInitials(e.target.value.toUpperCase())} 
                      placeholder="e.g. PD"
                      maxLength={3}
                      required 
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Role / Designation *</label>
                    <input 
                      type="text" 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)} 
                      placeholder="e.g. Software Engineer"
                      required 
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Company *</label>
                    <input 
                      type="text" 
                      value={company} 
                      onChange={(e) => setCompany(e.target.value)} 
                      placeholder="e.g. TCS Digital"
                      required 
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Batch *</label>
                    <input 
                      type="text" 
                      value={batch} 
                      onChange={(e) => setBatch(e.target.value)} 
                      placeholder="e.g. B.E. CSE 2024"
                      required 
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Package Offered *</label>
                    <input 
                      type="text" 
                      value={pkg} 
                      onChange={(e) => setPkg(e.target.value)} 
                      placeholder="e.g. 7.2 LPA"
                      required 
                    />
                  </div>

                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label>Testimonial Quote / Text *</label>
                    <textarea 
                      value={text} 
                      onChange={(e) => setText(e.target.value)} 
                      placeholder="Describe placement experience, cell support details, etc..."
                      rows={4}
                      required 
                    />
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className={styles.submitBtn} disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Save Feedback'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className={styles.modalOverlay}>
            <motion.div 
              className={styles.deleteCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(244,63,94,0.1)', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <AlertTriangle size={24} />
              </div>
              <h3>Remove Testimonial</h3>
              <p>Are you sure you want to permanently delete the success story of <strong>{deleteTarget.name}</strong>?</p>
              <div className={styles.deleteActions}>
                <button className={styles.cancelBtn} onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className={styles.confirmDeleteBtn} onClick={handleDelete}>Confirm Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
