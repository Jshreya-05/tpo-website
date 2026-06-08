import styles from './ActivitiesGallery.module.css';

export const getTypeColor = (type: string) => {
  switch (type) {
    case 'Placement Drive': return { bg: 'rgba(27,79,216,0.15)', text: 'var(--blue)' };
    case 'Workshop': return { bg: 'rgba(200,151,58,0.15)', text: 'var(--gold)' };
    case 'Seminar': return { bg: 'rgba(16,185,129,0.15)', text: '#10b981' };
    case 'Bootcamp': return { bg: 'rgba(244,63,94,0.15)', text: '#f43f5e' };
    default: return { bg: 'rgba(255,255,255,0.1)', text: 'var(--text-muted)' };
  }
};
