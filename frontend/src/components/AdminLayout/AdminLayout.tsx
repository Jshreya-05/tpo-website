import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Image as ImageIcon,
  MessageSquare,
  CalendarDays,
  Users,
  Mail,
  Settings,
  LogOut,
  Home,
  ShieldCheck,
} from 'lucide-react';
import BrandLogo from '../BrandLogo';
import styles from './AdminLayout.module.css';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
  { to: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
  { to: '/admin/events', icon: CalendarDays, label: 'Upcoming Events' },
  { to: '/admin/registrations', icon: Users, label: 'Student Registrations' },
  { to: '/admin/contacts', icon: Mail, label: 'Contact Submissions' },
  { to: '/admin/settings', icon: Settings, label: 'Website Settings' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <ShieldCheck size={24} />
          <span>TPO Admin</span>
        </div>

        <div className={styles.brandWrap}>
          <BrandLogo size={36} variant="light" />
        </div>

        <nav className={styles.nav}>
          {navItems
            .filter(({ to }) => to !== '/admin/settings' || user?.role === 'admin')
            .map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin/dashboard'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}

          <a href="/" target="_blank" rel="noreferrer" className={styles.navLinkExternal}>
            <Home size={18} />
            <span>View Live Site</span>
          </a>
        </nav>

        <div className={styles.userInfo}>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user?.name || 'Administrator'}</span>
            <span className={styles.userRole}>{user?.role || 'editor'}</span>
          </div>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
