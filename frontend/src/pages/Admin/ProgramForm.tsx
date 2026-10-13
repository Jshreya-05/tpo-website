import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { createProgram, fetchProgramById, updateProgram } from '../../services/api';
import { PROGRAM_DEPARTMENTS } from '../../constants/departments';
import type { ProgramDepartmentSlug } from '../../constants/departments';
import styles from './ActivityForm.module.css';

const emptyForm = {
  title: '',
  shortDesc: '',
  description: '',
  duration: '',
  students: '0',
  url: '',
  tag: 'Training',
  tagColor: '#DBEAFE',
  tagTextColor: '#1D4ED8',
  icon: '💻',
  gradient: 'linear-gradient(135deg,#1B4FD8 0%,#0A1628 100%)',
  topics: '',
  benefits: '',
  department: '' as ProgramDepartmentSlug | '',
  status: 'published' as 'draft' | 'published',
};

export default function ProgramForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!isEditing || !id) return;
    const load = async () => {
      try {
        const { data } = await fetchProgramById(id);
        setForm({
          title: data.title || '',
          shortDesc: data.shortDesc || '',
          description: data.description || '',
          duration: data.duration || '',
          students: String(data.students ?? 0),
          url: data.url || '',
          tag: data.tag || 'Training',
          tagColor: data.tagColor || '#DBEAFE',
          tagTextColor: data.tagTextColor || '#1D4ED8',
          icon: data.icon || '💻',
          gradient: data.gradient || emptyForm.gradient,
          topics: (data.topics || []).join('\n'),
          benefits: (data.benefits || []).join('\n'),
          department: data.department || '',
          status: data.status || 'published',
        });
      } catch {
        toast.error('Failed to load program details');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEditing]);

  const updateField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.shortDesc || !form.description || !form.duration) {
      return toast.error('Please complete all required fields.');
    }
    if (!form.department) {
      return toast.error('Please select a department.');
    }

    setSubmitting(true);
    const payload = {
      title: form.title,
      shortDesc: form.shortDesc,
      description: form.description,
      duration: form.duration,
      students: Number(form.students) || 0,
      url: form.url,
      tag: form.tag,
      tagColor: form.tagColor,
      tagTextColor: form.tagTextColor,
      icon: form.icon,
      gradient: form.gradient,
      topics: form.topics,
      benefits: form.benefits,
      department: form.department,
      status: form.status,
    };

    try {
      if (isEditing && id) {
        await updateProgram(id, payload);
        toast.success('Program updated');
      } else {
        await createProgram(payload);
        toast.success('Program created');
      }
      navigate('/admin/programs');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Unable to save program');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading program...</p>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{isEditing ? 'Edit Program' : 'Add Program'}</h1>
          <p className={styles.subtitle}>Assign a department and publish this program to the public site.</p>
        </div>
        <Link to="/admin/programs" className={styles.backBtn}>
          <ArrowLeft size={16} /> Back
        </Link>
      </header>

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Program title *</label>
            <input className={styles.input} value={form.title} onChange={(e) => updateField('title', e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Department *</label>
            <select
              className={styles.select}
              value={form.department}
              onChange={(e) => updateField('department', e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {PROGRAM_DEPARTMENTS.map((item) => (
                <option key={item.slug} value={item.slug}>{item.label}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Duration *</label>
            <input className={styles.input} value={form.duration} onChange={(e) => updateField('duration', e.target.value)} placeholder="4 Years / 6 Weeks" required />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Short description *</label>
            <textarea className={styles.textarea} rows={3} value={form.shortDesc} onChange={(e) => updateField('shortDesc', e.target.value)} required />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Full description *</label>
            <textarea className={styles.textarea} rows={6} value={form.description} onChange={(e) => updateField('description', e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Students</label>
            <input className={styles.input} type="number" min="0" value={form.students} onChange={(e) => updateField('students', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Status</label>
            <select className={styles.select} value={form.status} onChange={(e) => updateField('status', e.target.value)}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Program URL</label>
            <input className={styles.input} value={form.url} onChange={(e) => updateField('url', e.target.value)} placeholder="https://" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tag</label>
            <input className={styles.input} value={form.tag} onChange={(e) => updateField('tag', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Icon</label>
            <input className={styles.input} value={form.icon} onChange={(e) => updateField('icon', e.target.value)} />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Topics (one per line)</label>
            <textarea className={styles.textarea} rows={5} value={form.topics} onChange={(e) => updateField('topics', e.target.value)} />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Benefits (one per line)</label>
            <textarea className={styles.textarea} rows={5} value={form.benefits} onChange={(e) => updateField('benefits', e.target.value)} />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          <Save size={16} /> {submitting ? 'Saving...' : isEditing ? 'Save changes' : 'Create program'}
        </button>
      </form>
    </div>
  );
}
