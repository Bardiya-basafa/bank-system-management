import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client'; // Update this path to your actual api.ts file

interface ReportData {
  totalStaff: number;
  totalAccounts: number;
  totalCustomers: number;
  totalManagers: number;
  totalEmployees: number;
  totalActiveStaff: number;
  totalInactiveStaff: number;
  totalSavingAccounts: number;
  totalCheckingAccounts: number;
  totalBusinessAccounts: number;
  totalFrozenSuspendedAccounts: number;
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0A1628',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: '48px',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: '#94A3B8',
    textDecoration: 'none',
    fontSize: '13px',
    marginBottom: '24px',
    transition: 'color 0.15s',
  },
  header: {
    marginBottom: '40px',
  },
  eyebrow: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#38BDF8',
    textTransform: 'uppercase' as const,
    marginBottom: '6px',
  },
  h1: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#F1F5F9',
    margin: '0 0 4px',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: '14px',
    margin: 0,
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    padding: '28px',
  },
  statIcon: {
    width: '40px',
    height: '40px',
    background: 'rgba(37,99,235,0.15)',
    border: '1px solid rgba(37,99,235,0.3)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    marginBottom: '16px',
  },
  statLabel: {
    fontSize: '11px',
    letterSpacing: '1px',
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
    marginBottom: '8px',
    fontWeight: 600,
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#38BDF8',
    fontFamily: 'monospace',
    marginBottom: '4px',
  },
  statSubtext: {
    fontSize: '12px',
    color: '#64748B',
  },
  sectionLabel: {
    fontSize: '12px',
    letterSpacing: '2px',
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
    marginBottom: '16px',
    fontWeight: 600,
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  detailCard: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  detailCardHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid #1E3A5F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailCardTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#F1F5F9',
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 24px',
    borderBottom: '1px solid rgba(30,58,95,0.5)',
    fontSize: '13px',
  },
  detailRowLabel: {
    color: '#94A3B8',
  },
  detailRowValue: {
    color: '#F1F5F9',
    fontWeight: 600,
    fontFamily: 'monospace',
  },
  badge: {
    background: 'rgba(56,189,248,0.12)',
    color: '#38BDF8',
    fontSize: '11px',
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: '20px',
    border: '1px solid rgba(56,189,248,0.25)',
  },
};

export default function ReportsPage() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get('/api/report');
        setReport(response.data);
      } catch (err) {
        setError('Failed to load system reports.');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const summaryStats = [
    {
      icon: '👤',
      label: 'Total Staff',
      value: loading ? '...' : report?.totalStaff ?? '0',
      subtext: 'Active employees and managers',
    },
    {
      icon: '👥',
      label: 'Total Customers',
      value: loading ? '...' : report?.totalCustomers ?? '0',
      subtext: 'Registered individual & business',
    },
    {
      icon: '🏦',
      label: 'Total Accounts',
      value: loading ? '...' : report?.totalAccounts ?? '0',
      subtext: 'All account types combined',
    },
  ];

  const staffBreakdown = [
    { label: 'Managers', value: loading ? '...' : report?.totalManagers ?? '0' },
    { label: 'Employees', value: loading ? '...' : report?.totalEmployees ?? '0' },
    { label: 'Active', value: loading ? '...' : report?.totalActiveStaff ?? '0' },
    { label: 'Inactive / Terminated', value: loading ? '...' : report?.totalInactiveStaff ?? '0' },
  ];

  const accountBreakdown = [
    { label: 'Saving Accounts', value: loading ? '...' : report?.totalSavingAccounts ?? '0' },
    { label: 'Checking Accounts', value: loading ? '...' : report?.totalCheckingAccounts ?? '0' },
    { label: 'Business Accounts', value: loading ? '...' : report?.totalBusinessAccounts ?? '0' },
    { label: 'Frozen / Suspended', value: loading ? '...' : report?.totalFrozenSuspendedAccounts ?? '0' },
  ];

  return (
    <div style={styles.page}>
      <Link to="/manager" style={styles.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >
        ← Back to Dashboard
      </Link>

      <div style={styles.header}>
        <div style={styles.eyebrow}>Analytics</div>
        <h1 style={styles.h1}>Reports</h1>
        <p style={styles.subtitle}>System-wide summary of staff, customers, and accounts.</p>
      </div>

      {error && (
        <div style={{ background: 'rgba(248,113,113,0.1)', color: '#F87171', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid rgba(248,113,113,0.25)' }}>
          {error}
        </div>
      )}

      {/* Summary stats */}
      <div style={styles.statGrid}>
        {summaryStats.map(s => (
          <div key={s.label} style={styles.statCard}>
            <div style={styles.statIcon}>{s.icon}</div>
            <div style={styles.statLabel}>{s.label}</div>
            <div style={styles.statValue}>{s.value}</div>
            <div style={styles.statSubtext}>{s.subtext}</div>
          </div>
        ))}
      </div>

      {/* Breakdown tables */}
      <div style={styles.sectionLabel}>Breakdown</div>
      <div style={styles.detailGrid}>

        <div style={styles.detailCard}>
          <div style={styles.detailCardHeader}>
            <span style={styles.detailCardTitle}>Staff Breakdown</span>
            <span style={styles.badge}>Staff</span>
          </div>
          {staffBreakdown.map(row => (
            <div key={row.label} style={styles.detailRow}>
              <span style={styles.detailRowLabel}>{row.label}</span>
              <span style={styles.detailRowValue}>{row.value}</span>
            </div>
          ))}
        </div>

        <div style={styles.detailCard}>
          <div style={styles.detailCardHeader}>
            <span style={styles.detailCardTitle}>Account Breakdown</span>
            <span style={styles.badge}>Accounts</span>
          </div>
          {accountBreakdown.map(row => (
            <div key={row.label} style={styles.detailRow}>
              <span style={styles.detailRowLabel}>{row.label}</span>
              <span style={styles.detailRowValue}>{row.value}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}