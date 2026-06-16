import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { api } from '../../api/client';

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0A1628',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    display: 'flex',
  },
  sidebar: {
    width: '260px',
    background: '#112240',
    borderRight: '1px solid #1E3A5F',
    padding: '32px 0',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
  },
  logoArea: {
    padding: '0 24px 32px',
    borderBottom: '1px solid #1E3A5F',
    marginBottom: '24px',
  },
  logoLabel: {
    fontSize: '10px',
    letterSpacing: '2px',
    color: '#38BDF8',
    textTransform: 'uppercase' as const,
    marginBottom: '6px',
  },
  logoTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#F1F5F9',
    margin: 0,
  },
  navLabel: {
    fontSize: '10px',
    letterSpacing: '2px',
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
    padding: '0 24px',
    marginBottom: '8px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    color: '#94A3B8',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.15s ease',
    borderLeft: '3px solid transparent',
  },
  navIcon: {
    fontSize: '16px',
    width: '20px',
    textAlign: 'center' as const,
  },
  main: {
    marginLeft: '260px',
    flex: 1,
    padding: '48px',
  },
  header: {
    marginBottom: '40px',
  },
  eyebrow: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#38BDF8',
    textTransform: 'uppercase' as const,
    marginBottom: '8px',
  },
  h1: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#F1F5F9',
    margin: '0 0 4px',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: '14px',
    margin: 0,
  },
  statRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },
  statCard: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '10px',
    padding: '20px 24px',
  },
  statLabel: {
    fontSize: '11px',
    letterSpacing: '1px',
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
    marginBottom: '8px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#38BDF8',
  },
  sectionLabel: {
    fontSize: '12px',
    letterSpacing: '2px',
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
    marginBottom: '16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '20px',
    marginTop: '8px',
  },
  card: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    padding: '28px',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  cardIcon: {
    width: '44px',
    height: '44px',
    background: 'rgba(37, 99, 235, 0.15)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    border: '1px solid rgba(37, 99, 235, 0.3)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#F1F5F9',
    margin: 0,
  },
  cardDesc: {
    fontSize: '13px',
    color: '#94A3B8',
    margin: 0,
    lineHeight: '1.5',
  },
  cardArrow: {
    marginTop: '8px',
    color: '#2563EB',
    fontSize: '13px',
    fontWeight: 500,
  },
};

export default function ManagerDashboardPage() {
  const [stats, setStats] = useState({
    totalStaff: 0,
    totalCustomers: 0,
    totalAccounts: 0,
    pendingRequests: 0,
    isLoading: true,
    error: ''
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 🔄 Now pointing to the unified report endpoint!
        const response = await api.get('/api/report');
        
        setStats({
          totalStaff: response.data.totalStaff,
          totalCustomers: response.data.totalCustomers,
          totalAccounts: response.data.totalAccounts,
          pendingRequests: 0, // Keep this as 0 or wire it to a requests endpoint later
          isLoading: false,
          error: ''
        });
      } catch (err) {
        setStats(prev => ({ ...prev, isLoading: false, error: 'Failed to load live data' }));
      }
    };
    fetchStats();
  }, []);

  const navItems = [
    { to: '/manager', label: 'Dashboard', icon: '⊞', active: true },
    { to: '/manager/staff', label: 'Staff', icon: '👤' },
    { to: '/manager/staff/create', label: 'Create Staff', icon: '＋' },
    { to: '/manager/reports', label: 'Reports', icon: '📊' },
    { to: '/manager/requests', label: 'Requests', icon: '📋' },
  ];

  const quickActions = [
    {
      to: '/manager/staff',
      icon: '👤',
      title: 'Staff Management',
      desc: 'View, search, and manage all staff members and their details.',
    },
    {
      to: '/manager/staff/create',
      icon: '➕',
      title: 'Create Staff',
      desc: 'Add a new employee or manager to the system.',
    },
    {
      to: '/manager/reports',
      icon: '📊',
      title: 'Reports',
      desc: 'View summaries and statistics for staff, customers, and accounts.',
    },
    {
      to: '/manager/requests',
      icon: '📋',
      title: 'Requests',
      desc: 'Review and act on pending employee requests.',
    },
  ];

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <div style={styles.logoLabel}>Banking System</div>
          <div style={styles.logoTitle}>Manager Portal</div>
        </div>

        <div style={styles.navLabel}>Navigation</div>
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              ...styles.navLink,
              ...(item.active
                ? { color: '#38BDF8', borderLeftColor: '#38BDF8', background: 'rgba(56,189,248,0.07)' }
                : {}),
            }}
            onMouseEnter={e => {
              if (!item.active) {
                (e.currentTarget as HTMLElement).style.color = '#F1F5F9';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
              }
            }}
            onMouseLeave={e => {
              if (!item.active) {
                (e.currentTarget as HTMLElement).style.color = '#94A3B8';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }
            }}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <div style={{ marginTop: 'auto', padding: '24px', borderTop: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8' }}>Logged in as</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9', marginTop: '2px', marginBottom: '16px' }}>Manager</div>
          
          {/* LOGOUT BUTTON */}
          <button
            onClick={() => {
              localStorage.removeItem('jwt'); 
              window.location.href = '/login'; 
            }}
            style={{
              width: '100%',
              padding: '10px',
              background: 'transparent',
              color: '#F87171',
              border: '1px solid rgba(248,113,113,0.3)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(248,113,113,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span>⎋</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.header}>
          <div style={styles.eyebrow}>Manager Portal</div>
          <h1 style={styles.h1}>Dashboard</h1>
          <p style={styles.subtitle}>Welcome back. Here's an overview of your workspace.</p>
        </div>

        {/* Error Banner */}
        {stats.error && (
          <div style={{ background: 'rgba(248,113,113,0.1)', color: '#F87171', padding: '14px 20px', borderRadius: '10px', marginBottom: '24px', fontSize: '13px', border: '1px solid rgba(248,113,113,0.25)' }}>
            {stats.error}
          </div>
        )}

        {/* Stat strip */}
        <div style={styles.statRow}>
          {[
            { label: 'Total Staff', value: stats.isLoading ? '...' : stats.totalStaff },
            { label: 'Total Customers', value: stats.isLoading ? '...' : stats.totalCustomers },
            { label: 'Total Accounts', value: stats.isLoading ? '...' : stats.totalAccounts },
            { label: 'Pending Requests', value: stats.isLoading ? '...' : stats.pendingRequests },
          ].map(s => (
            <div key={s.label} style={styles.statCard}>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={styles.statValue}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={styles.sectionLabel}>Quick Actions</div>
        <div style={styles.grid}>
          {quickActions.map(action => (
            <Link
              key={action.to}
              to={action.to}
              style={styles.card}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = '#2563EB';
                el.style.background = '#1E3A5F';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = '#1E3A5F';
                el.style.background = '#112240';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div style={styles.cardIcon}>{action.icon}</div>
              <h3 style={styles.cardTitle}>{action.title}</h3>
              <p style={styles.cardDesc}>{action.desc}</p>
              <div style={styles.cardArrow}>Go →</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
