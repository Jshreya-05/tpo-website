import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  X, 
  Plus, 
  Settings, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import { 
  uploadGalleryImages, 
  fetchGalleryImages, 
  deleteGalleryImage, 
  fetchActivities 
} from '../../services/api';
import styles from './GalleryManager.module.css';

interface PreviewFile {
  file: File;
  preview: string;
  id: string;
  optimizedName: string;
}

export default function GalleryManager() {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  // State for uploads
  const [selectedFiles, setSelectedFiles] = useState<PreviewFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  
  // Form State
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [eventName, setEventName] = useState('');
  const [activityId, setActivityId] = useState('');
  const [category, setCategory] = useState('General');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);

  // Gallery Display State
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [filters, setFilters] = useState({ year: '', category: '' });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    loadGallery();
  }, [filters]);

  useEffect(() => {
    return () => {
      selectedFiles.forEach(item => URL.revokeObjectURL(item.preview));
    };
  }, [selectedFiles]);

  const loadGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetchGalleryImages(filters);
      setGalleryImages(res.data || []);
    } catch (error) {
      toast.error('Failed to load gallery assets');
    } finally {
      setLoadingGallery(false);
    }
  };

  const loadActivities = async () => {
    try {
      const res = await fetchActivities({ limit: 100 });
      setActivities(res.data || []);
    } catch (error) {
      console.error('Failed to load activities for linking');
    }
  };

  // Drag & Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => allowedMimeTypes.includes(file.type));
    const invalidFilesCount = files.length - validFiles.length;

    if (invalidFilesCount > 0) {
      toast.error('Only JPG, JPEG, PNG, and WEBP images are supported.');
    }
    
    if (validFiles.length + selectedFiles.length > 20) {
      toast.error('Maximum 20 images permitted per batch.');
      return;
    }

    const newPreviews = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7),
      optimizedName: file.name.split('.')[0].replace(/[-_]/g, ' ')
    }));

    setSelectedFiles(prev => [...prev, ...newPreviews]);
  };

  const removeFile = (id: string) => {
    setSelectedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) URL.revokeObjectURL(fileToRemove.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('year', year);
    formData.append('category', category);
    if (eventName) formData.append('eventName', eventName);
    if (activityId) formData.append('activityId', activityId);

    try {
      toast.loading('Optimizing & Securely Uploading...', { id: 'upload' });
      
      const optimizedFiles = await Promise.all(
        selectedFiles.map(async (item) => {
          // Optimization Strategy: Max width 1200px, 70-80% quality, skip if < 500KB
          if (item.file.size > 500 * 1024) {
            const options = {
              maxSizeMB: 0.8,
              maxWidthOrHeight: 1200,
              useWebWorker: true,
              initialQuality: 0.75
            };
            return await imageCompression(item.file, options);
          }
          return item.file;
        })
      );

      optimizedFiles.forEach((file, index) => {
        const fallbackName = selectedFiles[index]?.file?.name || `gallery-image-${index + 1}.jpg`;
        formData.append('images', file, file.name || fallbackName);
      });

      await uploadGalleryImages(formData, (progress) => {
        setUploadProgress(progress);
      });

      toast.success(`${selectedFiles.length} images synced to the vault!`, { id: 'upload' });
      selectedFiles.forEach(item => URL.revokeObjectURL(item.preview));
      setSelectedFiles([]);
      setEventName('');
      setActivityId('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      loadGallery();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Server uplink failed.', { id: 'upload' });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to eradicate this asset?')) return;
    try {
      await deleteGalleryImage(id);
      toast.success('Asset purged.');
      loadGallery();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Administrative privilege required.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className={styles.title}>Vault Manager</h1>
          <p className={styles.subtitle}>Institutional Image Repository & Activity Archives.</p>
        </motion.div>
      </header>

      {/* Upload Section */}
      <section>
        <div 
          className={`${styles.uploadZone} ${dragActive ? styles.dragging : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className={styles.hiddenInput} 
            ref={fileInputRef} 
            onChange={(e) => {
              if (e.target.files) handleFiles(Array.from(e.target.files));
              e.target.value = '';
            }}
          />
          <UploadCloud size={48} color={dragActive ? "var(--gold)" : "rgba(255,255,255,0.2)"} />
          <p>Drop image blocks or click to browse</p>
          <span>Support for massive batch uploads up to 20 images (Max 5MB/file)</span>
        </div>

        {selectedFiles.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className={styles.controls}
          >
            <div className={styles.previewGrid}>
              {selectedFiles.map((item) => (
                <div key={item.id} className={styles.previewCard}>
                  <img src={item.preview} className={styles.previewImg} alt="preview" />
                  <button className={styles.removeBtn} onClick={(e) => { e.stopPropagation(); removeFile(item.id); }}>
                    <X size={14} />
                  </button>
                  <div className={styles.metaOverlay}>
                    <span className={styles.imageTitle}>{item.optimizedName}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Academic Year</label>
                  <select className={styles.select} value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="General">General Campus</option>
                    <option value="Placement">Placement Drives</option>
                    <option value="Workshop">Workshops & Events</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>

              <button className={styles.toggleBtn} onClick={() => setShowAdvanced(!showAdvanced)}>
                <Settings size={16} /> {showAdvanced ? 'Hide Advanced Logic' : 'More Options'}
                {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className={styles.moreOptions}
                  >
                    <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                      <label className={styles.label}>Link to Activity (Optional)</label>
                      <select
                        className={styles.select}
                        value={activityId}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          setActivityId(selectedId);
                          const selectedActivity = activities.find(a => a._id === selectedId);
                          setEventName(selectedActivity?.title || '');
                        }}
                      >
                        <option value="">Select an activity (optional)</option>
                        {activities.map(a => (
                          <option key={a._id} value={a._id}>{a.title}</option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {uploading && (
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}

              <div className={styles.uploadActions}>
                <button
                  className={styles.mainBtn}
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  onClick={() => {
                    selectedFiles.forEach(item => URL.revokeObjectURL(item.preview));
                    setSelectedFiles([]);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                >
                  Discard Batch
                </button>
                <button className={styles.mainBtn} disabled={uploading} onClick={handleUpload}>
                  {uploading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                  {uploading ? `Syncing ${uploadProgress}%` : 'Execute Batch Upload'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Gallery View Section */}
      <section style={{ marginTop: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', color: 'white' }}>Repository Explorer</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <select className={styles.select} style={{ padding: '0.5rem 1rem' }} value={filters.year} onChange={(e) => setFilters(f => ({...f, year: e.target.value}))}>
               <option value="">All Years</option>
               <option value="2026">2026</option>
               <option value="2025">2025</option>
               <option value="2024">2024</option>
             </select>
             <select className={styles.select} style={{ padding: '0.5rem 1rem' }} value={filters.category} onChange={(e) => setFilters(f => ({...f, category: e.target.value}))}>
               <option value="">All Categories</option>
               <option value="General">General Campus</option>
               <option value="Placement">Placement Drives</option>
               <option value="Workshop">Workshops & Events</option>
               <option value="Infrastructure">Infrastructure</option>
             </select>
             <button className={styles.mainBtn} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={loadGallery}>
               <Filter size={14} /> Refresh
             </button>
          </div>
        </div>

        {loadingGallery ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <Loader2 className="animate-spin" size={40} color="var(--gold)" style={{ margin: '0 auto' }} />
            <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.4)' }}>Accessing Cloud Assets...</p>
          </div>
        ) : (
          <div className={styles.galleryGrid}>
            {galleryImages.map((img) => (
              <motion.div 
                layout 
                key={img._id} 
                className={styles.imageCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <img src={img.imageUrl} className={styles.cardImg} alt={img.title} />
                <div className={styles.cardContent}>
                  <span className={styles.cardTitle}>{img.title}</span>
                  <div className={styles.cardMeta}>
                    <span>{img.category}</span>
                    <span>{img.year}</span>
                  </div>
                </div>
                <button className={styles.imageDeleteBtn} onClick={() => handleDelete(img._id)}>
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
            {galleryImages.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '30px' }}>
                <ImageIcon size={48} color="rgba(255,255,255,0.1)" style={{ margin: '0 auto 1.5rem' }} />
                <p style={{ color: 'rgba(255,255,255,0.3)' }}>No assets found in the current filter.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
