import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { getCustomerAccounts } from "../../api/customerApi";

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
    padding: '16px 24px',
    fontSize: '14px',
    color: '#CBD5E1',
    borderBottom: '1px solid rgba(30,58,95,0.5)',
  },
  tdMono: {
    padding: '16px 24px',
    fontSize: '13px',
    color: '#94A3B8',
    fontFamily: 'monospace',
    letterSpacing: '0.5px',
    borderBottom: '1px solid rgba(30,58,95,0.5)',
  },
  balanceCell: {
    padding: '16px 24px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#38BDF8',
    fontFamily: 'monospace',
    borderBottom: '1px solid rgba(30,58,95,0.5)',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize' as const,
  },
  dot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'currentColor',
    display: 'inline-block',
  },
};

function getStatusStyle(status: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    active: { background: 'rgba(16,185,129,0.12)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)' },
    inactive: { background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.25)' },
    frozen: { background: 'rgba(56,189,248,0.1)', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.25)' },
    suspended: { background: 'rgba(251,191,36,0.1)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.25)' },
  };
  return map[status?.toLowerCase()] ?? { background: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.2)' };
}

export default function CustomerAccountsPage() {
  const { id } = useParams();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomerAccounts(Number(id))
      .then(res => setAccounts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const totalBalance = accounts.reduce((sum, a) => sum + (a.balance ?? 0), 0);

  return (
    <div style={styles.page}>
      <Link to={`/employee/customer/${id}`} style={styles.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >
        ← Back to Customer Details
      </Link>

      <div style={styles.header}>
        <div>
          <div style={styles.eyebrow}>Customer #{id}</div>
          <h1 style={styles.h1}>Bank Accounts</h1>
        </div>

        {accounts.length > 0 && (
          <div style={{
            background: '#112240',
            border: '1px solid #1E3A5F',
            borderRadius: '10px',
            padding: '14px 24px',
            textAlign: 'right',
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '1px', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '4px' }}>
              Total Balance
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#38BDF8', fontFamily: 'monospace' }}>
              {totalBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
          </div>
        )}
      </div>

      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <span style={styles.tableTitle}>Account Records</span>
          <span style={styles.badge}>{accounts.length} accounts</span>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              {['Account ID', 'Account Number', 'Balance', 'Status'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ ...styles.td, textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
                  Loading accounts…
                </td>
              </tr>
            ) : accounts.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ ...styles.td, textAlign: 'center', padding: '60px', color: '#64748B' }}>
                  No accounts found for this customer.
                </td>
              </tr>
            ) : (
              accounts.map(account => (
                <tr
                  key={account.accountId}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(30,58,95,0.4)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                  style={{ transition: 'background 0.15s' }}
                >
                  <td style={styles.tdMono}>#{account.accountId}</td>
                  <td style={styles.tdMono}>{account.accountNumber}</td>
                  <td style={styles.balanceCell}>
                    {typeof account.balance === 'number'
                      ? account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                      : account.balance}
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.statusBadge, ...getStatusStyle(account.accountStatus) }}>
                      <span style={styles.dot} />
                      {account.accountStatus}
                    </span>
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
