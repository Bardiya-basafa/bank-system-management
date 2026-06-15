import React from 'react';
import { Link } from "react-router-dom";

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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '20px',
    marginTop: '32px',
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
  statRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
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
};

export default function EmployeeDashboardPage() {
  const navItems = [
    { to: '/employee', label: 'Dashboard', icon: '⊞', active: true },
    { to: '/employee/customers', label: 'Customers', icon: '👥' },
    { to: '/employee/account/create', label: 'Create Account', icon: '＋' },
  ];

  const quickActions = [
    {
      to: '/employee/customers',
      icon: '👥',
      title: 'Customer Management',
      desc: 'View, search, and manage all bank customers and their profiles.',
    },
    {
      to: '/employee/account/create',
      icon: '🏦',
      title: 'Open New Account',
      desc: 'Create a new bank account for an existing customer.',
    },
  ];

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <div style={styles.logoLabel}>Banking System</div>
          
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
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9', marginTop: '2px' }}>Employee</div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.header}>
          <div style={styles.eyebrow}>Employee Portal</div>
          <h1 style={styles.h1}>Dashboard</h1>
          <p style={styles.subtitle}>Welcome back. Here's an overview of your workspace.</p>
        </div>

        {/* Stat strip */}
        <div style={styles.statRow}>
          {[
            { label: 'Total Customers', value: '—' },
            { label: 'Active Accounts', value: '—' },
            { label: 'Pending Tasks', value: '0' },
          ].map(s => (
            <div key={s.label} style={styles.statCard}>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={styles.statValue}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ fontSize: '12px', letterSpacing: '2px', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '16px' }}>
          Quick Actions
        </div>
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
