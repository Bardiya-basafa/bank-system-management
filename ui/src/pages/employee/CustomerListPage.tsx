import React, { useEffect, useState } from 'react';
import { getCustomers } from "../../api/customerApi";
import { Link } from "react-router-dom";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0A1628',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: '48px',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '32px',
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
    margin: 0,
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
  tableCard: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  tableHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid #1E3A5F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#F1F5F9',
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
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  th: {
    padding: '12px 24px',
    textAlign: 'left' as const,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    color: '#94A3B8',
    background: 'rgba(10,22,40,0.5)',
    borderBottom: '1px solid #1E3A5F',
  },
  td: {
    padding: '14px 24px',
    fontSize: '14px',
    color: '#CBD5E1',
    borderBottom: '1px solid rgba(30,58,95,0.5)',
  },
  tdId: {
    padding: '14px 24px',
    fontSize: '13px',
    color: '#94A3B8',
    fontFamily: 'monospace',
    borderBottom: '1px solid rgba(30,58,95,0.5)',
  },
  actionLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    marginRight: '8px',
  },
  typeBadge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize' as const,
  },
  emptyState: {
    padding: '60px 24px',
    textAlign: 'center' as const,
    color: '#94A3B8',
    fontSize: '14px',
  },
};

function getTypeBadgeStyle(type: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    individual: { background: 'rgba(37,99,235,0.15)', color: '#60A5FA', border: '1px solid rgba(37,99,235,0.3)' },
    business: { background: 'rgba(16,185,129,0.12)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)' },
  };
  return map[type?.toLowerCase()] ?? { background: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.2)' };
}

export default function CustomerListPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomers()
      .then(res => setCustomers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      <Link to="/employee" style={styles.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >
        ← Back to Dashboard
      </Link>

      <div style={styles.header}>
        <div>
          <div style={styles.eyebrow}>Management</div>
          <h1 style={styles.h1}>Customers</h1>
        </div>
      </div>

      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <span style={styles.tableTitle}>All Customers</span>
          <span style={styles.badge}>{customers.length} records</span>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              {['Customer ID', 'Type', 'Email', 'Phone', 'Actions'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ ...styles.td, textAlign: 'center', color: '#94A3B8', padding: '40px' }}>
                  Loading customers…
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={5} style={styles.emptyState as React.CSSProperties}>
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((c: any) => (
                <tr
                  key={c.customerId}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(30,58,95,0.4)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                  style={{ transition: 'background 0.15s', borderLeft: '3px solid transparent' }}
                >
                  <td style={styles.tdId}>#{c.customerId}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.typeBadge, ...getTypeBadgeStyle(c.customerType) }}>
                      {c.customerType}
                    </span>
                  </td>
                  <td style={styles.td}>{c.email}</td>
                  <td style={styles.td}>{c.phone}</td>
                  <td style={styles.td}>
                    <Link
                      to={`/employee/customer/${c.customerId}`}
                      style={{
                        ...styles.actionLink,
                        background: 'rgba(37,99,235,0.12)',
                        color: '#60A5FA',
                        border: '1px solid rgba(37,99,235,0.25)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.25)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.12)')}
                    >
                      Details
                    </Link>
                    <Link
                      to={`/employee/customer/${c.customerId}/accounts`}
                      style={{
                        ...styles.actionLink,
                        background: 'rgba(56,189,248,0.1)',
                        color: '#38BDF8',
                        border: '1px solid rgba(56,189,248,0.2)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(56,189,248,0.2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(56,189,248,0.1)')}
                    >
                      Accounts
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
