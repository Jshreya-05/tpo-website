import { useEffect, useState } from 'react';
import { Save, Settings, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchSettings, updateSettings } from '../../services/api';
import styles from './WebsiteSettings.module.css';

export default function WebsiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cursorEffects, setCursorEffects] = useState(true);
  const [marqueeBar, setMarqueeBar] = useState(true);
  const [homepageAnims, setHomepageAnims] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data } = await fetchSettings();
        setCursorEffects(data.enableCursorEffects);
        setMarqueeBar(data.enableMarqueeBar);
        setHomepageAnims(data.enableHomepageAnimations);
      } catch (err) {
        toast.error('Failed to load website configuration settings.');
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings({
        enableCursorEffects: cursorEffects,
        enableMarqueeBar: marqueeBar,
        enableHomepageAnimations: homepageAnims
      });
      toast.success('System parameters updated successfully!');
      
      // Dispatch custom event to notify App.tsx to update styles instantly
      window.dispatchEvent(new Event('settingsUpdated'));
    } catch (err) {
      toast.error('Failed to commit configuration update.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--white)' }}>Syncing Server Parameters...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Portal Customization</h1>
          <p className={styles.subtitle}>Configure layout modules and interactive experiences.</p>
        </div>
      </header>

      <div className={styles.settingsGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Settings className={styles.icon} size={24} />
            <div>
              <h3>Interactive Settings</h3>
              <p>Toggle active layout visual structures</p>
            </div>
          </div>
          <hr className={styles.divider} />

          <div className={styles.optionsList}>
            {/* Option 1: Cursor Effects */}
            <div className={styles.optionItem}>
              <div className={styles.optionInfo}>
                <span className={styles.optionTitle}>Enable Cursor Effects</span>
                <span className={styles.optionDesc}>Display a glowing trails cursor and coordinate spotlight effects.</span>
              </div>
              <button 
                type="button"
                className={styles.toggleBtn}
                onClick={() => setCursorEffects(!cursorEffects)}
              >
                {cursorEffects ? (
                  <ToggleRight size={40} className={styles.toggleOn} />
                ) : (
                  <ToggleLeft size={40} className={styles.toggleOff} />
                )}
              </button>
            </div>

            {/* Option 2: Marquee Bar */}
            <div className={styles.optionItem}>
              <div className={styles.optionInfo}>
                <span className={styles.optionTitle}>Enable Activity Marquee Bar</span>
                <span className={styles.optionDesc}>Display dynamic scrolling upcoming headlines below the primary navbar.</span>
              </div>
              <button 
                type="button"
                className={styles.toggleBtn}
                onClick={() => setMarqueeBar(!marqueeBar)}
              >
                {marqueeBar ? (
                  <ToggleRight size={40} className={styles.toggleOn} />
                ) : (
                  <ToggleLeft size={40} className={styles.toggleOff} />
                )}
              </button>
            </div>

            {/* Option 3: Homepage Animations */}
            <div className={styles.optionItem}>
              <div className={styles.optionInfo}>
                <span className={styles.optionTitle}>Enable Homepage Animations</span>
                <span className={styles.optionDesc}>Apply Framer Motion animations and fade triggers across sections.</span>
              </div>
              <button 
                type="button"
                className={styles.toggleBtn}
                onClick={() => setHomepageAnims(!homepageAnims)}
              >
                {homepageAnims ? (
                  <ToggleRight size={40} className={styles.toggleOn} />
                ) : (
                  <ToggleLeft size={40} className={styles.toggleOff} />
                )}
              </button>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <button 
              className={styles.saveBtn} 
              onClick={handleSave} 
              disabled={saving}
            >
              <Save size={18} />
              {saving ? 'Applying...' : 'Save Parameters'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
