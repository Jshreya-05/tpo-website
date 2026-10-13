import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { fetchAdminPrograms, deleteProgram } from '../../services/api';
import { PROGRAM_DEPARTMENTS, getDepartmentLabel } from '../../constants/departments';
import type { Program } from '../../types/programs';
import styles from './ProgramsManager.module.css';

export default function ProgramsManager() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<Program | null>(null);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await fetchAdminPrograms({
        status: 'all',
        limit: 500,
        search: searchTerm || undefined,
        department: departmentFilter === 'all' ? undefined : departmentFilter,
      });
      setPrograms(res.data || []);
    } catch {
      toast.error('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(loadData, 250);
    return () => window.clearTimeout(timer);
  }, [searchTerm, departmentFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProgram(deleteTarget.id || deleteTarget._id || '');
      toast.success('Program deleted');
      setDeleteTarget(null);
      loadData();
    } catch {
      toast.error('Delete failed. Admin access is required.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Programs</h1>
          <p className={styles.subtitle}>Create, assign departments, and publish training programs.</p>
        </div>
        <button type="button" className={styles.createBtn} onClick={() => navigate('/admin/programs/create')}>
          <Plus size={18} /> Add Program
        </button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
          <option value="all">All Departments</option>
          {PROGRAM_DEPARTMENTS.map((item) => (
            <option key={item.slug} value={item.slug}>{item.label}</option>
          ))}
          <option value="unassigned">Needs department</option>
        </select>
      </div>

      {loading ? (
        <p className={styles.empty}>Loading programs...</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Program</th>
                <th>Department</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => {
                const needsDepartment = !program.department;
                return (
                  <tr key={program.id || program._id}>
                    <td>
                      <strong>{program.title}</strong>
                      <span className={styles.meta}>{program.tag}</span>
                    </td>
                    <td>
                      <span className={needsDepartment ? styles.needsDept : styles.dept}>
                        {needsDepartment ? 'Needs department' : getDepartmentLabel(program.department, true)}
                      </span>
                    </td>
                    <td>{program.duration}</td>
                    <td>
                      <div className={styles.actions}>
                        <button type="button" onClick={() => navigate(`/admin/programs/edit/${program.id || program._id}`)}>
                          <Edit size={15} /> Edit
                        </button>
                        {isAdmin && (
                          <button type="button" className={styles.deleteBtn} onClick={() => setDeleteTarget(program)}>
                            <Trash2 size={15} /> Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {programs.length === 0 && <p className={styles.empty}>No programs found for this department.</p>}
        </div>
      )}

      <AnimatePresence>
        {deleteTarget && (
          <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modal} initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <AlertTriangle size={32} color="#f59e0b" />
              <h3>Delete this program?</h3>
              <p>Are you sure you want to delete this program? &quot;{deleteTarget.title}&quot; will be removed permanently.</p>
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
