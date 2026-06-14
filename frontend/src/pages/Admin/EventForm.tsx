import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UploadCloud, X, Save, ArrowLeft, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchEventById, createEvent, updateEvent } from '../../services/api';
import styles from './ActivityForm.module.css'; // Reuse ActivityForm layout styles for absolute consistency

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [eligibilityCriteria, setEligibilityCriteria] = useState('');
  const [googleFormLink, setGoogleFormLink] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('published');

  // Image upload state
  const [existingImage, setExistingImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && id) {
      const loadData = async () => {
        try {
          const { data } = await fetchEventById(id);
          setTitle(data.title);
          setCompanyName(data.companyName || '');
          setEventDate(new Date(data.eventDate).toISOString().split('T')[0]);
          setDeadline(new Date(data.deadline).toISOString().split('T')[0]);
          setEligibilityCriteria(data.eligibilityCriteria || '');
          setGoogleFormLink(data.googleFormLink || '');
          setRegistrationLink(data.registrationLink || '');
          setDescription(data.description);
          setStatus(data.status);
          setExistingImage(data.image || '');
        } catch (error) {
          toast.error('Failed to load event details');
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [id, isEditing]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setExistingImage(''); // clear existing image when new image is uploaded
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setExistingImage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !companyName || !eventDate || !deadline || !eligibilityCriteria || !description) {
      return toast.error('Please complete all required fields.');
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('companyName', companyName);
    formData.append('eventDate', eventDate);
    formData.append('deadline', deadline);
    formData.append('eligibilityCriteria', eligibilityCriteria);
    formData.append('googleFormLink', googleFormLink);
    formData.append('registrationLink', registrationLink);
    formData.append('description', description);
    formData.append('status', status);

    if (existingImage) {
      formData.append('existingImage', existingImage);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (isEditing && id) {
        await updateEvent(id, formData);
        toast.success('Event updated!');
      } else {
        await createEvent(formData);
        toast.success('Event published!');
      }
      navigate('/admin/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Server error uploading event data');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--white)' }}>Loading Event details...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{isEditing ? 'Modify Upcoming Event' : 'Schedule New Event'}</h1>
          <p className={styles.subtitle}>Fill in details for upcoming recruitment drives or training events.</p>
        </div>
        <Link to="/admin/dashboard" className={styles.backBtn}>
          <ArrowLeft size={18} /> Back
        </Link>
      </header>

      <form className={styles.formCard} onSubmit={handleSubmit} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
        <div className={styles.sectionTitle}>
          <h3>Core Information</h3>
          <p>Main event parameters</p>
        </div>
        <hr className={styles.divider} />

        <div className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>
              Event / Drive Title <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <input 
              type="text" 
              className={styles.input} 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="e.g. TCS Smart Hiring Drive" 
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>
              Company Name / Partner <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <input 
              type="text" 
              className={styles.input} 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
              required 
              placeholder="e.g. Tata Consultancy Services" 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Event Date <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <input 
              type="date" 
              className={styles.input} 
              value={eventDate} 
              onChange={(e) => setEventDate(e.target.value)} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Application Deadline <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <input 
              type="date" 
              className={styles.input} 
              value={deadline} 
              onChange={(e) => setDeadline(e.target.value)} 
              required 
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>
              Eligibility Criteria <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <input 
              type="text" 
              className={styles.input} 
              value={eligibilityCriteria} 
              onChange={(e) => setEligibilityCriteria(e.target.value)} 
              required 
              placeholder="e.g. B.E. (CSE/IT) 2026 Batch with 60% throughout, No active backlogs" 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Google Form Link</label>
            <input 
              type="url" 
              className={styles.input} 
              value={googleFormLink} 
              onChange={(e) => setGoogleFormLink(e.target.value)} 
              placeholder="e.g. https://forms.gle/xyz" 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>External Registration Link</label>
            <input 
              type="url" 
              className={styles.input} 
              value={registrationLink} 
              onChange={(e) => setRegistrationLink(e.target.value)} 
              placeholder="e.g. https://nextstep.tcs.com" 
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>
              Event Description <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <textarea 
              className={styles.textarea} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              placeholder="Describe the recruitment details, roles, syllabus, test patterns, packages, etc..." 
            />
          </div>
        </div>

        <div className={styles.sectionTitle} style={{ marginTop: '3rem' }}>
          <h3>Event Banner Asset</h3>
          <p>Upload a promotional image / banner for this event</p>
        </div>
        <hr className={styles.divider} />

        <div className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <div className={styles.dropzone} onClick={() => fileInputRef.current?.click()}>
              <UploadCloud size={36} color="var(--gold)" />
              <p style={{ fontWeight: 600, color: 'var(--white)' }}>Click to upload event banner</p>
              <input 
                type="file" 
                accept="image/*" 
                className={styles.hiddenInput} 
                ref={fileInputRef} 
                onChange={handleFileChange} 
              />
            </div>

            <div className={styles.imagePreviews}>
              {existingImage && (
                <div className={styles.previewBox}>
                  <img src={existingImage} className={styles.previewImg} alt="existing event banner" />
                  <button type="button" className={styles.removeImageBtn} onClick={removeImage}><X size={14}/></button>
                </div>
              )}
              {imagePreview && (
                <div className={styles.previewBox}>
                  <img src={imagePreview} className={styles.previewImg} alt="new event banner" />
                  <button type="button" className={styles.removeImageBtn} onClick={removeImage}><X size={14}/></button>
                </div>
              )}
            </div>
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`} style={{ marginTop: '2rem' }}>
            <div className={styles.toggleWrapper}>
              <span className={styles.label}>Publish Status:</span>
              <label className={styles.toggleLabel}>
                <input 
                  type="checkbox" 
                  className={styles.toggleInput} 
                  checked={status === 'published'} 
                  onChange={(e) => setStatus(e.target.checked ? 'published' : 'draft')} 
                />
                <span style={{ color: status === 'published' ? '#10b981' : '#f59e0b' }}>
                  {status === 'published' ? 'Published' : 'Draft'}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className={styles.formFooter}>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate('/admin/dashboard')}>Cancel</button>
          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            <Save size={18} /> {submitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Schedule Event')}
          </button>
        </div>
      </form>
    </div>
  );
}
