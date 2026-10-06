import { useState } from 'react';
import { useNavigate, Navigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { loginUser } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminLogin.module.css';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { user, isLoading, login } = useAuth();
  const location = useLocation();
  const returnTo = location.state?.from;
  const destination = returnTo
    ? `${returnTo.pathname}${returnTo.search || ''}${returnTo.hash || ''}`
    : '/admin/dashboard';

  if (isLoading) {
    return <div role="status" aria-live="polite">Checking your session...</div>;
  }

  // If already logged in, redirect straight to dashboard
  if (user) {
    return <Navigate to={destination} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError("Please fill all fields.");

    setLoading(true);
    setError('');

    try {
      const data = await loginUser(email, password);

      if (data.success) {
        login(data);
        toast.success(`Welcome back, ${data.name}!`);
        navigate(destination, { replace: true });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
      toast.error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className={styles.header}>
          <div className={styles.logo}>
            <ShieldCheck size={32} color="var(--gold)" />
            TPO <span>Secure</span>
          </div>
          <p className={styles.subtitle}>Admin & Editor Workplace Authorization</p>
        </div>

        {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.errorBox}>{error}</motion.div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input 
                type="email" 
                className={styles.input} 
                placeholder="admin@kbp.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Master Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input 
                type="password" 
                className={styles.input} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Authenticating...' : <>Secure Login <ArrowRight size={18} /></>}
          </button>
        </form>

        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={14} /> Return to Public Portal
        </Link>
      </motion.div>
    </div>
  );
}
