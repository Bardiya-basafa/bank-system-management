import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  tbd: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#1E3A5F',
    fontFamily: 'monospace',
  },
};

export default function ReportsPage() {
  // Placeholder stats — replace with real API calls as needed
  const summaryStats = [
    {
      icon: '👤',
      label: 'Total Staff',
      value: 'TBD',
      subtext: 'Active employees and managers',
    },
    {
      icon: '👥',
      label: 'Total Customers',
      value: 'TBD',
      subtext: 'Registered individual & business',
    },
    {
      icon: '🏦',
      label: 'Total Accounts',
      value: 'TBD',
      subtext: 'All account types combined',
    },
  ];

  const staffBreakdown = [
    { label: 'Managers', value: 'TBD' },
    { label: 'Employees', value: 'TBD' },
    { label: 'Active', value: 'TBD' },
    { label: 'Inactive / Terminated', value: 'TBD' },
  ];

  const accountBreakdown = [
    { label: 'Saving Accounts', value: 'TBD' },
    { label: 'Checking Accounts', value: 'TBD' },
    { label: 'Business Accounts', value: 'TBD' },
    { label: 'Frozen / Suspended', value: 'TBD' },
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
