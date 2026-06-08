import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UploadCloud, X, Save, ArrowLeft, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchActivityById, createActivity, updateActivity } from '../../services/api';
import styles from './ActivityForm.module.css';

export default function ActivityForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Placement Drive');
  const [eventDate, setEventDate] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('published');
  
  // Images
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && id) {
      const loadData = async () => {
        try {
          const { data } = await fetchActivityById(id);
          setTitle(data.title);
          setCategory(data.category);
          setEventDate(new Date(data.eventDate).toISOString().split('T')[0]);
          setDescription(data.description);
          setCompanyName(data.companyName || '');
          setIsFeatured(data.isFeatured || false);
          setStatus(data.status);
          setExistingImages(data.images);
        } catch (error) {
          toast.error('Failed to load activity details');
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [id, isEditing]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      if (existingImages.length + imageFiles.length + newFiles.length > 10) {
        toast.error("Maximum 10 images allowed per activity.");
        return;
      }
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImageFiles(prev => [...prev, ...newFiles]);
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !eventDate || !description) return toast.error('Please complete all required fields.');

    setSubmitting(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('eventDate', eventDate);
    formData.append('year', new Date(eventDate).getFullYear().toString());
    formData.append('description', description);
    formData.append('companyName', companyName);
    formData.append('isFeatured', String(isFeatured));
    formData.append('status', status);
    
    // Append retained existing cloud images explicitly
    existingImages.forEach(img => formData.append('existingImages', img));

    // Append newly chosen local image binaries
    imageFiles.forEach(file => formData.append('images', file));

    try {
      if (isEditing && id) {
         await updateActivity(id, formData);
         toast.success('Activity updated!');
      } else {
         await createActivity(formData);
         toast.success('Activity published!');
      }
      navigate('/admin/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Server error uploading payload');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--white)' }}>Loading Activity...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{isEditing ? 'Modify Activity' : 'Publish New Activity'}</h1>
          <p className={styles.subtitle}>Fill in details for the training or placement event.</p>
        </div>
        <Link to="/admin/dashboard" className={styles.backBtn}>
          <ArrowLeft size={18} /> Back
        </Link>
      </header>

      <form className={styles.formCard} onSubmit={handleSubmit} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
        
        <div className={styles.sectionTitle}>
          <h3>Core Information</h3>
          <p>Main details of the event</p>
        </div>
        <hr className={styles.divider} />
        
        <div className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>
              Activity Title <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <input type="text" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. TCS Ninja Digital Hiring" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Category <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value as any)} required>
              <option value="Placement Drive">Placement Drive</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Bootcamp">Bootcamp</option>
              <option value="Guest Lecture">Guest Lecture</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Event Date <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <input type="date" className={styles.input} value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Company/Organization</label>
            <input type="text" className={styles.input} value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Tata Consultancy Services" />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>
              Description <span style={{ color: '#f43f5e' }}>*</span>
            </label>
            <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Describe the activity..." />
          </div>
        </div>

        <div className={styles.sectionTitle} style={{ marginTop: '3rem' }}>
          <h3>Attributes & Settings</h3>
        </div>
        <hr className={styles.divider} />
        
        <div className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.toggleWrapper} style={{ cursor: 'pointer' }}>
               <input 
                  type="checkbox" 
                  checked={isFeatured} 
                  onChange={(e) => setIsFeatured(e.target.checked)} 
                  style={{ width: '20px', height: '20px' }}
               />
               <span style={{ fontSize: '1rem', color: 'white', fontWeight: 500 }}>Feature this on Home Gallery</span>
            </label>
          </div>
        </div>

        <div className={styles.sectionTitle} style={{ marginTop: '3rem' }}>
          <h3>Visual Assets</h3>
          <p>Upload photos of the event (Max 10)</p>
        </div>
        <hr className={styles.divider} />

        <div className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
             <div className={styles.dropzone} onClick={() => fileInputRef.current?.click()}>
              <UploadCloud size={36} color="var(--gold)" />
              <p style={{ fontWeight: 600, color: 'var(--white)' }}>Click to upload images</p>
              <input type="file" multiple accept="image/*" className={styles.hiddenInput} ref={fileInputRef} onChange={handleFileChange} />
            </div>

            <div className={styles.imagePreviews}>
              {existingImages.map((src, idx) => (
                <div key={`exist-${idx}`} className={styles.previewBox}>
                  <img src={src} className={styles.previewImg} alt="existing" />
                  <button type="button" className={styles.removeImageBtn} onClick={() => removeExistingImage(idx)}><X size={14}/></button>
                </div>
              ))}
              {imagePreviews.map((src, idx) => (
                <div key={`new-${idx}`} className={styles.previewBox}>
                  <img src={src} className={styles.previewImg} alt="new upload" />
                  <button type="button" className={styles.removeImageBtn} onClick={() => removeNewImage(idx)}><X size={14}/></button>
                </div>
              ))}
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
             <Save size={18} /> {submitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Publish Activity')}
          </button>
        </div>
      </form>
    </div>
  );
}

