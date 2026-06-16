import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCustomerById, getCustomerAccounts } from "../../api/customerApi";

interface Customer {
  customerId: number;
  customerType: string;
  email: string;
  phone: string;
}

interface Account {
  accountId: number;
  accountNumber: string;
  currencyId: number;
  accountType: string;
  balance: number;
  accountStatus: string;
}

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
    color: '#38BDF8', // Customer Blue
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  eyebrow: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#38BDF8',
    textTransform: 'uppercase' as const,
    marginBottom: '8px',
  },
  h1: { fontSize: '28px', fontWeight: 700, color: '#F1F5F9', margin: '0 0 4px' },
  subtitle: { color: '#94A3B8', fontSize: '14px', margin: 0 },
  createBtn: { 
    background: '#38BDF8', 
    color: '#0A1628', 
    padding: '10px 20px', 
    borderRadius: '8px', 
    textDecoration: 'none', 
    fontSize: '14px', 
    fontWeight: 600, 
    transition: 'background 0.2s' 
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
  statValue: { fontSize: '24px', fontWeight: 700, color: '#38BDF8', fontFamily: 'monospace' },
  sectionLabel: {
    fontSize: '12px',
    letterSpacing: '2px',
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
    marginBottom: '16px',
    marginTop: '32px',
    fontWeight: 600
  },
  card: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' },
  th: { padding: '16px 24px', color: '#94A3B8', borderBottom: '1px solid #1E3A5F', fontWeight: 600, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px', background: 'rgba(30,58,95,0.2)' },
  td: { padding: '16px 24px', borderBottom: '1px solid rgba(30,58,95,0.5)', verticalAlign: 'middle', color: '#F1F5F9' },
  actionBtn: { padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginRight: '8px' },
  editBtn: { background: 'rgba(167,139,250,0.1)', color: '#C4B5FD', border: '1px solid rgba(167,139,250,0.3)' },
  deleteBtn: { background: 'rgba(239,68,68,0.1)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)' },
  statusBadge: { padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', border: '1px solid transparent' }
};

export default function CustomerDashboardPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getCustomerById(Number(id)), 
      getCustomerAccounts(Number(id))
    ])
      .then(([custRes, accRes]) => {
        setCustomer(custRes.data);
        setAccounts(accRes.data);
      })
      .catch(err => console.error("Failed to load", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  if (loading) return <div style={{...styles.page, justifyContent: 'center', alignItems: 'center', color: '#38BDF8'}}>Loading dashboard...</div>;
  if (!customer) return <div style={{...styles.page, justifyContent: 'center', alignItems: 'center', color: '#F87171'}}>Customer not found.</div>;

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const navItems = [
    { to: `/customer/${id}`, label: 'Overview', icon: '⊞', active: true },
    { to: `/trx/create`, label: 'New Transaction', icon: '⇄', active: false },
  ];

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <div style={styles.logoLabel}>Client Access</div>
          <div style={styles.logoTitle}>Customer Portal</div>
        </div>

        <div style={styles.navLabel}>Menu</div>
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              ...styles.navLink,
              ...(item.active ? { color: '#38BDF8', borderLeftColor: '#38BDF8', background: 'rgba(56,189,248,0.07)' } : {}),
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
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9', marginTop: '2px', wordBreak: 'break-all' }}>
            {customer.email}
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              marginTop: '16px',
              padding: '10px',
              background: 'transparent',
              color: '#38BDF8',
              border: '1px solid rgba(56,189,248,0.3)',
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
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span>⎋</span> Sign Out
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <div style={styles.eyebrow}>Dashboard</div>
            <h1 style={styles.h1}>Welcome, Customer #{customer.customerId}</h1>
            <p style={styles.subtitle}>Manage your accounts and view your portfolio.</p>
          </div>
          <Link to={`/customer/${id}/account/create`} style={styles.createBtn}
            onMouseEnter={e => (e.currentTarget.style.background = '#7DD3FC')}
            onMouseLeave={e => (e.currentTarget.style.background = '#38BDF8')}
          >
            + Open New Account
          </Link>
        </div>

        <div style={styles.statRow}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Combined Balance</div>
            <div style={styles.statValue}>${totalBalance.toFixed(2)}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Active Accounts</div>
            <div style={{...styles.statValue, color: '#F1F5F9', fontFamily: 'inherit'}}>{accounts.length}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Account Type</div>
            <div style={{...styles.statValue, color: '#F1F5F9', fontFamily: 'inherit', textTransform: 'capitalize'}}>{customer.customerType}</div>
          </div>
        </div>

        <div style={styles.sectionLabel}>Your Accounts</div>
        <div style={styles.card}>
          {accounts.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: '#94A3B8' }}>
              No accounts found. Click "Open New Account" to get started.
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Account Number</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Balance</th>
                  <th style={{...styles.th, textAlign: 'right'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(acc => (
                  <tr key={acc.accountId} style={{ transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{...styles.td, fontFamily: 'monospace', fontWeight: 600, color: '#38BDF8'}}>{acc.accountNumber}</td>
                    <td style={{...styles.td, textTransform: 'capitalize'}}>{acc.accountType}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge, 
                        background: acc.accountStatus === 'active' ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)', 
                        color: acc.accountStatus === 'active' ? '#34D399' : '#F87171',
                        borderColor: acc.accountStatus === 'active' ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)'
                      }}>
                        {acc.accountStatus}
                      </span>
                    </td>
                    <td style={{...styles.td, fontWeight: 700}}>${acc.balance.toFixed(2)}</td>
                    <td style={{...styles.td, textAlign: 'right'}}>
                      <Link to={`/customer/${id}/account/${acc.accountId}/edit`} style={{...styles.actionBtn, ...styles.editBtn}}>Edit</Link>
                      <Link to={`/customer/${id}/account/${acc.accountId}/delete`} style={{...styles.actionBtn, ...styles.deleteBtn}}>Delete</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}