import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, PlusCircle, Image as ImageIcon, LogOut, ShieldCheck, Home } from 'lucide-react';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <ShieldCheck size={28} />
          <span>ADMIN</span>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/gallery"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
          >
            <ImageIcon size={20} />
            <span>Vault Manager</span>
          </NavLink>

          <NavLink
            to="/admin/create"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
          >
            <PlusCircle size={20} />
            <span>Create Activity</span>
          </NavLink>

          <a href="/" target="_blank" rel="noreferrer" className={styles.navLink} style={{ marginTop: '2rem' }}>
            <Home size={20} />
            <span>View Live Site</span>
          </a>
        </nav>

        <div className={styles.userInfo}>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user?.name || 'Administrator'}</span>
            <span className={styles.userRole}>Security Level: {user?.role || 'editor'}</span>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className={styles.mainContent}>
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
