import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  Edit, 
  Trash2, 
  X, 
  AlertTriangle, 
  Image as ImageIcon,
  TrendingUp,
  Search,
  Plus,
  Briefcase,
  Building2,
  CalendarDays,
  Users,
  BadgeCheck,
  Bell,
  ClipboardList,
  FileDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { fetchActivities, fetchGalleryStats, deleteActivity, fetchAdminAnalytics } from '../../services/api';
import type { Activity } from '../../types/activities';
import styles from './Dashboard.module.css';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [galleryStats, setGalleryStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string, title: string } | null>(null);
  const navigate = useNavigate();

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const loadData = async () => {
    try {
      const [activitiesRes, galleryRes, analyticsRes] = await Promise.all([
        fetchActivities({ status: 'all', limit: 1000 }),
        fetchGalleryStats(),
        fetchAdminAnalytics()
      ]);
      // `fetchActivities` returns ActivityResponse; others return { success, data: ... }
      setActivities(activitiesRes.data || []);
      setGalleryStats(galleryRes.data || null);
      setAnalytics(analyticsRes.data || null);
    } catch {
      toast.error('Failed to synchronize dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleDeleteTarget = async () => {
    if (!deleteTarget) return;
    try {
      await deleteActivity(deleteTarget.id);
      toast.success('Activity records purged');
      setDeleteTarget(null);
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Administrative privilege required');
    }
  };

  // Filter Logic
  const filteredActivities = activities.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (a.companyName && a.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || a.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Chart Data Preparation
  const chartData = galleryStats?.imagesByYear.map((item: any) => ({
    name: item._id,
    uploads: item.count
  })) || [];

  const deptPlacementData = analytics?.departmentWisePlacementStatistics?.map((d: any) => ({
    name: d.department,
    placed: d.placedCount
  })) || [];

  const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className={styles.title}>System Overview</h1>
          <p className={styles.subtitle}>Institutional performance metrics and asset management.</p>
        </motion.div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <button className={styles.actionBtn} style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '0.6rem 1.2rem', borderRadius: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => navigate('/admin/create')}>
             <Plus size={18} /> New Activity
           </button>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FileText size={24} /></div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{analytics?.totalActivities || 0}</span>
            <span className={styles.statLabel}>Total Events</span>
          </div>
          <div className={styles.statTrend}>System Wide</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)' }}>
            <Briefcase size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{analytics?.totalPlacementDrives || 0}</span>
            <span className={styles.statLabel}>Placement Drives</span>
          </div>
          <div className={styles.statTrend} style={{ color: '#10b981' }}>Core Focus</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.1)' }}>
            <Building2 size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{analytics?.totalCompaniesVisited || analytics?.totalCompanies || 0}</span>
            <span className={styles.statLabel}>Companies Visited</span>
          </div>
          <div className={styles.statTrend} style={{ color: '#3b82f6' }}>Unique Partners</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#8b5cf6', background: 'rgba(139,92,246,0.1)' }}>
            <CalendarDays size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{analytics?.latestYearCount || 0}</span>
            <span className={styles.statLabel}>{new Date().getFullYear()} Activities</span>
          </div>
          <div className={styles.statTrend} style={{ color: '#8b5cf6' }}>Active Term</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.12)' }}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{analytics?.totalStudentsRegistered || 0}</span>
            <span className={styles.statLabel}>Students Registered</span>
          </div>
          <div className={styles.statTrend} style={{ color: '#f59e0b' }}>Master Roster</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#22c55e', background: 'rgba(34,197,94,0.12)' }}>
            <BadgeCheck size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{analytics?.placedStudentsCount || 0}</span>
            <span className={styles.statLabel}>Placed Students</span>
          </div>
          <div className={styles.statTrend} style={{ color: '#22c55e' }}>Outcomes</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#ef4444', background: 'rgba(239,68,68,0.12)' }}>
            <ClipboardList size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{analytics?.pendingApprovals || 0}</span>
            <span className={styles.statLabel}>Pending Approvals</span>
          </div>
          <div className={styles.statTrend} style={{ color: '#ef4444' }}>Needs Action</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#38bdf8', background: 'rgba(56,189,248,0.12)' }}>
            <Briefcase size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{analytics?.internshipOpportunities || 0}</span>
            <span className={styles.statLabel}>Internship Opportunities</span>
          </div>
          <div className={styles.statTrend} style={{ color: '#38bdf8' }}>Upcoming</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Analytics Chart */}
        <div className={styles.chartWrapper} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <TrendingUp size={18} color="var(--gold)" /> Image Deposition Trends
          </h3>
          <div style={{ height: 250, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ background: 'var(--navy)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="uploads" radius={[6, 6, 0, 0]} barSize={40}>
                  {chartData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Uploads Sidebar */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem', overflow: 'hidden' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>Recent Deposition</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {galleryStats?.recentUploads?.map((img: any) => (
              <motion.div 
                key={img._id} 
                whileHover={{ scale: 1.05 }}
                style={{ aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <img src={img.imageUrl} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            ))}
            {!galleryStats?.recentUploads?.length && <p style={{ color: 'rgba(255,255,255,0.3)', gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>No recent images.</p>}
          </div>
          <button className={styles.actionBtn} style={{ width: '100%', marginTop: '1.5rem', opacity: 0.7 }} onClick={() => navigate('/admin/gallery')}>View Vault</button>
        </div>
      </div>

      {/* Operational Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '1.75rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CalendarDays size={18} color="var(--gold)" /> Upcoming Events
          </h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {(analytics?.upcomingEvents || []).map((e: any) => (
              <div key={`${e._id || e.title}-${e.eventDate}`} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.9rem 1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.15)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>{e.title}</span>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>{e.companyName || e.category}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600, fontSize: '0.85rem' }}>
                    {new Date(e.eventDate).toLocaleDateString()}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{e.status}</span>
                </div>
              </div>
            ))}
            {(!analytics?.upcomingEvents || analytics.upcomingEvents.length === 0) && (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.35)', border: '1px dashed rgba(255,255,255,0.12)', borderRadius: '16px' }}>
                No upcoming events are scheduled.
              </div>
            )}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '1.75rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Bell size={18} color="var(--gold)" /> Action Queue
          </h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={{ padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.15)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Resume approvals</span>
              <span style={{ color: 'white', fontWeight: 700 }}>{analytics?.pendingResumeApprovals || 0}</span>
            </div>
            <div style={{ padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.15)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Student queries</span>
              <span style={{ color: 'white', fontWeight: 700 }}>{analytics?.pendingStudentQueries || 0}</span>
            </div>
            <div style={{ padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.15)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Core companies listed</span>
              <span style={{ color: 'white', fontWeight: 700 }}>{analytics?.coreCompaniesListed || 0}</span>
            </div>
            <div style={{ padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.15)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Non-core companies listed</span>
              <span style={{ color: 'white', fontWeight: 700 }}>{analytics?.nonCoreCompaniesListed || 0}</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '1.75rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle size={18} color="var(--gold)" /> Quick Actions
          </h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <button className={styles.actionBtn} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '14px', justifyContent: 'flex-start', gap: '0.75rem' }} onClick={() => navigate('/admin/create')}>
              <Plus size={16} /> Create Activity / Drive
            </button>
            <button className={styles.actionBtn} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '14px', justifyContent: 'flex-start', gap: '0.75rem' }} onClick={() => navigate('/admin/gallery')}>
              <ImageIcon size={16} /> Upload Gallery Batch
            </button>
            <button className={styles.actionBtn} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '14px', justifyContent: 'flex-start', gap: '0.75rem', opacity: 0.8 }} onClick={() => toast('Report export will be available in the next upgrade pass.')}>
              <FileDown size={16} /> Export Reports (PDF/Excel)
            </button>
          </div>
        </div>
      </div>

      {/* Department Placement Stats */}
      <div className={styles.chartWrapper} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <TrendingUp size={18} color="var(--gold)" /> Department-wise Placements (Placed Students)
        </h3>
        <div style={{ height: 260, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptPlacementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} interval={0} angle={-10} height={60} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: 'var(--navy)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              <Bar dataKey="placed" radius={[8, 8, 0, 0]} barSize={42} fill="var(--gold)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {!deptPlacementData.length && (
          <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.35)' }}>No placement data yet. Add students and mark placements to populate this chart.</p>
        )}
      </div>

      {/* Enhanced Data Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader} style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.2rem' }}>Activity Ledger</h3>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
              <input 
                type="text" 
                placeholder="Search event or company..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0.5rem 1rem 0.5rem 2.5rem', color: 'white', width: '250px' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '10px' }}>
              {['all', 'published', 'draft'].map(s => (
                <button 
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  style={{ 
                    padding: '6px 12px', 
                    borderRadius: '8px', 
                    fontSize: '0.8rem', 
                    textTransform: 'capitalize',
                    background: statusFilter === s ? 'var(--gold)' : 'transparent',
                    color: statusFilter === s ? 'var(--navy)' : 'rgba(255,255,255,0.6)',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {loading ? (
           <div className={styles.loader} style={{ padding: '4rem', textAlign: 'center', color: 'var(--gold)' }}>Syncing Server...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Event Details</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map((activity) => (
                  <motion.tr 
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <td>
                      <div className={styles.activityInfo}>
                        <img 
                          src={activity.images[0] || 'https://via.placeholder.com/80?text=No+Img'} 
                          alt="" 
                          className={styles.thumbnail}
                        />
                        <div className={styles.infoText}>
                          <span className={styles.infoTitle}>{activity.title}</span>
                          <span className={styles.infoDesc}>{activity.companyName || 'Campus Event'}</span>
                        </div>
                      </div>
                    </td>
                    <td>{activity.category}</td>
                    <td>{new Date(activity.eventDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[activity.status]}`}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                        {activity.status === 'published' ? 'Published' : activity.status === 'draft' ? 'Draft' : 'Archived'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Edit Activity" onClick={() => navigate(`/admin/edit/${activity.id}`)}>
                          <Edit size={16} />
                        </button>
                        <button className={`${styles.actionBtn} ${styles.delete}`} title="Delete" onClick={() => setDeleteTarget({ id: activity.id, title: activity.title })}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filteredActivities.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)' }}>No matching records.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,15,36,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              style={{ background: 'var(--navy)', border: '1px solid rgba(255,255,255,0.1)', padding: '2.5rem', borderRadius: '24px', maxWidth: '450px', width: '100%', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
            >
              <button onClick={() => setDeleteTarget(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={20}/></button>
              
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(244,63,94,0.1)', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <AlertTriangle size={28} />
              </div>
              
              <h2 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>Erase Record</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '2rem' }}>
                Deleting <strong style={{ color: 'white' }}>"{deleteTarget.title}"</strong> will permanently remove all associated data.
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                 <button onClick={() => setDeleteTarget(null)} style={{ padding: '12px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                 <button onClick={handleDeleteTarget} style={{ padding: '12px 24px', background: '#f43f5e', border: 'none', color: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>Confirm Purge</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
